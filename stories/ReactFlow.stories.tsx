import type { Meta, StoryObj } from "@storybook/react";
import { FlowCanvas } from "../src";
import { INode, IEdge } from "../src/types";
import { useState } from "react";
import React from "react";

const meta: Meta<typeof FlowCanvas> = {
  title: "Components/FlowCanvas",
  component: FlowCanvas,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const initialNodes: INode[] = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "Node 1" },
  },
  {
    id: "2",
    position: { x: 300, y: 100 },
    data: { label: "Node 2" },
  },
  {
    id: "3",
    position: { x: 200, y: 250 },
    data: { label: "Node 3" },
  },
];

const initialEdges: IEdge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
  },
];

export const Default: Story = {
  args: {
    nodes: initialNodes,
    edges: initialEdges,
  },
};

export const Empty: Story = {
  args: {
    nodes: [],
    edges: [],
  },
};

export const SingleNode: Story = {
  args: {
    nodes: [
      {
        id: "single",
        position: { x: 200, y: 150 },
        data: { label: "I am alone" },
      },
    ],
    edges: [],
  },
};

export const ManyNodes: Story = {
  args: {
    nodes: Array.from({ length: 10 }, (_, i) => ({
      id: `node-${i}`,
      position: {
        x: (i % 4) * 150 + 50,
        y: Math.floor(i / 4) * 120 + 50,
      },
      data: { label: `Node ${i + 1}` },
    })),
    edges: Array.from({ length: 9 }, (_, i) => ({
      id: `edge-${i}`,
      source: `node-${i}`,
      target: `node-${i + 1}`,
    })),
  },
};

export const Interactive: StoryObj = {
  render: () => {
    const [nodes, setNodes] = useState<INode[]>([
      {
        id: "1",
        position: { x: 100, y: 100 },
        data: { label: "Drag me!" },
      },
      {
        id: "2",
        position: { x: 300, y: 100 },
        data: { label: "Click me!" },
        selected: false,
      },
      {
        id: "3",
        position: { x: 200, y: 250 },
        data: { label: "Connect us!" },
      },
    ]);

    const [edges, setEdges] = useState<IEdge[]>([
      {
        id: "e1-3",
        source: "1",
        target: "3",
      },
    ]);

    const handleNodesChange = (newNodes: INode[]) => {
      setNodes(newNodes);
    };

    const handleNodeClick = (event: React.MouseEvent, node: INode) => {
      console.log("Node clicked:", node.id);
      setNodes((prev) =>
        prev.map((n) =>
          n.id === node.id
            ? { ...n, selected: !n.selected }
            : { ...n, selected: false }
        )
      );
    };

    const handleEdgeClick = (event: React.MouseEvent, edge: IEdge) => {
      console.log("Edge clicked:", edge.id);
      setEdges((prev) =>
        prev.map((e) =>
          e.id === edge.id
            ? { ...e, selected: !e.selected }
            : { ...e, selected: false }
        )
      );
    };

    return (
      <FlowCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
      />
    );
  },
};

export const WithConnections: StoryObj = {
  render: () => {
    const [nodes, setNodes] = useState<INode[]>([
      {
        id: "1",
        position: { x: 100, y: 100 },
        data: { label: "Source Node" },
      },
      {
        id: "2",
        position: { x: 400, y: 100 },
        data: { label: "Target Node" },
      },
      {
        id: "3",
        position: { x: 250, y: 250 },
        data: { label: "Middle Node" },
      },
    ]);

    const [edges, setEdges] = useState<IEdge[]>([
      {
        id: "e1-2",
        source: "1",
        target: "2",
        data: { label: "connects to" },
      },
    ]);

    const handleNodesChange = (newNodes: INode[]) => {
      setNodes(newNodes);
    };

    const handleEdgesChange = (newEdges: IEdge[]) => {
      setEdges(newEdges);
    };

    const handleConnect = (connection: {
      source: string;
      target: string;
      sourceHandle?: string;
      targetHandle?: string;
    }) => {
      console.log("New connection:", connection);
      const newEdge = {
        id: `e${connection.source}-${connection.target}`,
        source: connection.source,
        target: connection.target,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
        data: { label: "new connection" },
      };
      setEdges((prev) => [...prev, newEdge]);
    };

    const handleNodeClick = (event: React.MouseEvent, node: INode) => {
      console.log("Node clicked:", node.id);
      setNodes((prev) =>
        prev.map((n) =>
          n.id === node.id
            ? { ...n, selected: !n.selected }
            : { ...n, selected: false }
        )
      );
    };

    const handleEdgeClick = (event: React.MouseEvent, edge: IEdge) => {
      console.log("Edge clicked:", edge.id);
      setEdges((prev) =>
        prev.map((e) =>
          e.id === edge.id
            ? { ...e, selected: !e.selected }
            : { ...e, selected: false }
        )
      );
    };

    return (
      <FlowCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        onNodeClick={handleNodeClick}
        onEdgeClick={handleEdgeClick}
      />
    );
  },
};

