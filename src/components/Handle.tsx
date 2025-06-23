import React, { useCallback, useRef } from "react";
import { IHandle as HandleType } from "@/types";

interface HandleProps extends HandleType {
  nodeId: string;
  onConnectionStart?: (
    nodeId: string,
    handleId: string,
    position: { x: number; y: number }
  ) => void;
  onConnectionEnd?: (nodeId: string, handleId: string) => void;
  onClick?: (event: React.MouseEvent) => void;
}

const Handle: React.FC<HandleProps> = ({
  id,
  type,
  position,
  style,
  nodeId,
  onConnectionStart,
  onConnectionEnd,
  onClick,
  offset = 5,
}) => {
  const handleRef = useRef<HTMLDivElement>(null);

  const getPositionStyles = () => {
    const baseStyles = {
      position: "absolute" as const,
      width: "10px",
      height: "10px",
      background: "#007bff",
      border: "2px solid white",
      borderRadius: "50%",
      cursor: "crosshair",
      zIndex: 100,
    };

    switch (position) {
      case "top":
        return {
          ...baseStyles,
          top: `-${offset}px`,
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "right":
        return {
          ...baseStyles,
          right: `-${offset}px`,
          top: "50%",
          transform: "translateY(-50%)",
        };
      case "bottom":
        return {
          ...baseStyles,
          bottom: `-${offset}px`,
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "left":
        return {
          ...baseStyles,
          left: `-${offset}px`,
          top: "50%",
          transform: "translateY(-50%)",
        };
      default:
        return baseStyles;
    }
  };

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const rect = handleRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        onConnectionStart?.(nodeId, id, { x: centerX, y: centerY });
      }
    },
    [nodeId, id, onConnectionStart]
  );

  const handleMouseUp = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      onConnectionEnd?.(nodeId, id);
    },
    [nodeId, id, onConnectionEnd]
  );

  return (
    <div
      ref={handleRef}
      style={{
        ...getPositionStyles(),
        ...style,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
      data-handleid={id}
      data-handletype={type}
      data-nodeid={nodeId}
    />
  );
};

export default Handle;
