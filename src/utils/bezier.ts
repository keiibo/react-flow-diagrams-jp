import { IPosition } from "@/types";

/**
 * ベジェ曲線のパス情報を表すインターフェース
 */
export interface BezierPath {
  /** SVGパス文字列 */
  path: string;
  /** ラベル表示用のX座標 */
  labelX: number;
  /** ラベル表示用のY座標 */
  labelY: number;
}

/**
 * 2つの点を結ぶベジェ曲線のパスを生成します
 * @param sourceX 開始点のX座標
 * @param sourceY 開始点のY座標
 * @param sourcePosition 開始点のハンドル位置
 * @param targetX 終了点のX座標
 * @param targetY 終了点のY座標
 * @param targetPosition 終了点のハンドル位置
 * @param curvature 曲線の曲率（0-1）。デフォルトは0.25
 * @returns ベジェ曲線のパス情報
 */
export const getBezierPath = (
  sourceX: number,
  sourceY: number,
  sourcePosition: "top" | "right" | "bottom" | "left",
  targetX: number,
  targetY: number,
  targetPosition: "top" | "right" | "bottom" | "left",
  curvature = 0.25
): BezierPath => {
  const [sourceControlX, sourceControlY] = getControlPoint(
    sourceX,
    sourceY,
    sourcePosition,
    curvature
  );

  const [targetControlX, targetControlY] = getControlPoint(
    targetX,
    targetY,
    targetPosition,
    curvature
  );

  const path = `M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`;

  const { x: labelX, y: labelY } = getBezierPoint(
    { x: sourceX, y: sourceY },
    { x: sourceControlX, y: sourceControlY },
    { x: targetControlX, y: targetControlY },
    { x: targetX, y: targetY },
    0.5
  );

  return {
    path,
    labelX,
    labelY,
  };
};

/**
 * 2つの点を結ぶスムーズステップパス（角丸の段階的な線）を生成します
 * @param sourceX 開始点のX座標
 * @param sourceY 開始点のY座標
 * @param sourcePosition 開始点のハンドル位置
 * @param targetX 終了点のX座標
 * @param targetY 終了点のY座標
 * @param targetPosition 終了点のハンドル位置
 * @param borderRadius 角丸の半径。デフォルトは5
 * @param offset ハンドルからのオフセット距離。デフォルトは20
 * @returns スムーズステップパスの情報
 */
export const getSmoothStepPath = (
  sourceX: number,
  sourceY: number,
  sourcePosition: "top" | "right" | "bottom" | "left",
  targetX: number,
  targetY: number,
  targetPosition: "top" | "right" | "bottom" | "left",
  borderRadius = 5,
  offset = 20
): BezierPath => {
  const [hX, hY] = getControlPoint(
    sourceX,
    sourceY,
    sourcePosition,
    0.5,
    offset
  );
  const [tX, tY] = getControlPoint(
    targetX,
    targetY,
    targetPosition,
    0.5,
    offset
  );

  let path = `M${sourceX},${sourceY}`;

  if (sourcePosition === "right" && targetPosition === "left") {
    path += ` L${hX},${sourceY} Q${hX + borderRadius},${sourceY} ${
      hX + borderRadius
    },${sourceY + borderRadius}`;
    path += ` L${hX + borderRadius},${tY - borderRadius} Q${
      hX + borderRadius
    },${tY} ${hX},${tY}`;
    path += ` L${targetX},${targetY}`;
  } else {
    path += ` L${hX},${hY} L${tX},${tY} L${targetX},${targetY}`;
  }

  // 簡略化のため、ここでは直線距離の中央を使用
  // より正確にするには、実際のパスに沿った中央点を計算する必要がある
  const labelX = (sourceX + targetX) / 2;
  const labelY = (sourceY + targetY) / 2;

  return {
    path,
    labelX,
    labelY,
  };
};

/**
 * ハンドル位置に基づいてベジェ曲線の制御点を計算します
 * @param x 基準点のX座標
 * @param y 基準点のY座標
 * @param position ハンドルの位置
 * @param curvature 曲線の曲率
 * @param offset オプション：カスタムオフセット距離
 * @returns 制御点の座標 [x, y]
 */
const getControlPoint = (
  x: number,
  y: number,
  position: "top" | "right" | "bottom" | "left",
  curvature: number,
  offset?: number
): [number, number] => {
  const distance = offset || Math.max(Math.abs(x), Math.abs(y)) * curvature;

  switch (position) {
    case "top":
      return [x, y - distance];
    case "right":
      return [x + distance, y];
    case "bottom":
      return [x, y + distance];
    case "left":
      return [x - distance, y];
    default:
      return [x, y];
  }
};

/**
 * ノードのハンドル位置の座標を計算します
 * @param nodeX ノードのX座標
 * @param nodeY ノードのY座標
 * @param nodeWidth ノードの幅
 * @param nodeHeight ノードの高さ
 * @param handlePosition ハンドルの位置
 * @param handleOffset ハンドルのオフセット距離。デフォルトは5
 * @returns ハンドルの座標
 */
export const getHandlePosition = (
  nodeX: number,
  nodeY: number,
  nodeWidth: number,
  nodeHeight: number,
  handlePosition: "top" | "right" | "bottom" | "left",
  handleOffset: number = 5
): IPosition => {
  switch (handlePosition) {
    case "top":
      return { x: nodeX + nodeWidth / 2, y: nodeY - handleOffset };
    case "right":
      return { x: nodeX + nodeWidth + handleOffset, y: nodeY + nodeHeight / 2 };
    case "bottom":
      return { x: nodeX + nodeWidth / 2, y: nodeY + nodeHeight + handleOffset };
    case "left":
      return { x: nodeX - handleOffset, y: nodeY + nodeHeight / 2 };
    default:
      return { x: nodeX + nodeWidth / 2, y: nodeY + nodeHeight / 2 };
  }
};

/**
 * 4次ベジェ曲線上の指定されたパラメータ位置の点を計算します
 * @param p0 開始点
 * @param p1 第1制御点
 * @param p2 第2制御点
 * @param p3 終了点
 * @param t パラメータ（0-1）。0が開始点、1が終了点
 * @returns ベジェ曲線上の点の座標
 */
export const getBezierPoint = (
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  p3: { x: number; y: number },
  t: number
): { x: number; y: number } => {
  const oneMinusT = 1 - t;
  const oneMinusTSquared = oneMinusT * oneMinusT;
  const oneMinusTCubed = oneMinusTSquared * oneMinusT;
  const tSquared = t * t;
  const tCubed = tSquared * t;

  return {
    x:
      oneMinusTCubed * p0.x +
      3 * oneMinusTSquared * t * p1.x +
      3 * oneMinusT * tSquared * p2.x +
      tCubed * p3.x,
    y:
      oneMinusTCubed * p0.y +
      3 * oneMinusTSquared * t * p1.y +
      3 * oneMinusT * tSquared * p2.y +
      tCubed * p3.y,
  };
};
