import React from "react";
import { INodeProps } from "@/types";
import { getNodeStyles } from "@/utils";
import Handle from "./Handle";

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
  const node = {
    id,
    position,
    data,
    selected,
    dragging,
    shape,
    handleOffset,
  };

  const nodeStyles = getNodeStyles(node, dragging);

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

      <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{id}</div>
      <div style={{ fontSize: "12px", color: "#6c757d" }}>
        {typeof data === "object" ? JSON.stringify(data) : data}
      </div>
    </div>
  );
};

export default DefaultNode;