export const WithSelection: Story = {
  ...Default,
  args: {
    ...Default.args,
    onNodeClick: (event, node) => console.log("Node clicked:", node),
    onEdgeClick: (event, edge) => console.log("Edge clicked:", edge),
  },
};

export const WithShapes: Story = {
  args: {
    nodes: [
      {
        id: "rect",
        position: { x: 50, y: 50 },
        data: { label: "Rectangle" },
        shape: "rectangle" as const,
      },
      {
        id: "rounded",
        position: { x: 250, y: 50 },
        data: { label: "Rounded" },
        shape: "rounded" as const,
      },
      {
        id: "square",
        position: { x: 450, y: 50 },
        data: { label: "Square" },
        shape: "square" as const,
      },
      {
        id: "circle",
        position: { x: 150, y: 200 },
        data: { label: "Circle" },
        shape: "circle" as const,
      },
      {
        id: "default",
        position: { x: 350, y: 200 },
        data: { label: "Default" },
      },
    ],
    edges: [
      {
        id: "e1",
        source: "rect",
        target: "circle",
        sourceHandle: "bottom",
        targetHandle: "top",
      },
      {
        id: "e2",
        source: "rounded",
        target: "circle",
        sourceHandle: "bottom",
        targetHandle: "top",
      },
      {
        id: "e3",
        source: "square",
        target: "default",
        sourceHandle: "bottom",
        targetHandle: "top",
      },
      {
        id: "e4",
        source: "circle",
        target: "default",
        sourceHandle: "right",
        targetHandle: "left",
      },
    ],
  },
};

export const WithLabels: Story = {
  args: {
    nodes: [
      { id: "A", position: { x: 100, y: 100 }, data: { label: "ノードA" } },
      { id: "B", position: { x: 300, y: 100 }, data: { label: "ノードB" } },
      {
        id: "C",
        position: { x: 200, y: 250 },
        data: { label: "ノードC" },
        shape: "circle" as const,
      },
    ],
    edges: [
      {
        id: "e1",
        source: "A",
        target: "B",
        sourceHandle: "right",
        targetHandle: "left",
        data: { label: "関係1" },
      },
      {
        id: "e2",
        source: "A",
        target: "C",
        sourceHandle: "bottom",
        targetHandle: "top",
        data: { label: "関係2" },
      },
      {
        id: "e3",
        source: "B",
        target: "C",
        sourceHandle: "bottom",
        targetHandle: "top",
        data: { label: "ダブルクリックで編集" },
      },
    ],
    onEdgeLabelChange: (edgeId: string, newLabel: string) => {
      console.log(`Edge ${edgeId} label changed to: ${newLabel}`);
    },
  },
};

export const WithLongEdges: Story = {
  args: {
    nodes: [
      { id: "A", position: { x: 50, y: 100 }, data: { label: "ノードA" } },
      { id: "B", position: { x: 500, y: 100 }, data: { label: "ノードB" } },
      { id: "C", position: { x: 50, y: 300 }, data: { label: "ノードC" } },
      { id: "D", position: { x: 500, y: 300 }, data: { label: "ノードD" } },
      {
        id: "E",
        position: { x: 275, y: 500 },
        data: { label: "ノードE" },
        shape: "circle" as const,
      },
    ],
    edges: [
      {
        id: "e1",
        source: "A",
        target: "B",
        sourceHandle: "right",
        targetHandle: "left",
        data: { label: "水平の長いエッジ" },
      },
      {
        id: "e2",
        source: "A",
        target: "D",
        sourceHandle: "bottom",
        targetHandle: "top",
        data: { label: "対角線の長いエッジ" },
      },
      {
        id: "e3",
        source: "C",
        target: "E",
        sourceHandle: "bottom",
        targetHandle: "left",
        data: { label: "曲線エッジ" },
      },
      {
        id: "e4",
        source: "B",
        target: "E",
        sourceHandle: "bottom",
        targetHandle: "right",
        data: { label: "カーブエッジ" },
      },
    ],
    onEdgeLabelChange: (edgeId: string, newLabel: string) => {
      console.log(`Edge ${edgeId} label changed to: ${newLabel}`);
    },
  },
};

export const NavigationDemo: Story = {
  args: {
    nodes: [
      {
        id: "1",
        position: { x: 100, y: 100 },
        data: { label: "ホイール操作テスト" },
      },
      {
        id: "2",
        position: { x: 400, y: 100 },
        data: { label: "Cmd+ホイール: 拡大縮小" },
      },
      {
        id: "3",
        position: { x: 100, y: 300 },
        data: { label: "ホイール: 縦移動" },
      },
      {
        id: "4",
        position: { x: 400, y: 300 },
        data: { label: "Shift+ホイール: 横移動" },
      },
      {
        id: "5",
        position: { x: 700, y: 200 },
        data: { label: "背景ドラッグ: パン移動" },
        shape: "rounded" as const,
      },
      {
        id: "6",
        position: { x: 250, y: 500 },
        data: { label: "ノードドラッグ: ノード移動" },
        shape: "circle" as const,
      },
    ],
    edges: [
      { id: "e1", source: "1", target: "2", data: { label: "拡大縮小" } },
      { id: "e2", source: "1", target: "3", data: { label: "縦移動" } },
      { id: "e3", source: "2", target: "4", data: { label: "横移動" } },
      { id: "e4", source: "4", target: "5", data: { label: "背景ドラッグ" } },
      { id: "e5", source: "3", target: "6", data: { label: "ノードドラッグ" } },
    ],
  },
};

