import { IPosition } from "@/types";

export const distance = (a: IPosition, b: IPosition): number => {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
};

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
