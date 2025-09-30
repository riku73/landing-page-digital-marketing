/**
 * Simple file-based database for analytics
 * For production, consider using PostgreSQL, MongoDB, or Supabase
 */

import fs from 'fs/promises';
import path from 'path';
import { VariantId } from './ab-testing';

const DB_DIR = path.join(process.cwd(), 'data');
const EVENTS_FILE = path.join(DB_DIR, 'events.json');
const STATS_FILE = path.join(DB_DIR, 'stats.json');

export interface AnalyticsEvent {
  id: string;
  variantId: VariantId;
  eventType: 'page_view' | 'cta_click' | 'form_submit' | 'phone_click';
  locale: string;
  timestamp: string;
  metadata?: Record<string, string>;
  userAgent?: string;
  referer?: string;
}

export interface VariantStats {
  variantId: VariantId;
  pageViews: number;
  ctaClicks: number;
  formSubmits: number;
  phoneClicks: number;
  conversionRate: number;
  lastUpdated: string;
}

/**
 * Initialize database
 */
async function initDB() {
  try {
    await fs.access(DB_DIR);
  } catch {
    await fs.mkdir(DB_DIR, { recursive: true });
  }

  try {
    await fs.access(EVENTS_FILE);
  } catch {
    await fs.writeFile(EVENTS_FILE, JSON.stringify([]));
  }

  try {
    await fs.access(STATS_FILE);
  } catch {
    const initialStats: Record<string, VariantStats> = {
      control: { variantId: 'control', pageViews: 0, ctaClicks: 0, formSubmits: 0, phoneClicks: 0, conversionRate: 0, lastUpdated: new Date().toISOString() },
      'variant-a': { variantId: 'variant-a', pageViews: 0, ctaClicks: 0, formSubmits: 0, phoneClicks: 0, conversionRate: 0, lastUpdated: new Date().toISOString() },
      'variant-b': { variantId: 'variant-b', pageViews: 0, ctaClicks: 0, formSubmits: 0, phoneClicks: 0, conversionRate: 0, lastUpdated: new Date().toISOString() },
      'variant-c': { variantId: 'variant-c', pageViews: 0, ctaClicks: 0, formSubmits: 0, phoneClicks: 0, conversionRate: 0, lastUpdated: new Date().toISOString() },
    };
    await fs.writeFile(STATS_FILE, JSON.stringify(initialStats, null, 2));
  }
}

/**
 * Save analytics event
 */
export async function saveEvent(event: Omit<AnalyticsEvent, 'id'>): Promise<void> {
  await initDB();

  const events = await getEvents();
  const newEvent: AnalyticsEvent = {
    ...event,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };

  events.push(newEvent);

  // Keep only last 10,000 events
  const trimmedEvents = events.slice(-10000);
  await fs.writeFile(EVENTS_FILE, JSON.stringify(trimmedEvents, null, 2));

  // Update stats
  await updateStats();
}

/**
 * Get all events
 */
export async function getEvents(): Promise<AnalyticsEvent[]> {
  await initDB();
  const data = await fs.readFile(EVENTS_FILE, 'utf-8');
  return JSON.parse(data);
}

/**
 * Get events by variant
 */
export async function getEventsByVariant(variantId: VariantId): Promise<AnalyticsEvent[]> {
  const events = await getEvents();
  return events.filter(e => e.variantId === variantId);
}

/**
 * Get stats for all variants
 */
export async function getStats(): Promise<Record<string, VariantStats>> {
  await initDB();
  const data = await fs.readFile(STATS_FILE, 'utf-8');
  return JSON.parse(data);
}

/**
 * Update stats based on events
 */
async function updateStats(): Promise<void> {
  const events = await getEvents();
  const stats: Record<string, VariantStats> = {
    control: { variantId: 'control', pageViews: 0, ctaClicks: 0, formSubmits: 0, phoneClicks: 0, conversionRate: 0, lastUpdated: new Date().toISOString() },
    'variant-a': { variantId: 'variant-a', pageViews: 0, ctaClicks: 0, formSubmits: 0, phoneClicks: 0, conversionRate: 0, lastUpdated: new Date().toISOString() },
    'variant-b': { variantId: 'variant-b', pageViews: 0, ctaClicks: 0, formSubmits: 0, phoneClicks: 0, conversionRate: 0, lastUpdated: new Date().toISOString() },
    'variant-c': { variantId: 'variant-c', pageViews: 0, ctaClicks: 0, formSubmits: 0, phoneClicks: 0, conversionRate: 0, lastUpdated: new Date().toISOString() },
  };

  for (const event of events) {
    if (!stats[event.variantId]) continue;

    switch (event.eventType) {
      case 'page_view':
        stats[event.variantId].pageViews++;
        break;
      case 'cta_click':
        stats[event.variantId].ctaClicks++;
        break;
      case 'form_submit':
        stats[event.variantId].formSubmits++;
        break;
      case 'phone_click':
        stats[event.variantId].phoneClicks++;
        break;
    }
  }

  // Calculate conversion rates
  for (const variantId in stats) {
    const variant = stats[variantId];
    if (variant.pageViews > 0) {
      const conversions = variant.formSubmits + variant.phoneClicks;
      variant.conversionRate = (conversions / variant.pageViews) * 100;
    }
  }

  await fs.writeFile(STATS_FILE, JSON.stringify(stats, null, 2));
}

/**
 * Get events within date range
 */
export async function getEventsByDateRange(
  startDate: Date,
  endDate: Date
): Promise<AnalyticsEvent[]> {
  const events = await getEvents();
  return events.filter(e => {
    const eventDate = new Date(e.timestamp);
    return eventDate >= startDate && eventDate <= endDate;
  });
}

/**
 * Clear all data (use with caution)
 */
export async function clearAllData(): Promise<void> {
  await initDB();
  await fs.writeFile(EVENTS_FILE, JSON.stringify([]));
  const initialStats: Record<string, VariantStats> = {
    control: { variantId: 'control', pageViews: 0, ctaClicks: 0, formSubmits: 0, phoneClicks: 0, conversionRate: 0, lastUpdated: new Date().toISOString() },
    'variant-a': { variantId: 'variant-a', pageViews: 0, ctaClicks: 0, formSubmits: 0, phoneClicks: 0, conversionRate: 0, lastUpdated: new Date().toISOString() },
    'variant-b': { variantId: 'variant-b', pageViews: 0, ctaClicks: 0, formSubmits: 0, phoneClicks: 0, conversionRate: 0, lastUpdated: new Date().toISOString() },
    'variant-c': { variantId: 'variant-c', pageViews: 0, ctaClicks: 0, formSubmits: 0, phoneClicks: 0, conversionRate: 0, lastUpdated: new Date().toISOString() },
  };
  await fs.writeFile(STATS_FILE, JSON.stringify(initialStats, null, 2));
}