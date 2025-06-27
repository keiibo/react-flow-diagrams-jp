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

### 基本的な使用方法

```tsx
import React, { useState } from 'react';
import { ReactFlow, Node, Edge } from 'react-flow-diagrams-jp';

const initialNodes: Node[] = [
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

const initialEdges: Edge[] = [
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
      &lt;ReactFlow
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

### プログラム制御の例

```tsx
import React, { useState, useCallback } from 'react';
import { ReactFlow, Node, Edge, useReactFlow } from 'react-flow-diagrams-jp';

function FlowWithControls() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const reactFlow = useReactFlow();

  const handleZoomIn = () => reactFlow.zoomIn();
  const handleZoomOut = () => reactFlow.zoomOut();
  const handleFitView = () => reactFlow.fitView();
  const handleResetZoom = () => reactFlow.resetZoom();

  // 特定のノードにズーム
  const handleFocusNode = () => {
    reactFlow.zoomToNode('1', nodes, 1.5);
  };

  // 複数ノードにフィット
  const handleFitToNodes = () => {
    reactFlow.fitToNodes(['1', '2'], nodes, 100);
  };

  return (
    &lt;div style={{ width: '100vw', height: '100vh', position: 'relative' }}&gt;
      {/* カスタムコントロール */}
      &lt;div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1000,
        display: 'flex',
        gap: '8px',
        flexDirection: 'column'
      }}&gt;
        &lt;button onClick={handleZoomIn}&gt;+ Zoom In&lt;/button&gt;
        &lt;button onClick={handleZoomOut}&gt;- Zoom Out&lt;/button&gt;
        &lt;button onClick={handleFitView}&gt;Fit View&lt;/button&gt;
        &lt;button onClick={handleResetZoom}&gt;Reset Zoom&lt;/button&gt;
        &lt;button onClick={handleFocusNode}&gt;Focus Node 1&lt;/button&gt;
        &lt;button onClick={handleFitToNodes}&gt;Fit to Nodes&lt;/button&gt;
      &lt;/div&gt;

      &lt;ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
        onConnect={(connection) =&gt; {
          const newEdge: Edge = {
            id: `e${connection.source}-${connection.target}`,
            source: connection.source,
            target: connection.target,
          };
          setEdges(prev =&gt; [...prev, newEdge]);
        }}
      /&gt;
    &lt;/div&gt;
  );
}
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

## TypeScript Support

React Flow Diagrams JP is built with TypeScript and provides comprehensive type definitions with JSDoc comments for excellent IDE support.

### Core Types

#### INode<T>

```tsx
interface INode<T = Record<string, unknown>> {
  id: string; // ノードの一意識別子
  position: IPosition; // ノードの位置座標
  data: T; // ノードに関連付けられたデータ
  type?: string; // カスタムノードのタイプ名
  selected?: boolean; // ノードが選択されているかどうか
  // ... その他のプロパティ
}
```

#### IEdge<T>

```tsx
interface IEdge<T = Record<string, unknown>> {
  id: string; // エッジの一意識別子
  source: string; // 接続元ノードのID
  target: string; // 接続先ノードのID
  sourceHandle?: string; // 接続元ハンドルのID
  targetHandle?: string; // 接続先ハンドルのID
  data?: T; // エッジに関連付けられたデータ
  // ... その他のプロパティ
}
```

#### INodeProps<T>

```tsx
interface INodeProps<T = Record<string, unknown>> {
  id: string; // ノードの一意識別子
  data: T; // ノードに関連付けられたデータ
  position: IPosition; // ノードの位置座標
  isConnectable?: boolean; // ハンドルを表示して接続を許可するかどうか
  isDraggable?: boolean; // ドラッグ操作を許可するかどうか
  // ... その他のプロパティ
}
```

## API Reference

### ReactFlow Component Props

| Prop                | Type                                      | Description                         |
| ------------------- | ----------------------------------------- | ----------------------------------- |
| `nodes`             | `Node[]`                                  | Array of nodes to display           |
| `edges`             | `Edge[]`                                  | Array of edges to display           |
| `onNodesChange`     | `(nodes: Node[]) => void`                 | Callback when nodes change          |
| `onEdgesChange`     | `(edges: Edge[]) => void`                 | Callback when edges change          |
| `onConnect`         | `(connection: Connection) => void`        | Callback when nodes are connected   |
| `onNodeClick`       | `(event: MouseEvent, node: Node) => void` | Callback when a node is clicked     |
| `onEdgeClick`       | `(event: MouseEvent, edge: Edge) => void` | Callback when an edge is clicked    |
| `onPaneClick`       | `(event: MouseEvent) => void`             | Callback when background is clicked |
| `onEdgeLabelChange` | `(edgeId: string, label: string) => void` | Callback when edge label changes    |
| `nodeTypes`         | `NodeTypes`                               | Custom node component types         |

### useReactFlow Hook

統合的なフロー操作を提供するメインフック：

