import { INode } from "@/types";

export interface NodeSize {
  width: number;
  height: number;
}

export const getNodeSize = (node: INode): NodeSize => {
  // ノードに明示的にサイズが指定されている場合はそれを使用
  if (node.width && node.height) {
    return {
      width: node.width,
      height: node.height,
    };
  }

  const padding = 10;

  switch (node.shape || "rectangle") {
    case "circle":
    case "square":
      return {
        width: 100 + padding * 2,
        height: 100 + padding * 2,
      };
    case "rounded":
    case "rectangle":
    default:
      return {
        width: 120 + padding * 2,
        height: 50 + padding * 2,
      };
  }
};

export const getNodeStyles = (
  node: INode,
  isDragging: boolean = false
): React.CSSProperties => {
  const size = getNodeSize(node);

  const baseStyles: React.CSSProperties = {
    position: "absolute",
    left: node.position.x,
    top: node.position.y,
    padding: "10px",
    background: "white",
    border: node.selected ? "2px solid #007bff" : "1px solid #dee2e6",
    width: `${size.width}px`,
    height: `${size.height}px`,
    textAlign: "center",
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: "none",
    boxShadow: isDragging
      ? "0 8px 16px rgba(0,0,0,0.2)"
      : "0 2px 4px rgba(0,0,0,0.1)",
    pointerEvents: "auto",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    transition: isDragging ? "none" : "transform 0.1s ease",
    zIndex: isDragging ? 1000 : 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
  };

  switch (node.shape || "rectangle") {
    case "circle":
      return {
        ...baseStyles,
        borderRadius: "50%",
      };
    case "square":
      return {
        ...baseStyles,
        borderRadius: "4px",
      };
    case "rounded":
      return {
        ...baseStyles,
        borderRadius: "12px",
      };
    case "rectangle":
    default:
      return {
        ...baseStyles,
        borderRadius: "4px",
      };
  }
};
