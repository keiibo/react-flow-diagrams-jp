import React, { useRef, useCallback, useEffect, useState } from "react";
import { IFlowProps, IPosition } from "@/types";
import { useViewport, useDrag, useConnection } from "@/hooks";
import Controls from "./Controls";
import BezierEdge from "./BezierEdge";
import NodeRenderer from "./NodeRenderer";

const FlowCanvas: React.FC<IFlowProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onEdgeClick,
  onPaneClick,
  onEdgeLabelChange,
  nodeTypes,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalNodes, setInternalNodes] = useState(nodes);
  const [internalEdges, setInternalEdges] = useState(edges);

  const {
    viewport,
    zoomIn,
    zoomOut,
    resetZoom,
    fitView: fitViewport,
    panBy,
    zoomToPoint,
    screenToFlowPosition,
  } = useViewport();
  const { isDragging, dragStart, dragMove, dragEnd } = useDrag();
  const {
    connectionState,
    startConnection,
    updateConnectionPosition,
    completeConnection,
    cancelConnection,
    connectionPath,
  } = useConnection(
    useCallback(
      (connection: {
        source: string;
        target: string;
        sourceHandle?: string;
        targetHandle?: string;
      }) => {
        const newEdge = {
          id: `e${connection.source}-${connection.target}`,
          source: connection.source,
          target: connection.target,
          sourceHandle: connection.sourceHandle,
          targetHandle: connection.targetHandle,
        };

        setInternalEdges((prevEdges) => {
          const updatedEdges = [...prevEdges, newEdge];
          onEdgesChange?.(updatedEdges);
          return updatedEdges;
        });
        onConnect?.(connection);
      },
      [onEdgesChange, onConnect]
    )
  );

  useEffect(() => {
    setInternalNodes(nodes);
  }, [nodes]);

  useEffect(() => {
    setInternalEdges(edges);
  }, [edges]);

  const handleNodePositionChange = useCallback(
    (nodeId: string, newPosition: IPosition) => {
      setInternalNodes((prevNodes) => {
        const updatedNodes = prevNodes.map((node) =>
          node.id === nodeId ? { ...node, position: newPosition } : node
        );
        onNodesChange?.(updatedNodes);
        return updatedNodes;
      });
    },
    [onNodesChange]
  );

  const handleEdgeLabelChange = useCallback(
    (edgeId: string, newLabel: string) => {
      setInternalEdges((prevEdges) => {
        const updatedEdges = prevEdges.map((edge) =>
          edge.id === edgeId
            ? { ...edge, data: { ...edge.data, label: newLabel } }
            : edge
        );
        onEdgesChange?.(updatedEdges);
        return updatedEdges;
      });
      onEdgeLabelChange?.(edgeId, newLabel);
    },
    [onEdgesChange, onEdgeLabelChange]
  );

  const handleConnectionStart = useCallback(
    (nodeId: string, handleId: string, position: IPosition) => {
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const flowPosition = screenToFlowPosition({
          x: position.x - rect.left,
          y: position.y - rect.top,
        });
        startConnection(nodeId, handleId, flowPosition);
      }
    },
    [startConnection, screenToFlowPosition]
  );

  const handleConnectionEnd = useCallback(
    (nodeId: string, handleId: string) => {
      if (connectionState.isConnecting) {
        completeConnection(nodeId, handleId);
      }
    },
    [connectionState.isConnecting, completeConnection]
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      // デフォルトで背景ドラッグを開始
      // ノードやハンドルがstopPropagation()を呼ぶことで防がれる
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        dragStart({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        });
      }
    },
    [dragStart]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      // Update connection position during drag
      if (connectionState.isConnecting) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const flowPosition = screenToFlowPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          });
          updateConnectionPosition(flowPosition);
        }
      }
    },
    [
      connectionState.isConnecting,
      screenToFlowPosition,
      updateConnectionPosition,
    ]
  );

  const handleMouseUp = useCallback(() => {
    if (connectionState.isConnecting) {
      cancelConnection();
    }
  }, [connectionState.isConnecting, cancelConnection]);

  // グローバルマウスイベントでドラッグ操作を処理
  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const delta = dragMove({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
          });
          if (delta) {
            panBy(delta);
          }
        }
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        dragEnd();
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleGlobalMouseMove);
        document.removeEventListener("mouseup", handleGlobalMouseUp);
      };
    }
  }, [isDragging, dragMove, dragEnd, panBy]);

  const handleWheel = useCallback(
    (event: React.WheelEvent) => {
      event.preventDefault();

      const isMac = navigator.userAgent.toUpperCase().indexOf("MAC") >= 0;
      const isZooming = isMac ? event.metaKey : event.ctrlKey; // MacではCmd、それ以外ではCtrl
      const isHorizontalScroll = event.shiftKey;

      if (isZooming) {
        // Figma風カーソル位置中心ズーム
        const delta = event.deltaY > 0 ? -0.1 : 0.1;
        const newZoom = Math.max(0.1, Math.min(2, viewport.zoom + delta));

        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const mouseX = event.clientX - rect.left;
          const mouseY = event.clientY - rect.top;

          zoomToPoint({ x: mouseX, y: mouseY }, newZoom);
        }
      } else {
        // パン操作 - Figma風の滑らかなパン
        const panSpeed = 1.0; // より滑らかに
        if (isHorizontalScroll) {
          // 横移動 - deltaXとdeltaYの両方をチェック
          const deltaX = event.deltaX || event.deltaY;
          panBy({
            x: -deltaX * panSpeed,
            y: 0,
          });
        } else {
          // 縦移動
          panBy({
            x: -event.deltaX * panSpeed,
            y: -event.deltaY * panSpeed,
          });
        }
      }
    },
    [viewport, zoomToPoint, panBy]
  );

  return (
    <div
      ref={containerRef}
      data-flow-container
      style={{
        width: "100%",
        height: "100%",
        background: "#f8f9fa",
        position: "relative",
        overflow: "hidden",
        border: "1px solid #e9ecef",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none", // テキスト選択を防ぐ
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onClick={onPaneClick}
    >
      <div
        style={{
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
          transformOrigin: "0 0",
          width: "100%",
          height: "100%",
        }}
      >
        <svg
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
          }}
        >
          {/* Grid pattern */}
          <defs>
            <pattern
              id="grid"
              width={20 / viewport.zoom}
              height={20 / viewport.zoom}
              patternUnits="userSpaceOnUse"
              x={viewport.x % (20 / viewport.zoom)}
              y={viewport.y % (20 / viewport.zoom)}
            >
              <path
                d={`M ${20 / viewport.zoom} 0 L 0 0 0 ${20 / viewport.zoom}`}
                fill="none"
                stroke="#e9ecef"
                strokeWidth={1 / viewport.zoom}
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#grid)"
            x={-viewport.x / viewport.zoom}
            y={-viewport.y / viewport.zoom}
          />

          {/* Edges */}
          {internalEdges.map((edge) => {
            const sourceNode = internalNodes.find((n) => n.id === edge.source);
            const targetNode = internalNodes.find((n) => n.id === edge.target);

            if (!sourceNode || !targetNode) return null;

            return (
              <BezierEdge
                key={edge.id}
                edge={edge}
                sourceNode={sourceNode}
                targetNode={targetNode}
                onClick={onEdgeClick}
                onLabelChange={handleEdgeLabelChange}
              />
            );
          })}

          {/* Connection preview */}
          {connectionPath && (
            <path
              d={connectionPath}
              stroke="#007bff"
              strokeWidth={2}
              fill="none"
              strokeDasharray="5,5"
              style={{ pointerEvents: "none" }}
            />
          )}
        </svg>

        {/* Nodes */}
        {internalNodes.map((node) => (
          <NodeRenderer
            key={node.id}
            node={node}
            nodeTypes={nodeTypes}
            onNodeChange={handleNodePositionChange}
            onClick={onNodeClick}
            onConnectionStart={handleConnectionStart}
            onConnectionEnd={handleConnectionEnd}
            viewport={viewport}
          />
        ))}
      </div>

      {/* Controls */}
      <Controls
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onFitView={fitViewport}
        onReset={resetZoom}
        zoom={viewport.zoom}
      />

      {/* Development info */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          background: "rgba(255,255,255,0.9)",
          padding: "8px",
          borderRadius: "4px",
          fontSize: "12px",
          color: "#6c757d",
        }}
      >
        Flow Diagram - {internalNodes.length} nodes, {internalEdges.length}{" "}
        edges - Zoom: {Math.round(viewport.zoom * 100)}%
      </div>
    </div>
  );
};

export default FlowCanvas;
