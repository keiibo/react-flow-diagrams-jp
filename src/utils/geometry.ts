import { IPosition } from "@/types";

/**
 * 2つの座標点間の距離を計算します
 * @param a 第一の座標点
 * @param b 第二の座標点
 * @returns 2点間の直線距離
 */
export const distance = (a: IPosition, b: IPosition): number => {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
};

/**
 * 複数の座標点の中心点（重心）を計算します
 * @param positions 座標点の配列
 * @returns 中心点の座標。空配列の場合は原点(0,0)を返す
 */
export const getCenter = (positions: IPosition[]): IPosition => {
  if (positions.length === 0) {
    return { x: 0, y: 0 };
  }

  const sum = positions.reduce(
    (acc, pos) => ({
      x: acc.x + pos.x,
      y: acc.y + pos.y,
    }),
    { x: 0, y: 0 }
  );

  return {
    x: sum.x / positions.length,
    y: sum.y / positions.length,
  };
};

/**
 * 複数の座標点を囲む最小の矩形（バウンディングボックス）を計算します
 * @param positions 座標点の配列
 * @returns バウンディングボックスの座標と寸法。空配列の場合は全て0を返す
 */
export const getBoundingBox = (positions: IPosition[]) => {
  if (positions.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  const xs = positions.map((p) => p.x);
  const ys = positions.map((p) => p.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};
