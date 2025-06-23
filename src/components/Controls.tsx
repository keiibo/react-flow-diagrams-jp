import React from 'react';

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
  const buttonStyle: React.CSSProperties = {
    background: 'white',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '8px 12px',
    margin: '2px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '32px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    borderRadius: '6px',
    padding: '4px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    zIndex: 10,
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
          fontSize: '10px',
          color: '#666',
          background: '#f8f9fa',
        }}
      >
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
};

export default Controls;