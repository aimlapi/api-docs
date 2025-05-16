import { useCallback, useEffect, useRef } from "react";

type UseAdjustFieldHeightParams = {
  value: string;
};

const MAX_HEIGHT = 240;

export const useAdjustFieldHeight = <X extends HTMLElement>({
  value
}: UseAdjustFieldHeightParams) => {
  const fieldRef = useRef<X>(null);

  const handleAdjustHeight = useCallback(() => {
    const field = fieldRef.current;

    if (!field) {
      return;
    }

    field.style.height = "auto";

    if (field.scrollHeight > MAX_HEIGHT) {
      field.style.height = `${MAX_HEIGHT}px`;
      field.style.overflowY = "auto";

      return;
    }

    field.style.height = `${field.scrollHeight}px`;
    field.style.overflowY = "hidden";
  }, []);

  useEffect(() => {
    handleAdjustHeight();
  }, [value, handleAdjustHeight]);

  return { fieldRef };
};
