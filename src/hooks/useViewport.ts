import { useState, useCallback } from "react";
import { IViewport, IPosition } from "@/types";

interface UseViewportReturn {
  viewport: IViewport;
  setViewport: (viewport: IViewport) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  fitView: () => void;
  panBy: (delta: IPosition) => void;
  zoomToPoint: (point: IPosition, newZoom: number) => void;
  screenToFlowPosition: (screenPos: IPosition) => IPosition;
  flowToScreenPosition: (flowPos: IPosition) => IPosition;
}

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 2;
const ZOOM_STEP = 0.1;

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
