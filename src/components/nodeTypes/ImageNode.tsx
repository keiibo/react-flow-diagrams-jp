import React, { useState, useRef, useEffect } from "react";
import { INodeProps, IImageNodeData, IPosition } from "@/types";
import Handle from "../Handle";
import { useFlowThemeSafe } from "@/contexts/ThemeContext";

/**
 * 画像を表示するノードコンポーネント
 */
export const ImageNode: React.FC<INodeProps<IImageNodeData>> = ({
  id,
  data,
  position,
  selected = false,
  dragging = false,
  width = 150,
  height = 150,
  handleOffset = 5,
  isConnectable = true,
  onConnectionStart,
  onConnectionEnd,
}) => {
  const theme = useFlowThemeSafe();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const {
    imageUrl,
    alt = "Node image",
    objectFit = "cover",
    borderRadius = 8,
    opacity = 1,
  } = data;

  // 画像のサイズは削除（フルサイズで表示）

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.onload = () => setImageLoaded(true);
      imageRef.current.onerror = () => setImageError(true);
    }
  }, [imageUrl]);

  const nodeStyle: React.CSSProperties = {
    position: "absolute",
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${width}px`,
    height: `${height}px`,
    background: theme.colors.surface,
    border: `2px solid ${
      selected ? theme.colors.state.selected : theme.colors.border
    }`,
    borderRadius: `${theme.borderRadius.md}px`,
    padding: `${theme.spacing.sm}px`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: dragging ? "grabbing" : "grab",
    boxShadow: selected ? theme.shadows.md : theme.shadows.sm,
    transition: "all 0.2s ease",
    fontFamily: theme.typography.fontFamily,
    zIndex: selected ? 1000 : 1,
  };

  const imageContainerStyle: React.CSSProperties = {
    width: `${width - theme.spacing.sm * 2}px`,
    height: `${height - theme.spacing.sm * 2}px`,
    borderRadius: `${borderRadius}px`,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.colors.background,
    border: `1px solid ${theme.colors.border}`,
  };

  const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit,
    opacity,
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
    fontSize: theme.typography.fontSize.xs,
    textAlign: "center",
    background: theme.colors.background,
  };

  const loadingStyle: React.CSSProperties = {
    ...placeholderStyle,
    animation: "pulse 2s infinite",
  };

  return (
    <div style={nodeStyle} className="image-node">
      {/* 接続ハンドル */}
      {isConnectable && (
        <>
          <Handle
            id="top"
            type="target"
            position="top"
            nodeId={id}
            offset={handleOffset}
            onConnectionStart={(
              nodeId: string,
              handleId: string,
              position: IPosition
            ) => onConnectionStart?.(nodeId, handleId, position)}
            onConnectionEnd={(nodeId: string, handleId: string) =>
              onConnectionEnd?.(nodeId, handleId)
            }
          />
          <Handle
            id="right"
            type="source"
            position="right"
            nodeId={id}
            offset={handleOffset}
            onConnectionStart={(
              nodeId: string,
              handleId: string,
              position: IPosition
            ) => onConnectionStart?.(nodeId, handleId, position)}
            onConnectionEnd={(nodeId: string, handleId: string) =>
              onConnectionEnd?.(nodeId, handleId)
            }
          />
          <Handle
            id="bottom"
            type="source"
            position="bottom"
            nodeId={id}
            offset={handleOffset}
            onConnectionStart={(
              nodeId: string,
              handleId: string,
              position: IPosition
            ) => onConnectionStart?.(nodeId, handleId, position)}
            onConnectionEnd={(nodeId: string, handleId: string) =>
              onConnectionEnd?.(nodeId, handleId)
            }
          />
          <Handle
            id="left"
            type="target"
            position="left"
            nodeId={id}
            offset={handleOffset}
            onConnectionStart={(
              nodeId: string,
              handleId: string,
              position: IPosition
            ) => onConnectionStart?.(nodeId, handleId, position)}
            onConnectionEnd={(nodeId: string, handleId: string) =>
              onConnectionEnd?.(nodeId, handleId)
            }
          />
        </>
      )}

      {/* 画像コンテナ */}
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
            src={imageUrl}
            alt={alt}
            style={imageStyle}
            draggable={false}
          />
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .image-node:hover {
          box-shadow: ${theme.shadows.lg};
        }
      `}</style>
    </div>
  );
};
