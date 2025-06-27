import { useViewport } from "./useViewport";
import { IPosition, INode, IViewport } from "@/types";

/**
 * React Flow Diagrams JPのメインフック
 *
 * @description
 * フロー図操作に必要な機能を統合的に提供するフック。
 * ビューポート操作、ノード操作を簡単に利用可能。
 *
 * @example
 * ```tsx
 * function MyFlowApp() {
 *   const reactFlowInstance = useReactFlow();
 *
 *   const handleZoomIn = () => {
 *     reactFlowInstance.zoomIn();
 *   };
 *
 *   const handleFitView = () => {
 *     reactFlowInstance.fitView();
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleZoomIn}>Zoom In</button>
 *       <button onClick={handleFitView}>Fit View</button>
 *     </div>
 *   );
 * }
 * ```
 */
export const useReactFlow = () => {
  const {
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
  } = useViewport();

  /**
   * 指定したノードまでスムーズにズーム
   */
  const zoomToNode = (
    nodeId: string,
    nodes: INode[],
    zoomLevel: number = 1.5
  ) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      const centerX = node.position.x + (node.width || 150) / 2;
      const centerY = node.position.y + (node.height || 100) / 2;

      // ビューポートの中心に配置
      const newX = window.innerWidth / 2 - centerX * zoomLevel;
      const newY = window.innerHeight / 2 - centerY * zoomLevel;

      setViewport({
        x: newX,
        y: newY,
        zoom: zoomLevel,
      });
    }
  };

  /**
   * 複数ノードがすべて見えるようにフィット
   */
  const fitToNodes = (
    nodeIds: string[],
    nodes: INode[],
    padding: number = 50
  ) => {
    const targetNodes = nodes.filter((node) => nodeIds.includes(node.id));
    if (targetNodes.length === 0) return;

    // バウンディングボックスを計算
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    targetNodes.forEach((node) => {
      const width = node.width || 150;
      const height = node.height || 100;

      minX = Math.min(minX, node.position.x);
      minY = Math.min(minY, node.position.y);
      maxX = Math.max(maxX, node.position.x + width);
      maxY = Math.max(maxY, node.position.y + height);
    });

    const boundsWidth = maxX - minX;
    const boundsHeight = maxY - minY;

    // ウィンドウサイズを取得
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // 適切なズームレベルを計算
    const zoomX = (windowWidth - padding * 2) / boundsWidth;
    const zoomY = (windowHeight - padding * 2) / boundsHeight;
    const newZoom = Math.min(zoomX, zoomY, 1.5); // 最大1.5倍まで

    // 中央に配置
    const centerX = minX + boundsWidth / 2;
    const centerY = minY + boundsHeight / 2;
    const newX = windowWidth / 2 - centerX * newZoom;
    const newY = windowHeight / 2 - centerY * newZoom;

    setViewport({
      x: newX,
      y: newY,
      zoom: newZoom,
    });
  };

  /**
   * プログラムで任意の位置にパンする
   */
  const panTo = (position: IPosition) => {
    const newViewport: IViewport = {
      ...viewport,
      x: -position.x * viewport.zoom + window.innerWidth / 2,
      y: -position.y * viewport.zoom + window.innerHeight / 2,
    };
    setViewport(newViewport);
  };

  return {
    // ビューポート操作
    viewport,
    setViewport,
    zoomIn,
    zoomOut,
    resetZoom,
    fitView,
    panBy,
    zoomToPoint,
    zoomToNode,
    fitToNodes,
    panTo,

    // 座標変換
    screenToFlowPosition,
    flowToScreenPosition,

    // 現在のビューポート情報を取得
    getViewport: () => viewport,

    // フロー図が初期化済みかどうか
    isReady: true,
  };
};
