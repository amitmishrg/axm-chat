import { createOpenAI } from '@ai-sdk/openai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

const openai = createOpenAI({
  baseURL: 'https://api.studio.nebius.com/v1/',
  apiKey: process.env.NEBIUS_API_KEY,
});

export const model = openai('deepseek-ai/DeepSeek-V3');

const lmstudio = createOpenAICompatible({
  name: 'lmstudio',
  baseURL: `http://127.0.0.1:1234/v1/`,
});

export const localModel = lmstudio('mathstral-7b-v0.1');
