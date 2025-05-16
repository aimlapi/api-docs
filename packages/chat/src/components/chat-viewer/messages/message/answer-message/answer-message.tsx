import { ClassAttributes, HTMLAttributes, memo } from "react";

import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import Markdown, { ExtraProps } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { ChatMessage } from "../../../../../types/chat";

import { LoadingMessage } from "./loading-message";
import { SourceItem } from "./source-item";

import "./answer-message.css";

type AnswerMessageProps = Pick<ChatMessage, "answer" | "isLoading" | "source">;

type HighlightCodeProps = ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps;

const HighlightCode = (props: HighlightCodeProps) => {
  const { children, className, ...rest } = props;

  const match = /language-(\w+)/.exec(className || "");

  if (match) {
    return (
      // @ts-expect-error ignore
      <SyntaxHighlighter
        {...rest}
        PreTag="div"
        children={String(children).replace(/\n$/, "")}
        language={match[1]}
        style={dracula}
      />
    );
  }

  return (
    <code {...rest} className="code-inline">
      {children}
    </code>
  );
};

export const AnswerMessage = memo((props: AnswerMessageProps) => {
  const { answer, isLoading, source } = props;

  return (
    <div>
      {isLoading ? (
        <LoadingMessage />
      ) : (
        <div className="chat__message mr-auto p-2 border border-gray-100 shadow-xs rounded-md max-w-[620px]">
          <Markdown
            remarkPlugins={[remarkGfm]}
            children={answer}
            components={{
              code: (props) => <HighlightCode {...props} />
            }}
          />

          {source && source?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">
                {source.length === 1 ? "Source" : "Sources"}
              </h3>
              <div>
                {source.map((item) => (
                  <SourceItem key={item.source} {...item} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
