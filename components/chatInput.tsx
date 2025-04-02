'use client';

import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import React, { useRef, useEffect } from 'react';

import { ArrowCircleUp, StopCircle } from '@phosphor-icons/react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

const suggestedActions = [
  {
    title: 'Create a new view',
    label: 'Create a new view from the chat',
    action: 'Create a new view',
  },
  {
    title: 'Device usage visualization',
    label: 'Device usage visualization',
    action: 'Use showDeviceUses tool when user asks about device usage trends',
  },
];

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  stop: () => void;
  messages: Array<Message>;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
}

export function ChatInput(props: ChatInputProps) {
  const { input, setInput, isLoading, stop, messages, append, handleSubmit } =
    props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 0
      }px`;
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  return (
    <div className="relative w-full flex flex-col gap-4">
      {messages.length === 0 && (
        <div className="grid sm:grid-cols-2 gap-4 w-full md:px-0 mx-auto md:max-w-[500px]">
          {suggestedActions.map((suggestedAction, index) => (
            <div
              key={index}
              className={index > 1 ? 'hidden sm:block' : 'block'}
            >
              <button
                onClick={async () => {
                  append({
                    role: 'user',
                    content: suggestedAction.action,
                  });
                }}
                className="border-none bg-muted/50 w-full text-left border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 rounded-lg p-3 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex flex-col"
              >
                <span className="font-medium">{suggestedAction.title}</span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  {suggestedAction.label}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}

      <Textarea
        ref={textareaRef}
        placeholder="Send a message..."
        value={input}
        onChange={handleInput}
        className="min-h-[80px] overflow-hidden resize-none rounded-lg text-base bg-muted border-none"
        rows={3}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (!isLoading) handleSubmit();
          }
        }}
      />

      {isLoading ? (
        <Button
          className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 text-white"
          onClick={(event) => {
            event.preventDefault();
            stop();
          }}
        >
          <StopCircle size={16} weight="fill" />
        </Button>
      ) : (
        <Button
          className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5 text-white"
          onClick={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
          disabled={input.length === 0}
        >
          <ArrowCircleUp size={16} weight="fill" />
        </Button>
      )}
    </div>
  );
}
