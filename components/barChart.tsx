'use client';

import { Bar, BarChart } from 'recharts';

import { ChartConfig, ChartContainer } from '@/components/ui/chart';

type ChartData = {
  month: string;
  desktop: number;
  mobile: number;
}[];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export function BarChartComponent({ data }: { data: ChartData }) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
