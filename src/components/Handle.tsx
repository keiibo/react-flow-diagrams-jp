import React, { useCallback, useRef } from "react";
import { IHandle as HandleType } from "@/types";
import { useFlowThemeSafe } from "@/contexts/ThemeContext";

/**
 * ハンドルコンポーネントのプロパティ
 */
interface HandleProps extends HandleType {
  /** ハンドルが属するノードのID */
  nodeId: string;
  /** 接続開始時のコールバック関数 */
  onConnectionStart?: (
    nodeId: string,
    handleId: string,
    position: { x: number; y: number }
  ) => void;
  /** 接続終了時のコールバック関数 */
  onConnectionEnd?: (nodeId: string, handleId: string) => void;
  /** ハンドルクリック時のコールバック関数 */
  onClick?: (event: React.MouseEvent) => void;
}

/**
 * ハンドルコンポーネント
 *
 * ノードの接続ポイントとして機能し、ドラッグ操作によるエッジ作成をサポートします。
 * テーマシステムに対応し、ノードの4方向（上下左右）に配置可能です。
 *
 * @param props - ハンドルのプロパティ
 * @returns ハンドルを表すdiv要素
 */
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
  const theme = useFlowThemeSafe();
  const handleRef = useRef<HTMLDivElement>(null);

  const getPositionStyles = () => {
    const handleSize = theme.node.handleSize;
    const baseStyles = {
      position: "absolute" as const,
      width: `${handleSize}px`,
      height: `${handleSize}px`,
      background: theme.colors.handle.default,
      border: `2px solid ${theme.colors.surface}`,
      borderRadius: theme.borderRadius.full,
      cursor: "crosshair",
      zIndex: 100,
      transition: "all 0.2s ease",
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
