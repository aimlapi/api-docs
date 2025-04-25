import { FC, Fragment } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

import { ChatMessage } from "../../types/chat";
import "./chat-messages.css";

export const ChatMessages: FC<{ messages: ChatMessage[] }> = (props) => {
  return (
    <div className="flex flex-col gap-2 p-2 min-h-[500px] max-h-[500px] min-w-[350px] max-w-[620px] overflow-auto">
      {props.messages.map((item) => (
        <Fragment key={item.id}>
          <div className="ml-auto p-2 bg-blue-100 rounded-md shadow-xs">
            {item.prompt}
          </div>
          {item.answer && (
            <div className="chat__message mr-auto p-2 border border-gray-100 shadow-xs rounded-md max-w-[620px]">
              <Markdown
                remarkPlugins={[remarkGfm]}
                children={item.answer.replace(/\n/gi, "\n &nbsp;")}
                components={{
                  code(props) {
                    const { children, className, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      // @ts-expect-error @todo
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, "")}
                        language={match[1]}
                        style={dracula}
                      />
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};
