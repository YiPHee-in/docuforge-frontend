import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const cookieStore = cookies()
        const supabase = await createClient()

        // Get the user's session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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
            return NextResponse.json({ organizations: [] })
        }

        const organizations = user.memberships.map(membership => ({
            id: membership.organization.id,
            name: membership.organization.name,
            role: membership.role,
            createdAt: membership.organization.createdAt
        }))

        return NextResponse.json({ organizations })
    } catch (error) {
        console.error('Error fetching organizations:', error)
        return NextResponse.json(
            { error: 'Failed to fetch organizations' },
            { status: 500 }
        )
    }
} 