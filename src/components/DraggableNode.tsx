import React, { useCallback, useRef, useState } from "react";
import { INode as NodeType, IPosition } from "@/types";

/**
 * ドラッグ可能ノードコンポーネントのプロパティ
 */
interface DraggableNodeProps {
  /** ドラッグ対象のノード */
  node: NodeType;
  /** ノード位置変更時のコールバック関数 */
  onNodeChange?: (nodeId: string, position: IPosition) => void;
  /** ノードクリック時のコールバック関数 */
  onClick?: (event: React.MouseEvent, node: NodeType) => void;
  /** ビューポート情報 */
  viewport: { x: number; y: number; zoom: number };
}

/**
 * ドラッグ可能ノードコンポーネント
 *
 * マウスドラッグによる移動機能を持つノードコンポーネントです。
 * ビューポートのズームと座標変換を考慮した正確な位置計算を行います。
 *
 * @param props - ドラッグ可能ノードのプロパティ
 * @returns ドラッグ可能なノード要素
 */
const DraggableNode: React.FC<DraggableNodeProps> = ({
  node,
  onNodeChange,
  onClick,
  viewport,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<IPosition>({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();

    const rect = nodeRef.current?.getBoundingClientRect();
    if (rect) {
      setIsDragging(true);
      setDragOffset({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging) return;

      const container = nodeRef.current?.closest(
        "[data-flow-container]"
      ) as HTMLElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();

      const newPosition = {
        x:
          (event.clientX - containerRect.left - viewport.x - dragOffset.x) /
          viewport.zoom,
        y:
          (event.clientY - containerRect.top - viewport.y - dragOffset.y) /
          viewport.zoom,
      };

      onNodeChange?.(node.id, newPosition);
    },
    [isDragging, dragOffset, viewport, node.id, onNodeChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (!isDragging) {
        onClick?.(event, node);
      }
    },
    [isDragging, onClick, node]
  );

  return (
    <div
      ref={nodeRef}
      style={{
        position: "absolute",
        left: node.position.x,
        top: node.position.y,
        padding: "10px",
        background: "white",
        border: node.selected ? "2px solid #007bff" : "1px solid #dee2e6",
        borderRadius: "4px",
        minWidth: "120px",
        textAlign: "center",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        boxShadow: isDragging
          ? "0 8px 16px rgba(0,0,0,0.2)"
          : "0 2px 4px rgba(0,0,0,0.1)",
        pointerEvents: "auto",
        transform: isDragging ? "scale(1.05)" : "scale(1)",
        transition: isDragging ? "none" : "transform 0.1s ease",
        zIndex: isDragging ? 1000 : 1,
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{node.id}</div>
      <div style={{ fontSize: "12px", color: "#6c757d" }}>
        {typeof node.data === "object" ? JSON.stringify(node.data) : node.data}
      </div>
    </div>
  );
};

export default DraggableNode;
