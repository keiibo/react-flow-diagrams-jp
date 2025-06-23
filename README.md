# React Flow Diagrams JP

A lightweight, MIT-licensed alternative to React Flow for building interactive node-based diagrams and flow charts.

## Features

- 🚀 **Lightweight & Fast** - Optimized for performance with 100+ nodes
- 📝 **MIT Licensed** - No licensing constraints, completely free to use
- 🎯 **React Flow Compatible** - Easy migration from React Flow with familiar API
- 🎨 **Customizable Nodes** - Support for different node shapes and custom components
- 🔗 **Interactive Connections** - Drag-and-drop edge creation with Bezier curves
- 🔍 **Zoom & Pan** - Smooth viewport controls with Figma-like navigation
- 🎛️ **Built-in Controls** - Zoom in/out, fit view, and reset controls
- 🔧 **TypeScript** - Full TypeScript support with strict typing

## Installation

```bash
npm install react-flow-diagrams-jp
# or
yarn add react-flow-diagrams-jp
# or
pnpm add react-flow-diagrams-jp
```

## Quick Start

```tsx
import React, { useState } from 'react';
import { FlowCanvas, INode, IEdge } from 'react-flow-diagrams-jp';

const initialNodes: INode[] = [
  {
    id: '1',
    position: { x: 100, y: 100 },
    data: { label: 'Node 1' },
  },
  {
    id: '2',
    position: { x: 300, y: 100 },
    data: { label: 'Node 2' },
  },
];

const initialEdges: IEdge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
];

function FlowDiagram() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  return (
    &lt;div style={{ width: '100vw', height: '100vh' }}&gt;
      &lt;FlowCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
      /&gt;
    &lt;/div&gt;
  );
}

export default FlowDiagram;
```

## Basic Usage

### Node Types and Shapes

React Flow Lite supports different node shapes out of the box:

```tsx
const nodes: INode[] = [
  {
    id: "rect",
    position: { x: 50, y: 50 },
    data: { label: "Rectangle" },
    shape: "rectangle",
  },
  {
    id: "circle",
    position: { x: 200, y: 50 },
    data: { label: "Circle" },
    shape: "circle",
  },
  {
    id: "rounded",
    position: { x: 350, y: 50 },
    data: { label: "Rounded" },
    shape: "rounded",
  },
  {
    id: "square",
    position: { x: 500, y: 50 },
    data: { label: "Square" },
    shape: "square",
  },
];
```

### Interactive Connections

Enable node connections by handling the `onConnect` callback:

```tsx
function InteractiveFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const handleConnect = (connection) =&gt; {
    const newEdge = {
      id: `e${connection.source}-${connection.target}`,
      source: connection.source,
      target: connection.target,
      sourceHandle: connection.sourceHandle,
      targetHandle: connection.targetHandle,
    };
    setEdges(prev =&gt; [...prev, newEdge]);
  };

  return (
    &lt;FlowCanvas
      nodes={nodes}
      edges={edges}
      onNodesChange={setNodes}
      onEdgesChange={setEdges}
      onConnect={handleConnect}
    /&gt;
  );
}
```

### Edge Labels

Add and edit labels on edges:

```tsx
const edgesWithLabels: IEdge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    data: { label: 'Double-click to edit' },
  },
];

&lt;FlowCanvas
  nodes={nodes}
  edges={edgesWithLabels}
  onEdgeLabelChange={(edgeId, newLabel) =&gt; {
    console.log(`Edge ${edgeId} label changed to: ${newLabel}`);
  }}
/&gt;
```

## Navigation Controls

React Flow Lite provides intuitive navigation:

- **Mouse Wheel**: Vertical panning
- **Shift + Mouse Wheel**: Horizontal panning
- **Cmd/Ctrl + Mouse Wheel**: Zoom in/out at cursor position
- **Background Drag**: Pan the entire canvas
- **Node Drag**: Move individual nodes
- **Handle Drag**: Create connections between nodes

## API Reference

### FlowCanvas Props

