'use client';

import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VARIANTS, type VariantId } from '@/lib/ab-testing';
import type { VariantStats } from '@/lib/db';
import {
  TrendingUp,
  Users,
  MousePointerClick,
  Phone,
  CheckCircle,
  RefreshCw,
  Trophy,
  AlertCircle,
} from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState<Record<string, VariantStats> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/analytics/stats');
      const data = await response.json();
      setStats(data);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading || !stats) {
    return (
      <div className="container py-24">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <RefreshCw className="mx-auto mb-4 h-12 w-12 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">Loading analytics data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate winner
  const variantsArray = Object.values(stats);
  const winner = variantsArray.reduce((prev, current) =>
    current.conversionRate > prev.conversionRate ? current : prev
  );

  // Calculate totals
  const totals = variantsArray.reduce(
    (acc, variant) => ({
      pageViews: acc.pageViews + variant.pageViews,
      ctaClicks: acc.ctaClicks + variant.ctaClicks,
      formSubmits: acc.formSubmits + variant.formSubmits,
      phoneClicks: acc.phoneClicks + variant.phoneClicks,
    }),
    { pageViews: 0, ctaClicks: 0, formSubmits: 0, phoneClicks: 0 }
  );

  const averageConversionRate =
    totals.pageViews > 0
      ? ((totals.formSubmits + totals.phoneClicks) / totals.pageViews) * 100
      : 0;

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">A/B Testing Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time analytics for landing page variants
          </p>
        </div>
        <Button onClick={fetchStats} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Page Views</p>
              <p className="mt-2 text-3xl font-bold">{totals.pageViews.toLocaleString()}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">CTA Clicks</p>
              <p className="mt-2 text-3xl font-bold">{totals.ctaClicks.toLocaleString()}</p>
            </div>
            <MousePointerClick className="h-8 w-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Form Submissions</p>
              <p className="mt-2 text-3xl font-bold">{totals.formSubmits.toLocaleString()}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Conversion Rate</p>
              <p className="mt-2 text-3xl font-bold">{averageConversionRate.toFixed(2)}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Winner Banner */}
      {winner.pageViews > 10 && (
        <Card className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 p-6 dark:from-yellow-950 dark:to-orange-950">
          <div className="flex items-center gap-4">
            <Trophy className="h-12 w-12 text-yellow-500" />
            <div>
              <h3 className="text-xl font-bold">Current Winner</h3>
              <p className="text-muted-foreground">
                <strong>{VARIANTS[winner.variantId].name}</strong> is leading with a{' '}
                <strong>{winner.conversionRate.toFixed(2)}%</strong> conversion rate
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Variant Comparison Table */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Variant Performance</h2>
        <div className="overflow-x-auto">
          <Card className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-4 text-left font-semibold">Variant</th>
                  <th className="pb-4 text-right font-semibold">Weight</th>
                  <th className="pb-4 text-right font-semibold">Page Views</th>
                  <th className="pb-4 text-right font-semibold">CTA Clicks</th>
                  <th className="pb-4 text-right font-semibold">Form Submits</th>
                  <th className="pb-4 text-right font-semibold">Phone Clicks</th>
                  <th className="pb-4 text-right font-semibold">Conversion Rate</th>
                  <th className="pb-4 text-right font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats)
                  .sort(([, a], [, b]) => b.conversionRate - a.conversionRate)
                  .map(([variantId, variant]) => {
                    const variantInfo = VARIANTS[variantId as VariantId];
                    const isWinner = variant.variantId === winner.variantId && winner.pageViews > 10;
                    const hasEnoughData = variant.pageViews >= 10;

                    return (
                      <tr key={variantId} className="border-b last:border-0">
                        <td className="py-4">
                          <div>
                            <p className="font-medium">{variantInfo.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {variantInfo.description}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 text-right">{variantInfo.weight}%</td>
                        <td className="py-4 text-right font-mono">
                          {variant.pageViews.toLocaleString()}
                        </td>
                        <td className="py-4 text-right font-mono">
                          {variant.ctaClicks.toLocaleString()}
                        </td>
                        <td className="py-4 text-right font-mono">
                          {variant.formSubmits.toLocaleString()}
                        </td>
                        <td className="py-4 text-right font-mono">
                          {variant.phoneClicks.toLocaleString()}
                        </td>
                        <td className="py-4 text-right">
                          <span
                            className={`text-lg font-bold ${
                              variant.conversionRate > averageConversionRate
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}
                          >
                            {variant.conversionRate.toFixed(2)}%
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          {isWinner ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                              <Trophy className="h-3 w-3" />
                              Winner
                            </span>
                          ) : !hasEnoughData ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                              <AlertCircle className="h-3 w-3" />
                              Need Data
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              Testing
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </Card>
        </div>
      </div>

      {/* Detailed Variant Cards */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Variant Details</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(stats).map(([variantId, variant]) => {
            const variantInfo = VARIANTS[variantId as VariantId];
            const clickThroughRate =
              variant.pageViews > 0 ? (variant.ctaClicks / variant.pageViews) * 100 : 0;
            const formConversionRate =
              variant.pageViews > 0 ? (variant.formSubmits / variant.pageViews) * 100 : 0;

            return (
              <Card key={variantId} className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{variantInfo.name}</h3>
                    <p className="text-sm text-muted-foreground">{variantInfo.description}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {variantInfo.weight}%
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">Page Views</span>
                      <span className="font-semibold">{variant.pageViews}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${Math.min((variant.pageViews / totals.pageViews) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">Click-Through Rate</span>
                      <span className="font-semibold">{clickThroughRate.toFixed(2)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                      <div className="h-full bg-purple-500" style={{ width: `${clickThroughRate}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-muted-foreground">Form Conversion Rate</span>
                      <span className="font-semibold">{formConversionRate.toFixed(2)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                      <div className="h-full bg-green-500" style={{ width: `${formConversionRate}%` }} />
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">CTA Clicks</p>
                      <p className="text-xl font-bold">{variant.ctaClicks}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Forms</p>
                      <p className="text-xl font-bold">{variant.formSubmits}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-xl font-bold">{variant.phoneClicks}</p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Last updated: {lastUpdated}</p>
        <p className="mt-1">Dashboard auto-refreshes every 30 seconds</p>
      </div>
    </div>
  );
}