import React, { useCallback, useRef, useState } from "react";
import { INode as NodeType, IPosition } from "@/types";

/**
 * ドラッグ可能ラッパーコンポーネントのプロパティ
 */
interface DraggableWrapperProps {
  /** ドラッグ対象のノード */
  node: NodeType;
  /** ノード位置変更時のコールバック関数 */
  onNodeChange?: (nodeId: string, position: IPosition) => void;
  /** ノードクリック時のコールバック関数 */
  onClick?: (event: React.MouseEvent, node: NodeType) => void;
  /** 接続開始時のコールバック関数 */
  onConnectionStart?: (
    nodeId: string,
    handleId: string,
    handleType: "source" | "target",
    position: IPosition
  ) => void;
  /** 接続終了時のコールバック関数 */
  onConnectionEnd?: (
    nodeId: string,
    handleId: string,
    handleType: "source" | "target"
  ) => void;
  /** ビューポート情報 */
  viewport: { x: number; y: number; zoom: number };
  /** ラップする子要素 */
  children: React.ReactNode;
}

/**
 * ドラッグ可能ラッパーコンポーネント
 *
 * 任意の子要素をドラッグ可能にするラッパーコンポーネントです。
 * インタラクティブ要素（input、button等）のドラッグを自動的に無効化し、
 * .nodragクラスを持つ要素もドラッグ対象から除外します。
 *
 * @param props - ドラッグ可能ラッパーのプロパティ
 * @returns ドラッグ機能を持つラッパー要素
 */
const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
  node,
  onNodeChange,
  onClick,
  onConnectionStart,
  onConnectionEnd,
  viewport,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<IPosition>({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    // event.targetをチェックして、インタラクティブ要素の場合はドラッグを開始しない
    const target = event.target as HTMLElement;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "BUTTON" ||
      target.tagName === "SELECT" ||
      target.tagName === "TEXTAREA" ||
      target.closest(".nodrag")
    ) {
      return;
    }

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
        pointerEvents: "auto",
        zIndex: isDragging ? 1000 : 1,
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      data-node-id={node.id}
    >
      {React.cloneElement(children as React.ReactElement, {
        dragging: isDragging,
        selected: node.selected,
        onConnectionStart,
        onConnectionEnd,
      })}
    </div>
  );
};

export default DraggableWrapper;
