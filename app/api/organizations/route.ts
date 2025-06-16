import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
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
        const body = await request.json()
        const { name } = body

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return NextResponse.json(
                { error: 'Organization name is required' },
                { status: 400 }
            )
        }

        const trimmedName = name.trim()
        const slug = generateSlug(trimmedName)

        // Check if slug is already taken
        const existingOrg = await prisma.organization.findUnique({
            where: { slug }
        })

        if (existingOrg) {
            return NextResponse.json(
                { error: 'An organization with this name already exists' },
                { status: 400 }
            )
        }

        // Get or create the user
        let user = await prisma.user.findUnique({
            where: { authUserId: session.user.id }
        })

        if (!user) {
            user = await prisma.user.create({
                data: {
                    authUserId: session.user.id,
                    email: session.user.email!,
                    name: session.user.user_metadata.name || session.user.email!.split('@')[0]
                }
            })
        }

        // Create the organization and membership
        const organization = await prisma.organization.create({
            data: {
                name: trimmedName,
                slug,
                members: {
                    create: {
                        userId: user.id,
                        role: 'OWNER' // First member is always the owner
                    }
                }
            },
            include: {
                members: {
                    include: {
                        user: true
                    }
                }
            }
        })

        return NextResponse.json(organization)
    } catch (error) {
        console.error('Error creating organization:', error)
        return NextResponse.json(
            { error: 'Failed to create organization' },
            { status: 500 }
        )
    }
} 