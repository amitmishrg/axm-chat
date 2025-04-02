import { generateObject } from 'ai';
import { localModel } from './model';
import { z } from 'zod';

export async function generateSampleChartData({ date }: { date: string }) {
  try {
    const { object: chartData } = await generateObject({
      model: localModel,
      prompt: `Generate monthly desktop and mobile usage data for 6 months starting from ${date}. Desktop values should be between 50-350, and mobile values between 50-250.`,
      output: 'array',
      schema: z.object({
        month: z.string().describe('Month name, e.g., January, February'),
        desktop: z.number().min(50).max(350).describe('Desktop usage count'),
        mobile: z.number().min(50).max(250).describe('Mobile usage count'),
      }),
    });

    return { chartData };
  } catch (error) {
    console.log(error, '-----error');
  }
}
