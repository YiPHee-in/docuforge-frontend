'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

export async function createOrganization({ name }: { name: string }) {
    try {
        const cookieStore = cookies()
        const supabase = await createClient()

        // Get the user's session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !session) {
            return { error: 'Unauthorized' }
        }

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return { error: 'Organization name is required' }
        }

        const trimmedName = name.trim()
        const slug = generateSlug(trimmedName)

        // Check if slug is already taken
        const existingOrg = await prisma.organization.findUnique({
            where: { slug }
        })

        if (existingOrg) {
            return { error: 'An organization with this name already exists' }
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

        // Revalidate the dashboard and organization pages
        revalidatePath('/dashboard')
        revalidatePath(`/organizations/${organization.slug}`)

        return { organization }
    } catch (error) {
        console.error('Error creating organization:', error)
        return { error: 'Failed to create organization' }
    }
} 