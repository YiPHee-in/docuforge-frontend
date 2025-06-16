'use server';

import { cookies } from 'next/headers';

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function setSidebarState(open: boolean) {
    const cookieStore = await cookies();
    cookieStore.set({
        name: SIDEBAR_COOKIE_NAME,
        value: String(open),
        maxAge: SIDEBAR_COOKIE_MAX_AGE,
        path: '/',
    });
}

export async function getSidebarState(): Promise<boolean> {
    const cookieStore = await cookies();
    const sidebarState = cookieStore.get(SIDEBAR_COOKIE_NAME);
    return sidebarState?.value === 'true';
} 