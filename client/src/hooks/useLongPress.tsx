import { useCallback, useRef, useState } from "react";

interface UseLongPressOptions {
  shouldPreventDefault?: boolean;
  delay?: number;
}

const useLongPress = (
  onLongPress: (event: React.MouseEvent | React.TouchEvent) => void,
  onClick: (event: React.MouseEvent | React.TouchEvent) => void,
  { shouldPreventDefault = true, delay = 300 }: UseLongPressOptions = {},
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const target = useRef<EventTarget | null>(null);

  const start = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (shouldPreventDefault && event.target) {
        (event.target as HTMLElement).addEventListener(
          "touchend",
          preventDefault,
          {
            passive: false,
          },
        );
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        onLongPress(event);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault],
  );

  const clear = useCallback(
    (event: React.MouseEvent | React.TouchEvent, shouldTriggerClick = true) => {
      if (timeout.current) clearTimeout(timeout.current);
      if (shouldTriggerClick && !longPressTriggered) onClick(event);
      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        (target.current as HTMLElement).removeEventListener(
          "touchend",
          preventDefault,
        );
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered],
  );

  return {
    onMouseDown: (e: React.MouseEvent) => start(e),
    onTouchStart: (e: React.TouchEvent) => start(e),
    onMouseUp: (e: React.MouseEvent) => clear(e),
    onMouseLeave: (e: React.MouseEvent) => clear(e, false),
    onTouchEnd: (e: React.TouchEvent) => clear(e),
  };
};

const isTouchEvent = (
  event: React.MouseEvent | React.TouchEvent,
): event is React.TouchEvent => {
  return "touches" in event;
};

const preventDefault = (event: React.MouseEvent | React.TouchEvent) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;