```tsx
const reactFlow = useReactFlow();
```

#### 戻り値

| Method                 | Type                                                           | Description                      |
| ---------------------- | -------------------------------------------------------------- | -------------------------------- |
| `viewport`             | `IViewport`                                                    | 現在のビューポート状態           |
| `zoomIn`               | `() => void`                                                   | ズームイン                       |
| `zoomOut`              | `() => void`                                                   | ズームアウト                     |
| `resetZoom`            | `() => void`                                                   | ズームを 1.0 にリセット          |
| `fitView`              | `() => void`                                                   | 全体が見えるようにフィット       |
| `zoomToNode`           | `(nodeId: string, nodes: Node[], zoom?: number) => void`       | 指定ノードにズーム               |
| `fitToNodes`           | `(nodeIds: string[], nodes: Node[], padding?: number) => void` | 複数ノードにフィット             |
| `panTo`                | `(position: Position) => void`                                 | 指定位置にパン                   |
| `screenToFlowPosition` | `(screenPos: Position) => Position`                            | スクリーン座標をフロー座標に変換 |
| `flowToScreenPosition` | `(flowPos: Position) => Position`                              | フロー座標をスクリーン座標に変換 |
| `getViewport`          | `() => IViewport`                                              | 現在のビューポート情報を取得     |
| `isReady`              | `boolean`                                                      | フロー図が初期化済みかどうか     |

### Core Interfaces

#### Node Interface

```tsx
interface Node&lt;T = Record&lt;string, unknown&gt;&gt; {
  id: string;                    // ノードの一意識別子
  position: Position;            // ノードの位置座標
  data: T;                      // ノードに関連付けられたデータ
  type?: string;                // カスタムノードのタイプ名
  selected?: boolean;           // ノードが選択されているかどうか
  dragging?: boolean;           // ノードがドラッグ中かどうか
  width?: number;               // ノードの幅（ピクセル）
  height?: number;              // ノードの高さ（ピクセル）
  shape?: "rectangle" | "square" | "circle" | "rounded";
  handleOffset?: number;        // ハンドルのオフセット距離
  draggable?: boolean;          // ドラッグ可能かどうか
  selectable?: boolean;         // 選択可能かどうか
  connectable?: boolean;        // 接続可能かどうか
  deletable?: boolean;          // 削除可能かどうか
}
```

#### Edge Interface

```tsx
interface Edge&lt;T = Record&lt;string, unknown&gt;&gt; {
  id: string;                   // エッジの一意識別子
  source: string;               // 接続元ノードのID
  target: string;               // 接続先ノードのID
  sourceHandle?: string;        // 接続元ハンドルのID
  targetHandle?: string;        // 接続先ハンドルのID
  data?: T;                    // エッジに関連付けられたデータ
  type?: string;               // カスタムエッジのタイプ名
  selected?: boolean;          // エッジが選択されているかどうか
  animated?: boolean;          // エッジがアニメーション表示されるかどうか
}
```

#### Position Interface

```tsx
interface Position {
  x: number; // X座標
  y: number; // Y座標
}
```

## Advanced Examples

### 複雑なフロー図の作成

```tsx
import React, { useState, useCallback } from 'react';
import { ReactFlow, Node, Edge, useReactFlow, NodeProps, Handle } from 'react-flow-diagrams-jp';

// プロセスノードの型定義
interface ProcessNodeData {
  title: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  description?: string;
}

// カスタムプロセスノード
const ProcessNode = ({ data, selected }: NodeProps&lt;ProcessNodeData&gt;) =&gt; {
  const statusColors = {
    pending: '#ffc107',
    running: '#007bff',
    completed: '#28a745',
    error: '#dc3545'
  };

  return (
    &lt;div style={{
      padding: '16px',
      border: `2px solid ${statusColors[data.status]}`,
      borderRadius: '12px',
      background: 'white',
      boxShadow: selected ? '0 0 15px rgba(0,123,255,0.4)' : '0 4px 8px rgba(0,0,0,0.1)',
      minWidth: '180px',
      position: 'relative'
    }}&gt;
      &lt;Handle id="input" type="target" position="left" /&gt;
      &lt;Handle id="output" type="source" position="right" /&gt;

      &lt;div style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        background: statusColors[data.status]
      }} /&gt;

      &lt;h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}&gt;{data.title}&lt;/h4&gt;
      {data.description && (
        &lt;p style={{ margin: 0, fontSize: '14px', color: '#666' }}&gt;{data.description}&lt;/p&gt;
      )}
    &lt;/div&gt;
  );
};

function ProcessFlowApp() {
  const [nodes, setNodes] = useState&lt;Node&lt;ProcessNodeData&gt;[]&gt;([
    {
      id: '1',
      type: 'process',
      position: { x: 100, y: 100 },
      data: { title: 'データ取得', status: 'completed', description: 'APIからデータを取得' }
    },
    {
      id: '2',
      type: 'process',
      position: { x: 350, y: 100 },
      data: { title: 'データ処理', status: 'running', description: 'データの変換・加工' }
    },
    {
      id: '3',
      type: 'process',
      position: { x: 600, y: 100 },
      data: { title: 'レポート生成', status: 'pending', description: 'PDF レポートの作成' }
    }
  ]);

  const [edges, setEdges] = useState&lt;Edge[]&gt;([
    { id: 'e1-2', source: '1', target: '2', sourceHandle: 'output', targetHandle: 'input' },
    { id: 'e2-3', source: '2', target: '3', sourceHandle: 'output', targetHandle: 'input' }
  ]);

  const nodeTypes = { process: ProcessNode };
  const reactFlow = useReactFlow();

  const updateNodeStatus = useCallback((nodeId: string, status: ProcessNodeData['status']) =&gt; {
    setNodes(prev =&gt; prev.map(node =&gt;
      node.id === nodeId
        ? { ...node, data: { ...node.data, status } }
        : node
    ));
  }, []);

  return (
    &lt;div style={{ width: '100vw', height: '100vh', position: 'relative' }}&gt;
      &lt;div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}&gt;
        &lt;button onClick={() =&gt; updateNodeStatus('2', 'completed')}&gt;
          完了: データ処理
        &lt;/button&gt;
        &lt;button onClick={() =&gt; updateNodeStatus('3', 'running')}&gt;
          開始: レポート生成
        &lt;/button&gt;
        &lt;button onClick={() =&gt; reactFlow.fitView()}&gt;全体表示&lt;/button&gt;
      &lt;/div&gt;

      &lt;ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
      /&gt;
    &lt;/div&gt;
  );
}
```

