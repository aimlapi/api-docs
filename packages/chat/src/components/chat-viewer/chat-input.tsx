import { FC, useCallback } from "react";

export const ChatInput: FC<{
  value: string;
  onChange: React.ChangeEventHandler;
  onSubmit: React.FormEventHandler;
}> = (props) => {
  const handleSubmit = useCallback(
    (ev: React.FormEvent) => {
      ev.preventDefault();
      props.onSubmit(ev);
    },
    [props]
  );

  return (  
    <form
      className="flex gap-2 border-t p-2 mt-auto border-gray-100"
      onSubmit={handleSubmit}
    >
      <input
        className="border border-gray-100 p-2 w-full rounded-sm outline-transparent outline-2 focus:outline-2 focus:outline-blue-200 transition-colors"
        onChange={props.onChange}
        value={props.value}
        placeholder="Your message"
      />
      <button
        className="p-2 cursor-pointer text-blue-500 font-medium"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};
