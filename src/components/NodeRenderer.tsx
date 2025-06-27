import React, { useCallback, useState } from "react";
import { INode, IPosition, TNodeTypes } from "@/types";
import NodeWithHandles from "./NodeWithHandles";

/**
 * ノードレンダラーコンポーネントのプロパティ
 */
interface NodeRendererProps {
  /** レンダリングするノード */
  node: INode;
  /** カスタムノードタイプの定義 */
  nodeTypes?: TNodeTypes;
  /** ノード位置変更時のコールバック関数 */
  onNodeChange?: (nodeId: string, position: IPosition) => void;
  /** ノードクリック時のコールバック関数 */
  onClick?: (event: React.MouseEvent, node: INode) => void;
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
 * ノードレンダラーコンポーネント
 *
 * ノードのタイプに応じて適切なノードコンポーネントを選択し、
 * ドラッグ機能とイベントハンドリングを管理します。
 * カスタムノードタイプとデフォルトノードの両方をサポートします。
 *
 * @param props - ノードレンダラーのプロパティ
 * @returns 適切なノードコンポーネント
 */
const NodeRenderer: React.FC<NodeRendererProps> = ({
  node,
  nodeTypes,
  onNodeChange,
  onClick,
  onConnectionStart,
  onConnectionEnd,
  viewport,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<IPosition | null>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (node.draggable === false) return;

      e.stopPropagation();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - node.position.x,
        y: e.clientY - node.position.y,
      });
    },
    [node.position, node.draggable]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !dragStart) return;

      const newPosition = {
        x: (e.clientX - dragStart.x) / viewport.zoom,
        y: (e.clientY - dragStart.y) / viewport.zoom,
      };

      onNodeChange?.(node.id, newPosition);
    },
    [isDragging, dragStart, viewport.zoom, node.id, onNodeChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
  }, []);

  // グローバルマウスイベントの管理
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

  // カスタムノードタイプがある場合はそれを使用
  if (node.type && nodeTypes && nodeTypes[node.type]) {
    const CustomNodeComponent = nodeTypes[node.type];

    return (
      <div
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e, node);
        }}
      >
        <CustomNodeComponent
          id={node.id}
          data={node.data}
          position={node.position}
          selected={node.selected}
          dragging={isDragging}
          type={node.type}
          width={node.width}
          height={node.height}
          shape={node.shape}
          handleOffset={node.handleOffset}
          isConnectable={node.connectable}
          isDraggable={node.draggable}
          isSelectable={node.selectable}
          onConnectionStart={onConnectionStart}
          onConnectionEnd={onConnectionEnd}
        />
      </div>
    );
  }

  // デフォルトノード（DefaultNodeがすべての機能を統合）
  return (
    <NodeWithHandles
      node={node}
      onNodeChange={onNodeChange}
      onClick={onClick}
      onConnectionStart={onConnectionStart}
      onConnectionEnd={onConnectionEnd}
      viewport={viewport}
    />
  );
};

export default NodeRenderer;
