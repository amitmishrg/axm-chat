import { tool as createTool } from 'ai';
import { z } from 'zod';

const displayViewForm = createTool({
  description:
    'Display the create view form. Use this when user wants to create a view.',
  parameters: z.object({}),
  execute: async () => {
    return { success: true }; // Returning an object to indicate success
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
    return 'View created successfully!'; // Return proper response
  },
});

export const tools = {
  displayViewForm,
  createView,
};
