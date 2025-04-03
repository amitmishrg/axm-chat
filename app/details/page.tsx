const Page = () => {
  return (
    <main className="mt-14 p-6 space-y-8 max-w-3xl mx-auto">
      <section aria-labelledby="integration-heading">
        <h1
          id="integration-heading"
          className="text-3xl font-bold mb-6 text-indigo-400"
        >
          Documentation: AI Integration
        </h1>
        <h2 className="text-xl font-semibold mb-4">
          Easy Integration with AI Models
        </h2>
        <ul className="list-disc pl-8 space-y-2">
          <li>
            Use OpenAI (GPT), Hugging Face, Anthropic (Claude), Replicate,
            LangChain, and more in one app.
          </li>
          <li>
            Dynamically route queries to different models based on tasks (e.g.,
            GPT for text, Stable Diffusion for images).
          </li>
        </ul>
      </section>
      <section aria-labelledby="streaming-heading">
        <h2 id="streaming-heading" className="text-xl font-semibold mb-4">
          Streaming Capabilities
        </h2>
        <ul className="list-disc pl-8 space-y-2">
          <li>Token-by-token streaming, improving UI responsiveness.</li>
          <li>Works similarly to ChatGPT or GitHub Copilot, enhancing UX.</li>
          <li>Built with React Server Components for optimal speed.</li>
        </ul>
      </section>
      <section aria-labelledby="orchestration-heading">
        <h2 id="orchestration-heading" className="text-xl font-semibold mb-4">
          AI Orchestration & Routing
        </h2>
        <ul className="list-disc pl-8 space-y-2">
          <li>
            Smartly switch between models based on the query type (e.g., text
            generation vs. image creation).
          </li>
        </ul>
      </section>
      <section aria-labelledby="orchestration-heading">
        <h2 id="orchestration-heading" className="text-xl font-semibold mb-4">
          Unified AI Model Integration
        </h2>
        <ul className="list-disc pl-8 space-y-2">
          <li>
            Supports multiple AI providers: OpenAI (GPT), Hugging Face,
            LangChain, Anthropic (Claude), Replicate, Cohere, etc.
          </li>
          <li>
            Makes it easy to switch between models or combine them in workflows.
          </li>
        </ul>
      </section>
      <section aria-labelledby="orchestration-heading">
        <h2 id="orchestration-heading" className="text-xl font-semibold mb-4">
          Multi-Model AI Agent Capabilities
        </h2>
        <ul className="list-disc pl-8 space-y-2">
          <li>
            Easily build multi-model AI agents that combine different models for
            tasks.
          </li>
          <li>Use LangChain to manage complex AI workflows.</li>
        </ul>
      </section>
      <section aria-labelledby="orchestration-heading">
        <h2 id="orchestration-heading" className="text-xl font-semibold mb-4">
          Prebuilt UI Components & Hooks
        </h2>
        <ul className="list-disc pl-8 space-y-2">
          <li>
            Comes with React hooks (useChat, useCompletion, etc.) for AI-driven
            interfaces.
          </li>
          <li>
            Makes building chatbots, assistants, and AI-powered apps faster.
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Page;
