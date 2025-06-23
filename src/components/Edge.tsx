import React from "react";
import { IEdge as EdgeType } from "@/types";

interface EdgeProps {
  edge: EdgeType;
  onClick?: (event: React.MouseEvent, edge: EdgeType) => void;
}

const Edge: React.FC<EdgeProps> = ({ edge, onClick }) => {
  return (
    <line
      x1="100"
      y1="100"
      x2="200"
      y2="200"
      stroke={edge.selected ? "#007bff" : "#6c757d"}
      strokeWidth={edge.selected ? 3 : 2}
      onClick={(e) => onClick?.(e, edge)}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Edge;