### 座標変換とマウス操作

```tsx
function InteractiveFlow() {
  const [nodes, setNodes] = useState&lt;Node[]&gt;(initialNodes);
  const [mousePosition, setMousePosition] = useState&lt;{ screen: Position; flow: Position }&gt;();
  const reactFlow = useReactFlow();

  const handleMouseMove = useCallback((event: React.MouseEvent) =&gt; {
    const screenPos = { x: event.clientX, y: event.clientY };
    const flowPos = reactFlow.screenToFlowPosition(screenPos);
    setMousePosition({ screen: screenPos, flow: flowPos });
  }, [reactFlow]);

  const handlePaneDoubleClick = useCallback((event: React.MouseEvent) =&gt; {
    const position = reactFlow.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY
    });

    const newNode: Node = {
      id: `node-${Date.now()}`,
      position,
      data: { label: '新しいノード' }
    };

    setNodes(prev =&gt; [...prev, newNode]);
  }, [reactFlow]);

  return (
    &lt;div style={{ width: '100vw', height: '100vh', position: 'relative' }}&gt;
      {mousePosition && (
        &lt;div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000, background: 'white', padding: '8px', borderRadius: '4px' }}&gt;
          Screen: ({mousePosition.screen.x.toFixed(0)}, {mousePosition.screen.y.toFixed(0)}) &lt;br/&gt;
          Flow: ({mousePosition.flow.x.toFixed(0)}, {mousePosition.flow.y.toFixed(0)})
        &lt;/div&gt;
      )}

      &lt;ReactFlow
        nodes={nodes}
        onNodesChange={setNodes}
        onPaneDoubleClick={handlePaneDoubleClick}
        onMouseMove={handleMouseMove}
      /&gt;
    &lt;/div&gt;
  );
}
```

## Advanced Features

### Custom Node Types

カスタムノードコンポーネントの作成：

```tsx
import { NodeProps, Handle } from 'react-flow-diagrams-jp';

// カスタムノードの型定義
interface CustomNodeData {
  title: string;
  description: string;
  color?: string;
}

const CustomNode = ({ data, selected }: NodeProps&lt;CustomNodeData&gt;) =&gt; {
  return (
    &lt;div
      style={{
        padding: '12px',
        border: selected ? '2px solid #007bff' : '1px solid #dee2e6',
        borderRadius: '8px',
        background: data.color || 'white',
        boxShadow: selected ? '0 0 10px rgba(0,123,255,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
        minWidth: '200px',
      }}
    &gt;
      {/* 接続ハンドル */}
      &lt;Handle id="top" type="source" position="top" /&gt;
      &lt;Handle id="bottom" type="target" position="bottom" /&gt;

      &lt;div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}&gt;
        {data.title}
      &lt;/div&gt;
      &lt;div style={{ fontSize: '14px', color: '#6c757d' }}&gt;
        {data.description}
      &lt;/div&gt;
    &lt;/div&gt;
  );
};

// ノードタイプの定義
const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

// 使用例
const nodes: Node&lt;CustomNodeData&gt;[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 100, y: 100 },
    data: {
      title: 'カスタムノード',
      description: 'これは独自デザインのノードです',
      color: '#f8f9fa'
    }
  }
];

&lt;ReactFlow
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
