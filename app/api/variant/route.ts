import { NextRequest, NextResponse } from 'next/server';
import { assignVariant, VARIANTS, type VariantId } from '@/lib/ab-testing';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const existingVariant = cookieStore.get('ab_variant')?.value as VariantId | undefined;

    let variant: VariantId;

    // Check if user already has a variant assigned
    if (existingVariant && VARIANTS[existingVariant]) {
      variant = existingVariant;
    } else {
      // Assign new variant
      variant = assignVariant();

      // Set cookie
      cookieStore.set('ab_variant', variant, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return NextResponse.json({ variant });
  } catch (error) {
    console.error('Error getting variant:', error);
    return NextResponse.json(
      { error: 'Failed to get variant' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';