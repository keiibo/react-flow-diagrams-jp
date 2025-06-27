import React from "react";
import { INodeProps } from "@/types";
import { getNodeStyles } from "@/utils";
import { useFlowThemeSafe } from "@/contexts/ThemeContext";
import Handle from "./Handle";

/**
 * デフォルトノードコンポーネント
 *
 * テーマシステムに対応し、4方向のハンドルを持つスタンダードなノードコンポーネントです。
 * ドラッグ、選択、接続などの基本的なノード機能をサポートします。
 *
 * @param props - ノードのプロパティ
 * @returns スタイル適用済みのノード要素
 */
const DefaultNode: React.FC<INodeProps> = ({
  id,
  data,
  selected,
  dragging,
  position,
  shape,
  handleOffset,
  isConnectable = true,
}) => {
  const theme = useFlowThemeSafe();

  const node = {
    id,
    position,
    data,
    selected,
    dragging,
    shape,
    handleOffset,
  };

  const nodeStyles = getNodeStyles(node, dragging, theme);

  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    // ドラッグ処理はNodeRendererまたは親コンポーネントで処理
  };

  return (
    <div style={nodeStyles} onMouseDown={handleMouseDown} data-node-id={id}>
      {isConnectable && (
        <>
          {/* Top handle */}
          <Handle
            id="top"
            type="source"
            position="top"
            nodeId={id}
            offset={handleOffset}
          />

          {/* Right handle */}
          <Handle
            id="right"
            type="source"
            position="right"
            nodeId={id}
            offset={handleOffset}
          />

          {/* Bottom handle */}
          <Handle
            id="bottom"
            type="source"
            position="bottom"
            nodeId={id}
            offset={handleOffset}
          />

          {/* Left handle */}
          <Handle
            id="left"
            type="source"
            position="left"
            nodeId={id}
            offset={handleOffset}
          />
        </>
      )}

      <div
        style={{
          fontWeight: theme.typography.fontWeight.bold,
          marginBottom: `${theme.spacing.sm}px`,
          fontSize: theme.typography.fontSize.md,
          color: theme.colors.text.primary,
        }}
      >
        {id}
      </div>
      <div
        style={{
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.text.secondary,
        }}
      >
        {typeof data === "object" ? JSON.stringify(data) : data}
      </div>
    </div>
  );
};

export default DefaultNode;
