import React from 'react';
import { useFlowThemeSafe } from '@/contexts/ThemeContext';

interface ControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onReset: () => void;
  zoom: number;
}

const Controls: React.FC<ControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onFitView,
  onReset,
  zoom,
}) => {
  const theme = useFlowThemeSafe();

  const buttonStyle: React.CSSProperties = {
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: `${theme.borderRadius.sm}px`,
    padding: `${theme.spacing.sm}px ${theme.spacing.md}px`,
    margin: `${theme.spacing.xs}px`,
    cursor: 'pointer',
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: `${theme.controls.buttonSize}px`,
    boxShadow: theme.shadows.sm,
    transition: 'all 0.2s ease',
  };

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: `${theme.controls.position.bottom}px`,
    right: `${theme.controls.position.right}px`,
    display: 'flex',
    flexDirection: 'column',
    background: theme.colors.surface,
    borderRadius: `${theme.borderRadius.md}px`,
    padding: `${theme.spacing.sm}px`,
    boxShadow: theme.shadows.md,
    zIndex: 10,
    border: `1px solid ${theme.colors.border}`,
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onClick={onZoomIn}
        title="Zoom In"
      >
        +
      </button>
      <button
        style={buttonStyle}
        onClick={onZoomOut}
        title="Zoom Out"
      >
        −
      </button>
      <button
        style={buttonStyle}
        onClick={onFitView}
        title="Fit View"
      >
        ⌂
      </button>
      <button
        style={buttonStyle}
        onClick={onReset}
        title="Reset"
      >
        ↺
      </button>
      <div
        style={{
          ...buttonStyle,
          cursor: 'default',
          fontSize: theme.typography.fontSize.xs,
          color: theme.colors.text.secondary,
          background: theme.colors.background,
        }}
      >
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
};

export default Controls;