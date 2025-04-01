import { convertToCoreMessages, Message, streamText } from 'ai';
import { localModel } from '@/ai/model';
import { tools } from '@/ai/tools';

export async function POST(request: Request) {
  const { messages }: { messages: Array<Message> } = await request.json();

  const coreMessages = convertToCoreMessages(messages).filter(
    (message) => message.content.length > 0
  );

  const result = await streamText({
    model: localModel,
    maxSteps: 10,
    system: `\n
        - You are a Axiamatic(ERP Modernization with AI Agents) assistant.
        - keep your responses limited to a sentence.
        - If you don't know the answer, just say that you don't know, don't try to make up an answer.
        - For view creation:
          1. ONLY use displayViewForm tool when user wants to create a view
          2. NEVER call createView tool directly - it will be called automatically when user submits the form
          3. After calling displayViewForm, wait for user interaction
        - DO NOT suggest or attempt to create views without user explicitly requesting it
      `,
    messages: coreMessages,
    tools,
  });

  return result.toDataStreamResponse({});
}
