import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type ProviderConnection = {
    provider: 'github' | 'gitlab' | 'bitbucket';
    connected_at: string;
};

export async function GET() {
    try {
        const supabase = await createClient();

        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch connected providers using Prisma
        const connections = await prisma.providerConnection.findMany({
            where: {
                authUserId: session.user.id,
                isActive: true
            },
            select: {
                provider: true,
                createdAt: true
            }
        });

        // Return the list of connected providers
        return NextResponse.json({
            providers: connections.map(conn => conn.provider)
        });
    } catch (error) {
        console.error('Error in providers API:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 