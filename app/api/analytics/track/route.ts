import { NextRequest, NextResponse } from 'next/server';
import { saveEvent } from '@/lib/db';
import { VariantId } from '@/lib/ab-testing';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { variantId, eventType, metadata, locale } = body;

    if (!variantId || !eventType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await saveEvent({
      variantId: variantId as VariantId,
      eventType,
      locale: locale || 'en',
      timestamp: new Date().toISOString(),
      metadata,
      userAgent: request.headers.get('user-agent') || undefined,
      referer: request.headers.get('referer') || undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}