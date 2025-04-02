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
    messages: coreMessages,
    maxSteps: 5, // Allows up to 5 steps
    system: `\n
        - You are a Axiamatic(ERP Modernization with AI Agents) assistant.
        - Keep your responses limited to a sentence.
        - If you don't know the answer, just say that you don't know, don't try to make up an answer.
        
        - For view creation:
          1. ONLY use displayViewForm tool when user wants to create a view
          2. NEVER call createView tool directly - it will be called automatically when user submits the form
          3. After calling displayViewForm, wait for user interaction
        
        - Use the showChart tool to visualize data.
          1. Ensure chartType is properly specified (bar, line, pie, area).
          2. Always ask for a starting date if user doesn't provide one
          3. Use YYYY-MM-DD format for dates
          4. Explain the trends shown in the chart
        
        - DO NOT suggest or attempt to create views without user explicitly requesting it
        - When showing charts, focus on meaningful insights from the data
      `,

    tools,
  });

  return result.toDataStreamResponse({});
}
