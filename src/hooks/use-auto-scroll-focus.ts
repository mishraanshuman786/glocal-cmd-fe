
"use client";

import { useCallback, useEffect, useRef } from "react";

type ScrollTarget = {
  id: string;
  type: string;
};

interface UseAutoScrollFocusOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
}

export function useAutoScrollFocus({
  behavior = "smooth",
  block = "center",
}: UseAutoScrollFocusOptions = {}) {
  const pendingTarget = useRef<ScrollTarget | null>(null);

  const scrollTo = useCallback((type: string, id: string) => {
    pendingTarget.current = { type, id };
  }, []);

  const cancelScroll = useCallback(() => {
    pendingTarget.current = null;
  }, []);

  useEffect(() => {
    const target = pendingTarget.current;
    if (!target) return;

    // Wait until the newly added element is rendered.
    requestAnimationFrame(() => {
      const element = document.querySelector<HTMLElement>(
        `[data-scroll-type="${target.type}"][data-scroll-id="${target.id}"]`
      );

      if (!element) {
        pendingTarget.current = null;
        return;
      }

      element.scrollIntoView({
        behavior,
        block,
      });

      const input = element.querySelector<HTMLElement>(
        "[data-scroll-focus]"
      );

      input?.focus({ preventScroll: true });

      pendingTarget.current = null;
    });
  });

  return {
    scrollTo,
    cancelScroll,
  };
}
