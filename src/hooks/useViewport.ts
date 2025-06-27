import { useState, useCallback } from "react";
import { IViewport, IPosition } from "@/types";

/**
 * ビューポート操作のためのフックの戻り値
 */
interface UseViewportReturn {
  /** 現在のビューポート状態 */
  viewport: IViewport;
  /** ビューポート状態を直接設定する関数 */
  setViewport: (viewport: IViewport) => void;
  /** ズームインする関数 */
  zoomIn: () => void;
  /** ズームアウトする関数 */
  zoomOut: () => void;
  /** ズームを1.0にリセットする関数 */
  resetZoom: () => void;
  /** ビューを初期状態に戻す関数 */
  fitView: () => void;
  /** 指定した距離だけパンする関数 */
  panBy: (delta: IPosition) => void;
  /** 指定した点を中心にズームする関数 */
  zoomToPoint: (point: IPosition, newZoom: number) => void;
  /** スクリーン座標をフロー座標に変換する関数 */
  screenToFlowPosition: (screenPos: IPosition) => IPosition;
  /** フロー座標をスクリーン座標に変換する関数 */
  flowToScreenPosition: (flowPos: IPosition) => IPosition;
}

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.1;

/**
 * ビューポートの状態とズーム・パン操作を管理するフック
 *
 * @description
 * フロー図のビューポート操作（ズーム・パン）を統合的に管理し、
 * Figmaライクな直感的な操作体験を提供します。
 *
 * @param initialViewport - 初期ビューポート状態（デフォルト: {x: 0, y: 0, zoom: 1}）
 * @returns ビューポート操作のための関数群とstate
 *
 * @example
 * ```tsx
 * const { viewport, zoomIn, zoomOut, panBy } = useViewport();
 *
 * // ズーム操作
 * <button onClick={zoomIn}>+</button>
 * <button onClick={zoomOut}>-</button>
 *
 * // パン操作
 * panBy({ x: 10, y: 10 });
 * ```
 */
export const useViewport = (
  initialViewport: IViewport = { x: 0, y: 0, zoom: 1 }
): UseViewportReturn => {
  const [viewport, setViewport] = useState<IViewport>(initialViewport);

  const clampZoom = (zoom: number): number => {
    return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom));
  };

  const zoomIn = useCallback(() => {
    setViewport((prev) => ({
      ...prev,
      zoom: clampZoom(prev.zoom + ZOOM_STEP),
    }));
  }, []);

  const zoomOut = useCallback(() => {
    setViewport((prev) => ({
      ...prev,
      zoom: clampZoom(prev.zoom - ZOOM_STEP),
    }));
  }, []);

  const resetZoom = useCallback(() => {
    setViewport((prev) => ({
      ...prev,
      zoom: 1,
    }));
  }, []);

  const fitView = useCallback(() => {
    setViewport({
      x: 0,
      y: 0,
      zoom: 1,
    });
  }, []);

  const panBy = useCallback((delta: IPosition) => {
    setViewport((prev) => ({
      ...prev,
      x: prev.x + delta.x,
      y: prev.y + delta.y,
    }));
  }, []);

  const zoomToPoint = useCallback((point: IPosition, newZoom: number) => {
    const clampedZoom = clampZoom(newZoom);

    setViewport((prev) => {
      // カーソル位置でのワールド座標を計算
      const worldPointBeforeZoom = {
        x: (point.x - prev.x) / prev.zoom,
        y: (point.y - prev.y) / prev.zoom,
      };

      // 新しいズームレベルでの同じワールド座標でのスクリーン位置を計算
      const newX = point.x - worldPointBeforeZoom.x * clampedZoom;
      const newY = point.y - worldPointBeforeZoom.y * clampedZoom;

      return {
        x: newX,
        y: newY,
        zoom: clampedZoom,
      };
    });
  }, []);

  const screenToFlowPosition = useCallback(
    (screenPos: IPosition): IPosition => {
      return {
        x: (screenPos.x - viewport.x) / viewport.zoom,
        y: (screenPos.y - viewport.y) / viewport.zoom,
      };
    },
    [viewport]
  );

  const flowToScreenPosition = useCallback(
    (flowPos: IPosition): IPosition => {
      return {
        x: flowPos.x * viewport.zoom + viewport.x,
        y: flowPos.y * viewport.zoom + viewport.y,
      };
    },
    [viewport]
  );

  return {
    viewport,
    setViewport,
    zoomIn,
    zoomOut,
    resetZoom,
    fitView,
    panBy,
    zoomToPoint,
    screenToFlowPosition,
    flowToScreenPosition,
  };
};
