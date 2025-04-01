'use client';

import { ChatRequestOptions, CreateMessage, Message as MessageType } from 'ai';
import { ReactNode } from 'react';

import { Markdown } from './markdown';
import { Robot, User } from '@phosphor-icons/react';
import { CreateViewForm } from './CreateViewForm';

interface MessageProps {
  role: string;
  content: string | ReactNode;
  parts?: {
    type: 'tool-invocation';
    toolInvocation: {
      toolCallId: string;
      toolName: 'displayViewForm' | 'createView';
    };
  }[];
  append: (
    message: MessageType | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
}

export const Message = ({ role, content, parts, append }: MessageProps) => {
  return (
    <div
      className={`flex flex-row gap-4 px-4 w-full md:w-[500px] md:px-0 first-of-type:pt-20`}
    >
      <div className="size-[24px] border rounded-sm p-1 flex flex-col justify-center items-center shrink-0 text-zinc-500">
        {role === 'assistant' ? (
          <Robot size={16} className="text-slate-700" weight="fill" />
        ) : (
          <User size={16} className="text-slate-700" weight="fill" />
        )}
      </div>

      <div className="flex flex-col gap-2 w-full">
        {content && typeof content === 'string' && (
          <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4">
            <Markdown>{content}</Markdown>
          </div>
        )}

        {parts && (
          <div className="flex flex-col gap-4">
            {parts.map((part) => {
              switch (part.type) {
                case 'tool-invocation': {
                  const callId = part.toolInvocation.toolCallId;

                  switch (part.toolInvocation.toolName) {
                    case 'displayViewForm': {
                      return (
                        <div key={callId}>
                          <CreateViewForm
                            onComplete={({
                              viewname,
                              description = 'Default Description',
                            }) => {
                              append({
                                role: 'user',
                                content: `createView with viewname: ${viewname} and description: ${description}`,
                              });
                            }}
                          />
                        </div>
                      );
                    }
                    case 'createView': {
                      return (
                        <div key={callId}>
                          <p>✅ View created successfully!</p>
                        </div>
                      );
                    }
                  }
                }
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};
