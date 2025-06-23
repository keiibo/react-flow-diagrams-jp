import React from "react";
import { INode as NodeType } from "@/types";

interface NodeProps {
  node: NodeType;
  onClick?: (event: React.MouseEvent, node: NodeType) => void;
}

const Node: React.FC<NodeProps> = ({ node, onClick }) => {
  return (
    <div
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
        cursor: "grab",
        userSelect: "none",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e, node);
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{node.id}</div>
      <div style={{ fontSize: "12px", color: "#6c757d" }}>
        {typeof node.data === "string" ? node.data : JSON.stringify(node.data)}
      </div>
    </div>
  );
};

export default Node;
