'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

export async function getUserOrganizations() {
    try {
        const cookieStore = cookies()
        const supabase = await createClient()

        // Get the user's session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !session) {
            return { error: 'Unauthorized' }
        }

        // Get the user's organizations
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

        if (!user) {
            return { organizations: [] }
        }

        const organizations = user.memberships.map(membership => ({
            id: membership.organization.id,
            name: membership.organization.name,
            slug: membership.organization.slug,
            role: membership.role,
            createdAt: membership.organization.createdAt
        }))

        return { organizations }
    } catch (error) {
        console.error('Error fetching organizations:', error)
        return { error: 'Failed to fetch organizations' }
    }
} 