import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type CreateProjectRequest = {
    name: string
    description: string
    repositories: {
        id: string
        name: string
        url: string
        provider: string
    }[]
}

export async function POST(request: Request) {
    try {
        const cookieStore = cookies()
        const supabase = await createClient()

        // Get the user's session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Get the request body
        const body: CreateProjectRequest = await request.json()

        // Validate the request
        if (!body.name || !body.repositories || body.repositories.length === 0) {
            return NextResponse.json(
                { error: 'Project name and at least one repository are required' },
                { status: 400 }
            )
        }

        // Get the user's organization membership
        const user = await prisma.user.findUnique({
            where: { authUserId: session.user.id },
            include: {
                memberships: {
                    include: {
                        organization: true
                    }
                }
            }
        })

        if (!user || user.memberships.length === 0) {
            return NextResponse.json(
                { error: 'You must be a member of an organization to create a project' },
                { status: 403 }
            )
        }

        // For now, use the first organization the user is a member of
        // TODO: Allow selecting organization in the UI
        const organization = user.memberships[0].organization

        // Create the project
        const project = await prisma.project.create({
            data: {
                name: body.name,
                repoUrl: body.repositories[0].url, // For now, just use the first repo
                organizationId: organization.id // Use organizationId instead of organization.connect
            }
        })

        // TODO: Set up webhook for doc generation pipeline
        // This will be handled by the Python backend when it's ready

        return NextResponse.json(project)
    } catch (error) {
        console.error('Error creating project:', error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to create project' },
            { status: 500 }
        )
    }
} 