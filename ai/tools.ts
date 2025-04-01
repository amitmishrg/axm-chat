import { tool as createTool } from 'ai';
import { z } from 'zod';

const displayViewForm = createTool({
  description:
    'Display the create view form before creating view. This should be the first tool used in create view requests.',
  parameters: z.object({}),
});

const createView = createTool({
  description: 'Create a new view IMPORTANT: Must use displayViewForm first',
  parameters: z.object({
    viewname: z
      .string()
      .min(2, { message: 'Viewname must be at least 2 characters' })
      .describe('Name of the view'),
    description: z.string().optional().describe('Description of the view'),
  }),
  execute: async ({ viewname, description }) => {
    console.log({ viewname, description }, 'description');

    // Additional validation to ensure viewname exists and is valid
    if (!viewname || viewname.trim().length < 2) {
      return 'Error: A valid view name with at least 2 characters is required.';
    }

    try {
      const response = await fetch('/api/views/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ viewname, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to create view');
      }

      return `View "${viewname}" created successfully!`;
    } catch (error) {
      return `Error creating view: ${error}`;
    }
  },
});

export const tools = {
  displayViewForm,
  createView,
};
