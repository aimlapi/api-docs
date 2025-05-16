import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "../utils";

const MIN_HEIGHT_LAST_MESSAGE = "calc(100dvh - 190px)";
const SCROLL_POSITION_THRESHOLD = 15;

export const useScrollBehavior = () => {
  const [isBottomScroll, setIsBottomScroll] = useState(true);

  const chatRef = useRef<HTMLDivElement>(null);

  const handleAdjustLastMessage = useCallback(() => {
    setTimeout(() => {
      const chatNode = chatRef.current;

      if (!chatNode) {
        return;
      }

      const children = Array.from(chatNode.children) as HTMLDivElement[];

      children.forEach((child) => {
        child.style.minHeight = "";
      });

      const lastChildren = children[children.length - 1];

      if (lastChildren) {
        lastChildren.style.minHeight = MIN_HEIGHT_LAST_MESSAGE;
        lastChildren.scrollIntoView({ behavior: "smooth" });
      }
    });
  }, []);

  const handleCheckBottomScrollPosition = useCallback(() => {
    const chatNode = chatRef.current;

    if (chatNode) {
      const scrollPosition = chatNode.scrollHeight - chatNode.scrollTop;
      const isBottom = Math.abs(scrollPosition - chatNode.clientHeight) < SCROLL_POSITION_THRESHOLD;

      setIsBottomScroll(isBottom);
    }
  }, []);

  const handleScrollToLastMessage = () => {
    const chatNode = chatRef.current;

    if (!chatNode) {
      return;
    }

    const children = Array.from(chatNode.children) as HTMLDivElement[];
    const lastChildren = children[children.length - 1];

    if (lastChildren) {
      lastChildren.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    const chatNode = chatRef.current;

    if (chatNode) {
      chatNode.scrollTop = chatNode.scrollHeight;
    }
  }, []);

  useEffect(() => {
    const chatNode = chatRef.current;
    const handleCheckBottomScrollPositionDebounced = debounce(handleCheckBottomScrollPosition, 200);

    if (chatNode) {
      chatNode.addEventListener("scroll", handleCheckBottomScrollPositionDebounced);
    }

    return () => {
      if (chatNode) {
        chatNode.removeEventListener("scroll", handleCheckBottomScrollPositionDebounced);
      }
    };
  }, [handleCheckBottomScrollPosition]);

  return { handleAdjustLastMessage, chatRef, isBottomScroll, handleScrollToLastMessage };
};
