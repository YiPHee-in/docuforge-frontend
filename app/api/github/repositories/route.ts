import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Octokit } from '@octokit/rest'

type GitHubRepo = {
    id: number;
    name: string;
    description: string | null;
    language: string | null;
    size: number;
    updated_at: string;
    stargazers_count: number;
    visibility: 'private' | 'public';
    default_branch: string;
    html_url: string;
    clone_url: string;
};

export async function GET() {
    try {
        const cookieStore = cookies()
        const supabase = await createClient()

        // Get the user's session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Get the GitHub connection
        const { data: connection, error: connectionError } = await supabase
            .from('provider_connections')
            .select('access_token, scopes')
            .eq('auth_user_id', session.user.id)
            .eq('provider', 'github')
            .eq('is_active', true)
            .single()

        if (connectionError || !connection) {
            return NextResponse.json({ error: 'GitHub not connected' }, { status: 404 })
        }

        // Initialize Octokit with the stored access token
        const octokit = new Octokit({
            auth: connection.access_token
        })

        // Fetch repositories using Octokit
        const { data: repos } = await octokit.repos.listForAuthenticatedUser({
            sort: 'updated',
            per_page: 100,
            visibility: 'all'
        })

        // Transform the response to match our Repository type
        const repositories = repos.map(repo => ({
            id: repo.id.toString(),
            name: repo.name,
            description: repo.description || '',
            language: repo.language || 'Unknown',
            size: formatSize(repo.size),
            lines: 0, // We'll need to fetch this separately if needed
            lastUpdated: repo.updated_at,
            stars: repo.stargazers_count,
            visibility: repo.visibility as 'private' | 'public',
            branch: repo.default_branch,
            url: repo.html_url,
            cloneUrl: repo.clone_url,
            provider: 'github' as const
        }))

        return NextResponse.json(repositories)
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error)
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