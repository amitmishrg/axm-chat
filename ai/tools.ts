import { tool as createTool } from 'ai';
import { z } from 'zod';
import { generateSampleChartData } from './actions';

const displayViewForm = createTool({
  description:
    'Display the create view form. Use this when user wants to create a view.',
  parameters: z.object({}),
  execute: async () => {
    return null; // Ensures tool invocation stays in "call" state
  },
});

const createView = createTool({
  description:
    'INTERNAL TOOL - Do not call directly. This tool is automatically called when user submits the form.',
  parameters: z.object({
    viewname: z
      .string()
      .min(2, { message: 'Viewname must be at least 2 characters' }),
    description: z.string().optional(),
  }),
  execute: async ({ viewname, description }) => {
    console.log({ viewname, description }, 'description');
    return 'View created successfully!';
  },
});

const showDeviceUses = createTool({
  description:
    'Display a bar chart showing desktop and mobile usage statistics. Use this tool to visualize device usage trends over a 6-month period.',
  parameters: z.object({
    date: z
      .string()
      .describe('Starting date for the chart (format: YYYY-MM-DD)'),
  }),
  execute: async ({ date }) => {
    try {
      const { chartData } = await generateSampleChartData({ date });
      return chartData;
    } catch (error) {
      console.log(error, '-----error');

      return 'Failed to generate chart data';
    }
  },
});

export const tools = {
  displayViewForm,
  createView,
  showDeviceUses,
};
