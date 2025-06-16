'use server'

import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'

export async function getProjectCount() {
    try {
        const supabaseClient = await createClient()
        const session = await supabaseClient.auth.getSession()

        if (!session.data.session) {
            return { projectCount: 0 }
        }

        // Fetch user's projects from all organizations they're a member of
        const user = await prisma.user.findUnique({
            where: { authUserId: session.data.session.user.id },
            include: {
                memberships: {
                    include: {
                        organization: {
                            include: {
                                projects: true,
                            },
                        },
                    },
                },
            },
        })

        // Calculate total project count across all organizations
        const projectCount = user?.memberships.reduce(
            (total, membership) => total + membership.organization.projects.length,
            0
        ) ?? 0

        return { projectCount }
    } catch (error) {
        console.error('Error fetching project count:', error)
        return { projectCount: 0 }
    }
} 