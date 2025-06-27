import React, { useState, useRef, useEffect } from "react";
import { INodeProps, IImageNodeData } from "@/types";
import { getNodeStyles } from "@/utils";
import { useFlowThemeSafe } from "@/contexts/ThemeContext";
import Handle from "./Handle";

const DefaultNode: React.FC<INodeProps> = ({
  id,
  data,
  selected,
  dragging,
  position,
  shape,
  handleOffset,
  isConnectable = true,
  type,
  width,
  height,
}) => {
  const theme = useFlowThemeSafe();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const node = {
    id,
    position,
    data,
    selected,
    dragging,
    shape,
    handleOffset,
    width,
    height,
  };

  const nodeStyles = getNodeStyles(node, dragging, theme);

  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    // ドラッグ処理はNodeRendererまたは親コンポーネントで処理
  };

  // 画像ノードの場合の処理
  const isImageNode = type === "image";
  const imageData = isImageNode ? (data as IImageNodeData) : null;

  useEffect(() => {
    if (isImageNode && imageData?.imageUrl && imageRef.current) {
      setImageLoaded(false);
      setImageError(false);

      const img = imageRef.current;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageError(true);
    }
  }, [isImageNode, imageData?.imageUrl]);

  // 画像ノードの場合のコンテナスタイル
  const imageContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: `${imageData?.borderRadius || theme.borderRadius.sm}px`,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.colors.background,
    position: "relative",
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: imageData?.objectFit || "cover",
    opacity: imageData?.opacity || 1,
    transition: "opacity 0.3s ease",
  };

  const placeholderStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    color: theme.colors.text.secondary,
    fontSize: theme.typography.fontSize.sm,
    textAlign: "center",
    background: theme.colors.background,
  };

  const loadingStyle: React.CSSProperties = {
    ...placeholderStyle,
    animation: "pulse 2s infinite",
  };

  return (
    <>
      <div style={nodeStyles} onMouseDown={handleMouseDown} data-node-id={id}>
        {isConnectable && (
          <>
            {/* Top handle */}
            <Handle
              id="top"
              type="source"
              position="top"
              nodeId={id}
              offset={handleOffset}
            />

            {/* Right handle */}
            <Handle
              id="right"
              type="source"
              position="right"
              nodeId={id}
              offset={handleOffset}
            />

            {/* Bottom handle */}
            <Handle
              id="bottom"
              type="source"
              position="bottom"
              nodeId={id}
              offset={handleOffset}
            />

            {/* Left handle */}
            <Handle
              id="left"
              type="source"
              position="left"
              nodeId={id}
              offset={handleOffset}
            />
          </>
        )}

        {/* 画像ノードの場合 */}
        {isImageNode && imageData ? (
          <div style={imageContainerStyle}>
            {imageError ? (
              <div style={placeholderStyle}>
                <div style={{ fontSize: "24px", marginBottom: "4px" }}>🖼️</div>
                <div>画像を読み込めません</div>
              </div>
            ) : !imageLoaded ? (
              <div style={loadingStyle}>
                <div style={{ fontSize: "24px", marginBottom: "4px" }}>⏳</div>
                <div>読み込み中...</div>
              </div>
            ) : (
              <img
                ref={imageRef}
                src={imageData.imageUrl}
                alt={imageData.alt || "Node image"}
                style={imageStyle}
                draggable={false}
              />
            )}
          </div>
        ) : (
          /* 通常のテキストノード */
          <>
            <div
              style={{
                fontWeight: theme.typography.fontWeight.bold,
                marginBottom: `${theme.spacing.sm}px`,
                fontSize: theme.typography.fontSize.md,
                color: theme.colors.text.primary,
              }}
            >
              {id}
            </div>
            <div
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.text.secondary,
              }}
            >
              {typeof data === "object" ? JSON.stringify(data) : data}
            </div>
          </>
        )}
      </div>

      {/* 外部ラベル（画像ノードの場合） */}
      {isImageNode && imageData?.label && (
        <div
          style={{
            position: "absolute",
            left: `${position.x + (width || 150) / 2}px`,
            top: `${position.y + (height || 150) + 16}px`,
            transform: "translateX(-50%)",
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.text.secondary,
            textAlign: "center",
            fontWeight: theme.typography.fontWeight.normal,
            lineHeight: theme.typography.lineHeight.tight,
            maxWidth: `${Math.max(width || 140, 100)}px`,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          {imageData.label}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
};

export default DefaultNode;
