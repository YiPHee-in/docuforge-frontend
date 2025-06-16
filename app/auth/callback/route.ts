import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const provider = requestUrl.searchParams.get('provider') as 'github' | 'gitlab' | 'bitbucket'

    if (!code || !provider) {
        return NextResponse.redirect(`${requestUrl.origin}/connect?error=invalid_callback`)
    }

    try {
        const supabase = await createClient()

        // Exchange the code for a session
        const { data: { session }, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)

        if (sessionError || !session) {
            console.error('Session error:', sessionError)
            return NextResponse.redirect(`${requestUrl.origin}/connect?error=session_error`)
        }

        // Get the provider's access token from the session
        const providerToken = session.provider_token
        const providerRefreshToken = session.provider_refresh_token

        if (!providerToken) {
            console.error('No provider token found in session')
            return NextResponse.redirect(`${requestUrl.origin}/connect?error=token_error`)
        }

        // Get or create user in our database
        const user = await prisma.user.upsert({
            where: {
                authUserId: session.user.id
            },
            create: {
                authUserId: session.user.id,
                email: session.user.email,
                name: session.user.user_metadata?.full_name || null
            },
            update: {
                email: session.user.email,
                name: session.user.user_metadata?.full_name || undefined
            }
        })

        // Store the provider connection using Prisma
        const expiresAt = new Date(Date.now() + 3600 * 1000) // 1 hour from now
        const tokenExpiresAt = new Date(Date.now() + 3600 * 1000) // 1 hour from now

        await prisma.providerConnection.upsert({
            where: {
                authUserId_provider: {
                    authUserId: session.user.id,
                    provider
                }
            },
            create: {
                authUserId: session.user.id,
                provider,
                accessToken: providerToken,
                refreshToken: providerRefreshToken,
                expiresAt,
                tokenExpiresAt,
                scopes: [], // You might want to get this from the session if available
                isActive: true
            },
            update: {
                accessToken: providerToken,
                refreshToken: providerRefreshToken,
                expiresAt,
                tokenExpiresAt,
                isActive: true
            }
        })

        // Redirect to the repositories page
        return NextResponse.redirect(`${requestUrl.origin}/repositories`)
    } catch (error) {
        console.error('Callback error:', error)
        return NextResponse.redirect(`${requestUrl.origin}/connect?error=server_error`)
    }
} 