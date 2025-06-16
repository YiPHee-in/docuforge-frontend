import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/actions/auth";
import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/encryption";

// This endpoint is secured with a service token
export async function POST(req: NextRequest) {
    try {
        // Verify service token from Python pipeline
        const authHeader = req.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const serviceToken = authHeader.split(" ")[1];
        if (serviceToken !== process.env.PIPELINE_SERVICE_TOKEN) {
            return NextResponse.json({ error: "Invalid service token" }, { status: 401 });
        }

        const { userId, provider } = await req.json();
        if (!userId || !provider) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Get the active credential for this user and provider
        const credential = await prisma.repositoryCredential.findFirst({
            where: {
                userId,
                provider,
                isActive: true,
                expiresAt: {
                    gt: new Date(),
                },
            },
        });

        if (!credential) {
            return NextResponse.json(
                { error: "No valid credentials found" },
                { status: 404 }
            );
        }

        // Decrypt the token
        const decryptedToken = await decrypt(
            credential.token,
            process.env.ENCRYPTION_KEY!
        );

        // Return minimal required information
        return NextResponse.json({
            token: decryptedToken,
            scopes: credential.scopes,
            expiresAt: credential.expiresAt,
        });
    } catch (error) {
        console.error("Error accessing repository credentials:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 