export const DragDemo: Story = {
  args: {
    nodes: [
      {
        id: "info",
        position: { x: 200, y: 50 },
        data: { label: "操作方法" },
        shape: "rounded" as const,
      },
      {
        id: "bg-drag",
        position: { x: 50, y: 150 },
        data: { label: "背景をドラッグ\n→ キャンバス移動" },
        shape: "rectangle" as const,
      },
      {
        id: "node-drag",
        position: { x: 350, y: 150 },
        data: { label: "ノードをドラッグ\n→ ノード移動" },
        shape: "square" as const,
      },
      {
        id: "handle-drag",
        position: { x: 200, y: 280 },
        data: { label: "ハンドルをドラッグ\n→ 接続作成" },
        shape: "circle" as const,
      },
    ],
    edges: [
      { id: "e1", source: "info", target: "bg-drag", data: { label: "背景" } },
      {
        id: "e2",
        source: "info",
        target: "node-drag",
        data: { label: "ノード" },
      },
      {
        id: "e3",
        source: "bg-drag",
        target: "handle-drag",
        data: { label: "試してください" },
      },
      {
        id: "e4",
        source: "node-drag",
        target: "handle-drag",
        data: { label: "全て可能" },
      },
    ],
  },
};

export const HandleOffsets: Story = {
  args: {
    nodes: [
      {
        id: "default",
        position: { x: 50, y: 100 },
        data: { label: "デフォルト (5px)" },
        shape: "rectangle" as const,
      },
      {
        id: "small",
        position: { x: 250, y: 100 },
        data: { label: "小さい (2px)" },
        shape: "rectangle" as const,
        handleOffset: 2,
      },
      {
        id: "large",
        position: { x: 450, y: 100 },
        data: { label: "大きい (15px)" },
        shape: "rectangle" as const,
        handleOffset: 15,
      },
      {
        id: "zero",
        position: { x: 150, y: 250 },
        data: { label: "ゼロ (0px)" },
        shape: "circle" as const,
        handleOffset: 0,
      },
      {
        id: "huge",
        position: { x: 350, y: 250 },
        data: { label: "非常に大きい (25px)" },
        shape: "rounded" as const,
        handleOffset: 25,
      },
    ],
    edges: [
      {
        id: "e1",
        source: "default",
        target: "small",
        data: { label: "デフォルト→小" },
      },
      { id: "e2", source: "small", target: "large", data: { label: "小→大" } },
      {
        id: "e3",
        source: "default",
        target: "zero",
        data: { label: "デフォルト→ゼロ" },
      },
      {
        id: "e4",
        source: "large",
        target: "huge",
        data: { label: "大→非常に大" },
      },
      {
        id: "e5",
        source: "zero",
        target: "huge",
        data: { label: "ゼロ→非常に大" },
      },
    ],
  },
};

export const InteractiveHandleOffsets: StoryObj = {
  argTypes: {
    handleOffset: {
      control: { type: "range", min: 0, max: 30, step: 1 },
      description: "ハンドルとノードの距離（px）",
    },
  },
  render: (args) => {
    const [nodes, setNodes] = useState<INode[]>([
      {
        id: "interactive1",
        position: { x: 150, y: 100 },
        data: { label: "インタラクティブ" },
        shape: "rectangle" as const,
      },
      {
        id: "interactive2",
        position: { x: 350, y: 100 },
        data: { label: "テストノード" },
        shape: "circle" as const,
      },
      {
        id: "interactive3",
        position: { x: 250, y: 250 },
        data: { label: "調整可能" },
        shape: "rounded" as const,
      },
    ]);

    const [edges] = useState<IEdge[]>([
      {
        id: "ie1",
        source: "interactive1",
        target: "interactive2",
        data: { label: "コントロールでハンドル距離を調整" },
      },
      {
        id: "ie2",
        source: "interactive2",
        target: "interactive3",
        data: { label: "全ノードに適用" },
      },
    ]);

    // Update nodes when handleOffset changes
    React.useEffect(() => {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
        }))
      );
    }, [args]);

    const handleNodesChange = (newNodes: INode[]) => {
      setNodes(newNodes);
    };

    return (
      <div>
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 1000,
            background: "white",
            padding: "10px",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            fontSize: "14px",
          }}
        >
          <br />
          <span style={{ color: "#666" }}>
            右側のコントロールパネルでハンドル距離を調整してください
          </span>
        </div>
        <FlowCanvas
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
        />
      </div>
    );
  },
  args: {
    handleOffset: 5,
  },
};
