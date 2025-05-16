import { Source } from "../../../../../types";

export const SourceItem = (props: Source) => {
  const { title, text, source } = props;

  const url = new URL(source).hostname;

  return (
    <div className="p-3 mb-2 bg-gray-50 rounded-lg border border-gray-200">
      <h4 className="font-medium text-blue-600 mb-1">{title}</h4>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{text}</p>
      <a
        href={source}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 text-xs hover:underline"
      >
        {url}
      </a>
    </div>
  );
};
