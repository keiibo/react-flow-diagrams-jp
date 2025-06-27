import { INode } from "@/types";
import { IFlowTheme } from "@/types/theme";
import { defaultTheme } from "@/themes";

export interface NodeSize {
  width: number;
  height: number;
}

export const getNodeSize = (node: INode, theme: IFlowTheme = defaultTheme): NodeSize => {
  // ノードに明示的にサイズが指定されている場合はそれを使用
  if (node.width && node.height) {
    return {
      width: node.width,
      height: node.height,
    };
  }

  const padding = theme.node.padding;

  switch (node.shape || "rectangle") {
    case "circle":
    case "square":
      const squareSize = Math.max(theme.node.defaultSize.width, theme.node.defaultSize.height);
      return {
        width: squareSize + padding * 2,
        height: squareSize + padding * 2,
      };
    case "rounded":
    case "rectangle":
    default:
      return {
        width: theme.node.defaultSize.width + padding * 2,
        height: theme.node.defaultSize.height + padding * 2,
      };
  }
};

export const getNodeStyles = (
  node: INode,
  isDragging: boolean = false,
  theme: IFlowTheme = defaultTheme
): React.CSSProperties => {
  const size = getNodeSize(node, theme);

  const baseStyles: React.CSSProperties = {
    position: "absolute",
    left: node.position.x,
    top: node.position.y,
    padding: `${theme.node.padding}px`,
    background: theme.colors.surface,
    border: node.selected 
      ? `2px solid ${theme.colors.state.selected}` 
      : `1px solid ${theme.colors.border}`,
    width: `${size.width}px`,
    height: `${size.height}px`,
    textAlign: "center",
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: "none",
    boxShadow: isDragging ? theme.shadows.xl : theme.shadows.md,
    pointerEvents: "auto",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    transition: isDragging ? "none" : "transform 0.1s ease",
    zIndex: isDragging ? 1000 : 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    color: theme.colors.text.primary,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize.md,
  };

  switch (node.shape || "rectangle") {
    case "circle":
      return {
        ...baseStyles,
        borderRadius: theme.borderRadius.full,
      };
    case "square":
      return {
        ...baseStyles,
        borderRadius: `${theme.borderRadius.sm}px`,
      };
    case "rounded":
      return {
        ...baseStyles,
        borderRadius: `${theme.borderRadius.lg}px`,
      };
    case "rectangle":
    default:
      return {
        ...baseStyles,
        borderRadius: `${theme.borderRadius.sm}px`,
      };
  }
};
