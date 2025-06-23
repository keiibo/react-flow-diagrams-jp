import React, { useState, useRef, useEffect } from "react";
import { IEdge as EdgeType, INode } from "@/types";
import { getBezierPath, getHandlePosition, getNodeSize } from "@/utils";

interface BezierEdgeProps {
  edge: EdgeType;
  sourceNode: INode;
  targetNode: INode;
  onClick?: (event: React.MouseEvent, edge: EdgeType) => void;
  onLabelChange?: (edgeId: string, newLabel: string) => void;
}

const BezierEdge: React.FC<BezierEdgeProps> = ({
  edge,
  sourceNode,
  targetNode,
  onClick,
  onLabelChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingLabel, setEditingLabel] = useState(edge.data?.label || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleLabelDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditingLabel(edge.data?.label || "");
  };

  const handleLabelSubmit = () => {
    if (onLabelChange) {
      onLabelChange(edge.id, editingLabel as string);
    }
    setIsEditing(false);
  };

  const handleLabelCancel = () => {
    setEditingLabel(edge.data?.label || "");
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLabelSubmit();
    } else if (e.key === "Escape") {
      handleLabelCancel();
    }
  };

  // 共通のノードサイズ計算を使用

  const sourceSize = getNodeSize(sourceNode);
  const targetSize = getNodeSize(targetNode);

  // sourceHandleとtargetHandleから位置を決定
  const sourceHandlePosition = edge.sourceHandle || "right";
  const targetHandlePosition = edge.targetHandle || "left";

  const sourcePosition = getHandlePosition(
    sourceNode.position.x,
    sourceNode.position.y,
    sourceSize.width,
    sourceSize.height,
    sourceHandlePosition as "top" | "right" | "bottom" | "left",
    sourceNode.handleOffset || 5
  );

  const targetPosition = getHandlePosition(
    targetNode.position.x,
    targetNode.position.y,
    targetSize.width,
    targetSize.height,
    targetHandlePosition as "top" | "right" | "bottom" | "left",
    targetNode.handleOffset || 5
  );

  const { path, labelX, labelY } = getBezierPath(
    sourcePosition.x,
    sourcePosition.y,
    sourceHandlePosition as "top" | "right" | "bottom" | "left",
    targetPosition.x,
    targetPosition.y,
    targetHandlePosition as "top" | "right" | "bottom" | "left"
  );

  return (
    <g>
      <path
        d={path}
        stroke={edge.selected ? "#007bff" : "#6c757d"}
        strokeWidth={edge.selected ? 3 : 2}
        fill="none"
        style={{
          pointerEvents: "stroke",
          cursor: "pointer",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e, edge);
        }}
      />

      {/* Edge label */}
      {(edge.data?.label || isEditing) && (
        <>
          {isEditing ? (
            <foreignObject
              x={labelX - 50}
              y={labelY - 10}
              width="100"
              height="20"
            >
              <input
                ref={inputRef}
                value={editingLabel as string}
                onChange={(e) => setEditingLabel(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleLabelSubmit}
                style={{
                  width: "100%",
                  height: "20px",
                  fontSize: "12px",
                  textAlign: "center",
                  border: "1px solid #007bff",
                  borderRadius: "2px",
                  background: "white",
                  outline: "none",
                }}
              />
            </foreignObject>
          ) : (
            <text
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "12px",
                fill: "#666",
                pointerEvents: "auto",
                userSelect: "none",
                cursor: "pointer",
              }}
              onDoubleClick={handleLabelDoubleClick}
            >
              {edge.data?.label as string}
            </text>
          )}
        </>
      )}

      {/* Arrow marker */}
      <defs>
        <marker
          id={`arrow-${edge.id}`}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="3"
          markerHeight="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path
            d="M0,0 L0,8 L6,4 z"
            fill={edge.selected ? "#007bff" : "#6c757d"}
          />
        </marker>
      </defs>

      <path
        d={path}
        stroke="transparent"
        strokeWidth="8"
        fill="none"
        markerEnd={`url(#arrow-${edge.id})`}
        style={{ pointerEvents: "none" }}
      />
    </g>
  );
};

export default BezierEdge;
