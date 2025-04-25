import { FC, Fragment } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ChatMessage } from "../../types/chat";
import "./chat-messages.css";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export const ChatMessages: FC<{ messages: ChatMessage[] }> = (props) => {
  return (
    <div className="flex flex-col flex-1 gap-2 p-2 overflow-auto max-h-[600px]">
      {props.messages.map((item) => (
        <Fragment key={item.id}>
          <div className="ml-auto p-2 bg-blue-100 rounded-md shadow-xs">
            {item.prompt}
          </div>
          {item.answer && (
            <div className="chat__message mr-auto p-2 border border-gray-100 shadow-xs rounded-md max-w-[620px]">
              <Markdown
                remarkPlugins={[remarkGfm]}
                children={item.answer}
                components={{
                  code(props) {
                    const { children, className, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                      // @ts-expect-error ignore
                      <SyntaxHighlighter
                        {...rest}
                        PreTag="div"
                        children={String(children).replace(/\n$/, "")}
                        language={match[1]}
                        style={dracula}
                      />
                    ) : (
                      <code {...rest} className="code-inline">
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
