"use client";

import { useState, useEffect, useRef } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    // Initialize
    lastScrollY.current = window.scrollY;
    setScrollY(window.scrollY);

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;

      // Update scroll position
      setScrollY(currentScrollY);

      // If we're at the very top, always show navbar
      if (currentScrollY <= 10) {
        setIsVisible(true);
        setScrollDirection(null);
        lastScrollY.current = currentScrollY;
        ticking.current = false;
        return;
      }

      // Determine scroll direction
      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        if (scrollDirection !== "down") {
          setScrollDirection("down");
          setIsVisible(false);
          console.log("Scrolling DOWN - Hide navbar");
        }
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        if (scrollDirection !== "up") {
          setScrollDirection("up");
          setIsVisible(true);
          console.log("Scrolling UP - Show navbar");
        }
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const requestTick = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(updateScrollDirection);
      }
    };

    const onScroll = () => requestTick();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollDirection]); // Include scrollDirection to detect changes

  return {
    scrollDirection,
    scrollY,
    isVisible,
  };
}
