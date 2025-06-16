import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type GitLabRepo = {
    id: number;
    name: string;
    description: string | null;
    language: string | null;
    size: number;
    updated_at: string;
    star_count: number;
    visibility: 'private' | 'public';
    default_branch: string;
    web_url: string;
    http_url_to_repo: string;
};

export async function GET() {
    try {
        const cookieStore = cookies()
        const supabase = await createClient()

        // Get the authenticated user instead of session
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Get the GitLab connection using Prisma
        const connection = await prisma.providerConnection.findFirst({
            where: {
                authUserId: user.id,
                provider: 'gitlab',
                isActive: true
            }
        })

        if (!connection) {
            return NextResponse.json({ error: 'GitLab not connected' }, { status: 404 })
        }

        // Fetch repositories using GitLab API
        const response = await fetch('https://gitlab.com/api/v4/projects?membership=true&order_by=updated_at&sort=desc&per_page=100', {
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

                // Redirect to GitLab OAuth with updated scopes
                const { data, error } = await supabase.auth.signInWithOAuth({
                    provider: 'gitlab',
                    options: {
                        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?provider=gitlab`,
                        scopes: 'read_repository read_user email',
                        queryParams: {
                            prompt: 'consent'
                        }
                    }
                })

                if (error) {
                    throw new Error(`Failed to refresh GitLab token: ${error.message}`)
                }

                // Return a specific error that the frontend can handle
                return NextResponse.json(
                    { error: 'token_refresh_required', redirectUrl: data.url },
                    { status: 403 }
                )
            }
            throw new Error(`GitLab API error: ${response.status} ${errorText}`)
        }

        const repos: GitLabRepo[] = await response.json()

        // Transform the response to match our Repository type
        const repositories = repos.map(repo => ({
            id: repo.id.toString(),
            name: repo.name,
            description: repo.description || '',
            language: repo.language || 'Unknown',
            size: formatSize(repo.size),
            lines: 0, // We'll need to fetch this separately if needed
            lastUpdated: repo.updated_at,
            stars: repo.star_count,
            visibility: repo.visibility as 'private' | 'public',
            branch: repo.default_branch,
            url: repo.web_url,
            cloneUrl: repo.http_url_to_repo,
            provider: 'gitlab' as const
        }))

        return NextResponse.json(repositories)
    } catch (error) {
        console.error('Error fetching GitLab repositories:', error)
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