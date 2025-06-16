import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/encryption";
import { redirect } from "next/navigation";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
        return new Response("Missing code or state", { status: 400 });
    }

    // Verify state to prevent CSRF
    const cookieStore = cookies();
    const storedState = cookieStore.get("github_oauth_state")?.value;
    if (state !== storedState) {
        return new Response("Invalid state", { status: 400 });
    }

    try {
        // Exchange code for access token
        const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code,
            }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            throw new Error(tokenData.error_description || "Failed to get access token");
        }

        // Get user info from GitHub
        const userResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`,
            },
        });

        const userData = await userResponse.json();

        // Get scopes from token
        const scopes = tokenData.scope.split(",");

        // Get current user from session
        const supabase = await createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return new Response("Unauthorized", { status: 401 });
        }

        // Get or create user in our database
        const user = await prisma.user.findUnique({
            where: { authUserId: session.user.id },
        });

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        // Encrypt the token before storing
        const encryptedToken = await encrypt(tokenData.access_token, ENCRYPTION_KEY);

        // Store or update the credential
        await prisma.repositoryCredential.upsert({
            where: {
                userId_provider: {
                    userId: user.id,
                    provider: "github",
                },
            },
            create: {
                userId: user.id,
                provider: "github",
                token: encryptedToken,
                expiresAt: tokenData.expires_in ? new Date(Date.now() + tokenData.expires_in * 1000) : null,
                scopes,
            },
            update: {
                token: encryptedToken,
                expiresAt: tokenData.expires_in ? new Date(Date.now() + tokenData.expires_in * 1000) : null,
                scopes,
                isActive: true,
            },
        });

        // Redirect back to the project page or settings
        const redirectTo = searchParams.get("redirect_to") || "/projects";
        return redirect(redirectTo);
    } catch (error) {
        console.error("GitHub OAuth error:", error);
        return new Response("Authentication failed", { status: 500 });
    }
} 