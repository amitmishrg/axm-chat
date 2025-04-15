import { generateObject } from 'ai';
import { z } from 'zod';
import { ScoreVisualizationData } from './widget-definition';
import { openai } from '@ai-sdk/openai';

export async function transformScoreVisualizationData({
  data,
}: {
  data: ScoreVisualizationData;
}) {
  try {
    const { object: chartData } = await generateObject({
      model: openai('gpt-4o'),
      prompt: `Transform the given data into a format suitable for a chart visualization.
      The data should be transformed into an array of objects, where each object represents a single data point.
      Each object should have two properties: 'label' and 'value'.
      The 'label' property should be a string that represents the label for the data point.
      The 'value' property should be a number that represents the value of the data point.
      Data: ${JSON.stringify(data)}
      `,
      schema: z.object({
        chartData: z.array(
          z.object({
            label: z.string().describe('quarter name'),
            value: z.number().describe('score'),
          })
        ),
        chartType: z.enum(['bar', 'line', 'pie']).describe('chart type'),
      }),
    });

    return chartData;
  } catch (error) {
    console.log(error, '-----error');
  }
}

export async function getScoreVisualizationData(prompt: string) {
  const response = await fetch(
    'https://api.integration.axiamatic.cloud/agentbridge/api/v1/internal/widget/retrieve/data/44077/55047',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.S2S_TOKEN}`,
      },
      body: JSON.stringify({
        prompt,
      }),
    }
  );

  const data = await response.json();
  return data.responseData as ScoreVisualizationData;
}
