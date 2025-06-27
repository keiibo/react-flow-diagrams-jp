import React, { useCallback, useRef, useState } from "react";
import { INode as NodeType, IPosition } from "@/types";
import { getNodeStyles } from "@/utils";
import Handle from "./Handle";

/**
 * ハンドル付きノードコンポーネントのプロパティ
 */
interface NodeWithHandlesProps {
  /** 表示するノード */
  node: NodeType;
  /** ノード位置変更時のコールバック関数 */
  onNodeChange?: (nodeId: string, position: IPosition) => void;
  /** ノードクリック時のコールバック関数 */
  onClick?: (event: React.MouseEvent, node: NodeType) => void;
  /** 接続開始時のコールバック関数 */
  onConnectionStart?: (
    nodeId: string,
    handleId: string,
    position: IPosition
  ) => void;
  /** 接続終了時のコールバック関数 */
  onConnectionEnd?: (nodeId: string, handleId: string) => void;
  /** ビューポート情報 */
  viewport: { x: number; y: number; zoom: number };
}

/**
 * ハンドル付きノードコンポーネント
 *
 * 4方向のハンドルを持ち、ドラッグ移動と接続機能をサポートするノードです。
 * ビューポート座標変換とドラッグ検出機能を内蔵しています。
 *
 * @param props - ハンドル付きノードのプロパティ
 * @returns ハンドル付きのノード要素
 */
const NodeWithHandles: React.FC<NodeWithHandlesProps> = ({
  node,
  onNodeChange,
  onClick,
  onConnectionStart,
  onConnectionEnd,
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

  const handleConnectionStart = useCallback(
    (nodeId: string, handleId: string, position: IPosition) => {
      onConnectionStart?.(nodeId, handleId, position);
    },
    [onConnectionStart]
  );

  const handleConnectionEnd = useCallback(
    (nodeId: string, handleId: string) => {
      onConnectionEnd?.(nodeId, handleId);
    },
    [onConnectionEnd]
  );

  const nodeStyles = getNodeStyles(node, isDragging);

  return (
    <div
      ref={nodeRef}
      style={nodeStyles}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      data-node-id={node.id}
    >
      {/* Top handle */}
      <Handle
        id="top"
        type="source"
        position="top"
        nodeId={node.id}
        onConnectionStart={handleConnectionStart}
        onConnectionEnd={handleConnectionEnd}
        offset={node.handleOffset}
      />

      {/* Right handle */}
      <Handle
        id="right"
        type="source"
        position="right"
        nodeId={node.id}
        onConnectionStart={handleConnectionStart}
        onConnectionEnd={handleConnectionEnd}
        offset={node.handleOffset}
      />

      {/* Bottom handle */}
      <Handle
        id="bottom"
        type="source"
        position="bottom"
        nodeId={node.id}
        onConnectionStart={handleConnectionStart}
        onConnectionEnd={handleConnectionEnd}
        offset={node.handleOffset}
      />

      {/* Left handle */}
      <Handle
        id="left"
        type="source"
        position="left"
        nodeId={node.id}
        onConnectionStart={handleConnectionStart}
        onConnectionEnd={handleConnectionEnd}
        offset={node.handleOffset}
      />

      <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{node.id}</div>
      <div style={{ fontSize: "12px", color: "#6c757d" }}>
        {typeof node.data === "object" ? JSON.stringify(node.data) : node.data}
      </div>
    </div>
  );
};

export default NodeWithHandles;
