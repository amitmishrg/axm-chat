# AXM Chat - AI-Powered Chat Application

AXM Chat is a modern AI-powered chat application, featuring real-time communication, data visualization, and an intuitive user interface.

## Features

- 💬 Real-time chat interface
- 📊 Interactive data visualization with multiple chart types
  - Area Charts
  - Bar Charts
  - Line Charts
  - Pie Charts
- 🎨 Modern UI components with shadcn/ui
- 🌙 Dark/Light theme support
- ⚡ Fast and responsive design
- 📱 Mobile-friendly interface

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/axm-chat.git
cd axm-chat
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
```

3. Start the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── ai/                 # AI-related functionality
│   ├── actions.ts     # AI action handlers
│   ├── model.ts       # AI model configuration
│   └── tools.ts       # AI tools and functions
├── app/                # App router pages and API routes
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components
│   └── ...            # Feature-specific components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and helpers
└── public/            # Static assets
```

## AI Implementation

### Model Configuration

The application uses multiple AI models configured in `ai/model.ts`:

```typescript
import { createOpenAI, createOpenAICompatible } from '@ai-sdk/openai';

// Cloud-based model configuration
const openai = createOpenAI({
  baseURL: 'https://api.studio.nebius.com/v1/',
  apiKey: process.env.NEBIUS_API_KEY,
});

export const model = openai('deepseek-ai/DeepSeek-V3');

// Local model configuration
const lmstudio = createOpenAICompatible({
  name: 'lmstudio',
  baseURL: `http://127.0.0.1:1234/v1/`,
});

export const localModel = lmstudio('mathstral-7b-v0.1');
```

### AI Tools

The application provides several AI-powered tools in `ai/tools.ts`:

```typescript
import { tool as createTool } from 'ai';

const showChart = createTool({
  description: 'Render a chart based on the provided data',
  parameters: z.object({
    chartType: z.enum(['bar', 'line', 'pie', 'area']),
    date: z.string().describe('Starting date for the chart'),
  }),
  execute: async ({ chartType, date }) => {
    const { chartData } = await generateSampleChartData({ date });
    return { chartType, chartData };
  },
});
```

### AI Actions

AI actions in `ai/actions.ts` handle data generation and processing:

```typescript
import { generateObject } from 'ai';

export async function generateSampleChartData({ date }) {
  const { object: chartData } = await generateObject({
    model: localModel,
    prompt: `Generate monthly usage data starting from ${date}`,
    schema: z.object({
      month: z.string(),
      desktop: z.number(),
      mobile: z.number(),
    }),
  });
  return { chartData };
}
```

## Usage Examples

### Using Chat Components

```tsx
import { ChatInput } from '@/components/chatInput';
import { Message } from '@/components/message';

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        <Message content="Hello!" role="user" />
      </div>
      <ChatInput onSubmit={(message) => console.log(message)} />
    </div>
  );
}
```

### Implementing Charts

```tsx
import { AreaChart } from '@/components/areaChart';

export default function DataVisualization() {
  const data = [
    { date: '2023-01', value: 100 },
    { date: '2023-02', value: 150 },
    // ...
  ];

  return (
    <div className="p-4">
      <AreaChart data={data} />
    </div>
  );
}
```
