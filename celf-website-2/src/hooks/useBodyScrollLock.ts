"use client";

import { useEffect } from "react";

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPaddingRight = window.getComputedStyle(document.body).paddingRight;

    if (isLocked) {
      // Get the scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Lock the body scroll
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // Also prevent scroll on html element for better browser support
      document.documentElement.style.overflow = "hidden";
    } else {
      // Restore original styles
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
      document.documentElement.style.overflow = "";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
      document.documentElement.style.overflow = "";
    };
  }, [isLocked]);
}
