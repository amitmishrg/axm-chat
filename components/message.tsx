'use client';

import { ChatRequestOptions, CreateMessage, Message as MessageType } from 'ai';
import { ReactNode } from 'react';

import { Markdown } from './markdown';
import { Robot, User } from '@phosphor-icons/react';
import { CreateViewForm } from './CreateViewForm';
import { BarChartComponent } from './barChart';
import { SkeletonLoader } from './skeletonLoader';
import { LineChartComponent } from './lineChart';
import { PieChartComponent } from './pieChart';

interface ToolInvocation {
  type: 'tool-invocation';
  toolInvocation: {
    toolCallId: string;
    toolName: 'displayViewForm' | 'createView' | 'showChart';
    state?: 'call' | 'result'; // Ensure tool states are considered
    result?: {
      chartType: 'bar' | 'line' | 'pie'; // Define supported chart types
      chartData: any; // Chart data
    };
  };
}

interface MessageProps {
  role: string;
  content: string | ReactNode;
  parts?: ToolInvocation[];
  append: (
    message: MessageType | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
}

export const Message = ({ role, content, parts, append }: MessageProps) => {
  return (
    <div className="flex flex-row gap-4 px-4 w-full md:w-[500px] md:px-0 first-of-type:pt-20">
      {/* Avatar Section */}
      <div className="size-[24px] border rounded-sm p-1 flex flex-col justify-center items-center shrink-0 text-zinc-500">
        {role === 'assistant' ? (
          <Robot size={16} className="text-slate-700" weight="fill" />
        ) : (
          <User size={16} className="text-slate-700" weight="fill" />
        )}
      </div>

      {/* Message Content */}
      <div className="flex flex-col gap-2 w-full">
        {/* Markdown Text */}
        {content && typeof content === 'string' && (
          <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4">
            <Markdown>{content}</Markdown>
          </div>
        )}

        {/* Handling Tool Invocation */}
        {parts?.length > 0 && (
          <div className="flex flex-col gap-4">
            {parts.map((part) => {
              if (part.type !== 'tool-invocation') return null;
              const { toolCallId, toolName, state, result } =
                part.toolInvocation;

              switch (toolName) {
                case 'displayViewForm': {
                  if (state === 'call') {
                    return (
                      <div key={toolCallId}>
                        <SkeletonLoader message="Loading view form..." />
                      </div>
                    );
                  }
                  return (
                    <div key={toolCallId}>
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
                    <div key={toolCallId}>
                      {state === 'call' ? (
                        <SkeletonLoader message="Creating view..." />
                      ) : (
                        <p>✅ View created successfully!</p>
                      )}
                    </div>
                  );
                }

                case 'showChart': {
                  if (state === 'call')
                    return <SkeletonLoader message="Generating chart..." />;

                  console.log(result, 'result---');

                  if (!result || !result.chartType || !result.chartData) {
                    return <p>⚠️ Error: Invalid chart data received.</p>;
                  }

                  return (
                    <div key={toolCallId}>
                      {getChartComponent(result.chartType, result.chartData)}
                    </div>
                  );
                }

                default:
                  return null;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Helper function to return the correct chart component based on chartType
 */
const getChartComponent = (chartType: string, data: any) => {
  switch (chartType) {
    case 'bar':
      return <BarChartComponent data={data} />;
    case 'line':
      return <LineChartComponent data={data} />;
    case 'pie':
      return <PieChartComponent data={data} />;
    default:
      return <p>⚠️ Unsupported chart type: {chartType}</p>;
  }
};
