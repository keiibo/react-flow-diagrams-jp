import React, { useCallback, useState } from "react";
import { INode, IPosition, TNodeTypes } from "@/types";
import NodeWithHandles from "./NodeWithHandles";

interface NodeRendererProps {
  node: INode;
  nodeTypes?: TNodeTypes;
  onNodeChange?: (nodeId: string, position: IPosition) => void;
  onClick?: (event: React.MouseEvent, node: INode) => void;
  onConnectionStart?: (
    nodeId: string,
    handleId: string,
    position: IPosition
  ) => void;
  onConnectionEnd?: (nodeId: string, handleId: string) => void;
  viewport: { x: number; y: number; zoom: number };
}

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