| Prop                | Type                                       | Description                           |
| ------------------- | ------------------------------------------ | ------------------------------------- |
| `nodes`             | `INode[]`                                  | Array of nodes to display             |
| `edges`             | `IEdge[]`                                  | Array of edges to display             |
| `onNodesChange`     | `(nodes: INode[]) => void`                 | Callback when nodes change            |
| `onEdgesChange`     | `(edges: IEdge[]) => void`                 | Callback when edges change            |
| `onConnect`         | `(connection: Connection) => void`         | Callback when nodes are connected     |
| `onNodeClick`       | `(event: MouseEvent, node: INode) => void` | Callback when a node is clicked       |
| `onEdgeClick`       | `(event: MouseEvent, edge: IEdge) => void` | Callback when an edge is clicked      |
| `onPaneClick`       | `(event: MouseEvent) => void`              | Callback when background is clicked   |
| `onEdgeLabelChange` | `(edgeId: string, label: string) => void`  | Callback when edge label changes      |
| `nodeTypes`         | `TNodeTypes`                               | Custom node component types           |
| `edgeTypes`         | `TEdgeTypes`                               | Custom edge component types           |
| `fitView`           | `boolean`                                  | Whether to fit view on initial render |
| `fitViewOptions`    | `FitViewOptions`                           | Options for fit view behavior         |

### INode Interface

```tsx
interface INode&lt;T = any&gt; {
  id: string;
  position: IPosition;
  data: T;
  type?: string;
  selected?: boolean;
  shape?: 'rectangle' | 'square' | 'circle' | 'rounded';
  handleOffset?: number;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  width?: number;
  height?: number;
}
```

### IEdge Interface

```tsx
interface IEdge&lt;T = any&gt; {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  data?: T;
  type?: string;
  selected?: boolean;
  animated?: boolean;
}
```

## Advanced Features

### Custom Node Types

Create custom node components:

```tsx
import { INodeProps } from 'react-flow-diagrams-jp';

const CustomNode = ({ data, selected }: INodeProps) =&gt; {
  return (
    &lt;div
      style={{
        padding: '10px',
        border: selected ? '2px solid blue' : '1px solid gray',
        borderRadius: '4px',
        background: 'white',
      }}
    &gt;
      &lt;strong&gt;{data.title}&lt;/strong&gt;
      &lt;p&gt;{data.description}&lt;/p&gt;
    &lt;/div&gt;
  );
};

const nodeTypes: TNodeTypes = {
  custom: CustomNode,
};

&lt;FlowCanvas
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes}
/&gt;
```

### Handle Customization

Adjust handle positioning and appearance:

```tsx
const nodeWithCustomHandles: INode = {
  id: "custom-handles",
  position: { x: 100, y: 100 },
  data: { label: "Custom Handles" },
  handleOffset: 15, // Distance from node edge in pixels
};
```

## Development

### Prerequisites

- Node.js 16+
- npm, yarn, or pnpm

### Setup

```bash
git clone https://github.com/keiibo/react-flow-diagrams-jp.git
cd react-flow-diagrams-jp
npm install
```

### Development Commands

```bash
# Start development server
npm run dev

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Type checking
npm run typecheck

# Linting
npm run lint

# Build library
npm run build

# Preview build
npm run preview

# Start Storybook
npm run storybook
```

## Performance

React Flow Lite is optimized for performance:

- **Target**: Smooth performance with 100+ nodes
- **Rendering**: SVG + foreignObject with Canvas fallback
- **Animations**: 60fps+ smooth animations
- **Bundle Size**: Lightweight and tree-shakeable

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Migration from React Flow

React Flow Diagrams JP provides partial API compatibility with React Flow for core features. Most basic flows can be migrated by simply changing the import:

```tsx
// Before (React Flow)
import ReactFlow from "reactflow";

// After (React Flow Diagrams JP)
import { FlowCanvas } from "react-flow-diagrams-jp";
```

For advanced features, some adjustments may be needed. The main differences are:

- Interface names use `I` prefix (e.g., `INode`, `IEdge`)
- Type names use `T` prefix (e.g., `TNodeTypes`)
- Component name changed from `ReactFlow` to `FlowCanvas`

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

---

Built with ❤️ for the React community
