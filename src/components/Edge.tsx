import React from "react";
import { IEdge as EdgeType } from "@/types";

/**
 * エッジコンポーネントのプロパティ
 */
interface EdgeProps {
  /** 表示するエッジの情報 */
  edge: EdgeType;
  /** エッジクリック時のコールバック関数 */
  onClick?: (event: React.MouseEvent, edge: EdgeType) => void;
}

/**
 * 基本的なエッジコンポーネント
 * 2つの固定点を結ぶシンプルな直線を描画します
 *
 * @param props - エッジコンポーネントのプロパティ
 * @returns エッジを表すSVG line要素
 */
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
