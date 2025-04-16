import { tool as createTool, generateText, streamText } from 'ai';
import { z } from 'zod';
import {
  getScoreVisualizationData,
  getSummarizeSentiment,
  transformScoreVisualizationData,
} from './actions';
import { openai } from '@ai-sdk/openai';

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

const summarizeSentiment = createTool({
  description:
    'Summarize the sentiment of a given text in a concise manner with user details',
  parameters: z.object({
    prompt: z.string().describe('text to summarize'),
  }),
  execute: async ({ prompt }) => {
    try {
      const summarizedSentiment = await getSummarizeSentiment(prompt);
      return summarizedSentiment?.output;
    } catch (error) {
      console.log(error, '-----error');

      return 'Failed to generate chart data';
    }
  },
});

export const tools = {
  scoresVisualization,
  summarizeSentiment,
};
