import { memo } from "react";

export const LoadingMessage = memo(() => {
  return (
    <div
      className="w-3 h-3 bg-blue-700 rounded-full border-box"
      style={{
        animation: "pulseScale 1.5s ease-in-out infinite"
      }}
    />
  );
});
