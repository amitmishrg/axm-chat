import { convertToCoreMessages, Message, streamText } from 'ai';
import { tools } from '@/ai/tools';
import { openai } from '@ai-sdk/openai';

export async function POST(request: Request) {
  const { messages }: { messages: Array<Message> } = await request.json();

  const coreMessages = convertToCoreMessages(messages).filter(
    (message) => message.content.length > 0
  );

  const result = await streamText({
    model: openai('gpt-4o'),
    messages: coreMessages,
    maxSteps: 5, // Allows up to 5 steps
    system: `\n
        - You are a helpful assistant. you can use the tools provided to help you answer the user
        - You can use the tools by calling the tool name and passing the arguments
        - use scoresVisualization tool to visualize the scores for user requests
        `,

    tools,
  });

  return result.toDataStreamResponse({});
}
