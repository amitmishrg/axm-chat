import { tool as createTool } from 'ai';
import { z } from 'zod';
import {
  getScoreVisualizationData,
  transformScoreVisualizationData,
} from './actions';

const scoresVisualization = createTool({
  description: 'Visualize the scores',
  parameters: z.object({
    prompt: z.string(),
  }),
  execute: async ({ prompt }) => {
    try {
      const scoreVisualizationData = await getScoreVisualizationData(prompt);

      const transformedvisualizationData =
        await transformScoreVisualizationData({ data: scoreVisualizationData });

      return transformedvisualizationData;
    } catch (error) {
      console.log(error, '-----error');

      return 'Failed to generate chart data';
    }
  },
});

export const tools = {
  scoresVisualization,
};
