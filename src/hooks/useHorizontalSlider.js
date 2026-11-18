import { useCallback, useEffect, useRef, useState } from "react";

export function useHorizontalSlider(count) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isAnimating = useRef(false);
  const wheelCooldown = useRef(false);
  const dragStartX = useRef(null);
  const dragDeltaX = useRef(0);

  const goTo = useCallback(
    (nextIndex) => {
      if (isAnimating.current) return;
      const clamped = Math.max(0, Math.min(count - 1, nextIndex));
      if (clamped === index) return;
      setDirection(clamped > index ? 1 : -1);
      isAnimating.current = true;
      setIndex(clamped);
      setTimeout(() => {
        isAnimating.current = false;
      }, 650);
    },
    [count, index]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const onWheel = useCallback(
    (e) => {
      if (wheelCooldown.current) return;
      const magnitude = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(magnitude) < 12) return;
      wheelCooldown.current = true;
      if (magnitude > 0) next();
      else prev();
      setTimeout(() => {
        wheelCooldown.current = false;
      }, 700);
    },
    [next, prev]
  );

  const onPointerDown = useCallback((e) => {
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX ?? null;
    dragDeltaX.current = 0;
  }, []);

  const onPointerMove = useCallback((e) => {
    if (dragStartX.current === null) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? dragStartX.current;
    dragDeltaX.current = x - dragStartX.current;
  }, []);

  const onPointerUp = useCallback(() => {
    if (dragStartX.current === null) return;
    const threshold = 60;
    if (dragDeltaX.current < -threshold) next();
    else if (dragDeltaX.current > threshold) prev();
    dragStartX.current = null;
    dragDeltaX.current = 0;
  }, [next, prev]);

  return {
    index,
    direction,
    next,
    prev,
    goTo,
    bind: {
      onWheel,
      onMouseDown: onPointerDown,
      onMouseMove: onPointerMove,
      onMouseUp: onPointerUp,
      onMouseLeave: onPointerUp,
      onTouchStart: onPointerDown,
      onTouchMove: onPointerMove,
      onTouchEnd: onPointerUp,
    },
  };
}
