'use client';

import { useChat } from '@ai-sdk/react';

import { useScrollToBottom } from '@/hooks/use-scroll-to-bottom';
import { Message } from '@/components/message';
import { ChatInput } from '@/components/chatInput';
import { Button } from '@/components/ui/button';

export default function Home() {
  const {
    messages,
    handleSubmit,
    input,
    setInput,
    append,
    stop,
    error,
    reload,
    isLoading,
  } = useChat({
    maxSteps: 10,
  });

  console.log(messages, 'messages');

  // const [messagesContainerRef, messagesEndRef] =
  //   useScrollToBottom<HTMLDivElement>();

  return (
    <div className="flex flex-row justify-center pb-4 md:pb-8 h-dvh bg-background">
      <div className="flex flex-col justify-between items-center gap-4">
        <div className="flex flex-col gap-4 h-full w-dvw items-center overflow-y-scroll">
          {messages.map((message) => (
            <Message
              key={message.id}
              role={message.role}
              content={message.content}
              parts={message.parts}
              append={append}
            />
          ))}

          {error && (
            <>
              <div className="text-red-500">An error occurred.</div>
              <Button variant="outline" type="button" onClick={() => reload()}>
                Retry
              </Button>
            </>
          )}

          <div className="shrink-0 min-w-[24px] min-h-[24px]" />
        </div>

        <form className="flex flex-row gap-2 relative items-end w-full md:max-w-[500px] max-w-[calc(100dvw-32px) px-4 md:px-0">
          <ChatInput
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            messages={messages}
            append={append}
          />
        </form>
      </div>
    </div>
  );
}
