import React from "react";
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
  // カスタムノードタイプがある場合はそれを使用、なければデフォルトノード
  if (node.type && nodeTypes && nodeTypes[node.type]) {
    const CustomNodeComponent = nodeTypes[node.type];
    return (
      <CustomNodeComponent
        id={node.id}
        data={node.data}
        position={node.position}
        selected={node.selected}
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
    );
  }

  // デフォルトノード（既存のNodeWithHandles）
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
