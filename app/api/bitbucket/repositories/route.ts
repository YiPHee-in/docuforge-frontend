import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type BitbucketRepo = {
    uuid: string;
    name: string;
    description: string | null;
    language: string | null;
    size: number;
    updated_on: string;
    links: {
        html: { href: string };
        clone: { href: string }[];
    };
    is_private: boolean;
    mainbranch: { name: string };
};

export async function GET() {
    try {
        const cookieStore = cookies()
        const supabase = await createClient()

        // Get the authenticated user
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Get the Bitbucket connection using Prisma
        const connection = await prisma.providerConnection.findFirst({
            where: {
                authUserId: user.id,
                provider: 'bitbucket',
                isActive: true
            }
        })

        if (!connection) {
            return NextResponse.json({ error: 'Bitbucket not connected' }, { status: 404 })
        }

        // Fetch repositories using Bitbucket API
        const response = await fetch('https://api.bitbucket.org/2.0/repositories?role=contributor&sort=-updated_on&pagelen=100', {
            headers: {
                'Authorization': `Bearer ${connection.accessToken}`,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            const errorText = await response.text()
            // If we get a 403 with insufficient scope, we need to refresh the token
            if (response.status === 403 && errorText.includes('insufficient_scope')) {
                // Update the connection to mark it as needing refresh
                await prisma.providerConnection.update({
                    where: { id: connection.id },
                    data: { isActive: false }
                })

                // Redirect to Bitbucket OAuth with updated scopes
                const { data, error } = await supabase.auth.signInWithOAuth({
                    provider: 'bitbucket',
                    options: {
                        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?provider=bitbucket`,
                        scopes: 'repository repository:write account team pullrequest',
                        queryParams: {
                            prompt: 'consent'
                        }
                    }
                })

                if (error) {
                    throw new Error(`Failed to refresh Bitbucket token: ${error.message}`)
                }

                // Return a specific error that the frontend can handle
                return NextResponse.json(
                    { error: 'token_refresh_required', redirectUrl: data.url },
                    { status: 403 }
                )
            }
            throw new Error(`Bitbucket API error: ${response.status} ${errorText}`)
        }

        const data = await response.json()
        const repos: BitbucketRepo[] = data.values

        // Transform the response to match our Repository type
        const repositories = repos.map(repo => ({
            id: repo.uuid,
            name: repo.name,
            description: repo.description || '',
            language: repo.language || 'Unknown',
            size: formatSize(repo.size),
            lines: 0, // We'll need to fetch this separately if needed
            lastUpdated: repo.updated_on,
            stars: 0, // Bitbucket doesn't have stars
            visibility: repo.is_private ? 'private' : 'public',
            branch: repo.mainbranch.name,
            url: repo.links.html.href,
            cloneUrl: repo.links.clone.find(link => link.href.startsWith('https://'))?.href || '',
            provider: 'bitbucket' as const
        }))

        return NextResponse.json(repositories)
    } catch (error) {
        console.error('Error fetching Bitbucket repositories:', error)
        return NextResponse.json(
            { error: 'Failed to fetch repositories' },
            { status: 500 }
        )
    }
}

function formatSize(sizeInKB: number): string {
    if (sizeInKB < 1024) {
        return `${sizeInKB} KB`
    }
    const sizeInMB = (sizeInKB / 1024).toFixed(1)
    return `${sizeInMB} MB`
}
