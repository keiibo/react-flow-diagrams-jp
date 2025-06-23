import { useState, useCallback, useRef } from "react";
import { IPosition } from "@/types";

interface UseDragReturn {
  isDragging: boolean;
  dragStart: (startPos: IPosition) => void;
  dragMove: (currentPos: IPosition) => IPosition | null;
  dragEnd: () => void;
}

export const useDrag = (): UseDragReturn => {
  const [isDragging, setIsDragging] = useState(false);
  const startPosition = useRef<IPosition | null>(null);
  const lastPosition = useRef<IPosition | null>(null);

  const dragStart = useCallback((startPos: IPosition) => {
    setIsDragging(true);
    startPosition.current = startPos;
    lastPosition.current = startPos;
  }, []);

  const dragMove = useCallback(
    (currentPos: IPosition): IPosition | null => {
      if (!isDragging || !lastPosition.current) {
        return null;
      }

      const delta = {
        x: currentPos.x - lastPosition.current.x,
        y: currentPos.y - lastPosition.current.y,
      };

      lastPosition.current = currentPos;
      return delta;
    },
    [isDragging]
  );

  const dragEnd = useCallback(() => {
    setIsDragging(false);
    startPosition.current = null;
    lastPosition.current = null;
  }, []);

  return {
    isDragging,
    dragStart,
    dragMove,
    dragEnd,
  };
};
