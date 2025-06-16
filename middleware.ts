import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createClient } from './utils/supabase/middleware'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const { supabase, supabaseResponse } = await createClient(req)
    const {
        data: { session },
    } = await supabase.auth.getSession()

    const { pathname } = req.nextUrl

    // If not authenticated and trying to access protected route
    if (!session && pathname.startsWith('/dashboard')) {
        const signinUrl = req.nextUrl.clone()
        signinUrl.pathname = '/signin'
        return NextResponse.redirect(signinUrl)
    }

    // If authenticated and trying to access / or /signin
    if (session && (pathname === '/' || pathname === '/signin')) {
        const dashboardUrl = req.nextUrl.clone()
        dashboardUrl.pathname = '/dashboard'
        return NextResponse.redirect(dashboardUrl)
    }

    return res
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/',
        '/signin',
    ],
} 