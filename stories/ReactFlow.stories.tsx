import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  FlowCanvas,
  darkTheme,
  blueTheme,
  greenTheme,
  purpleTheme,
  lightTheme,
} from "../src";
import { INode, IEdge } from "../src/types";

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

// テーマストーリー

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    theme: darkTheme,
  },
};

export const BlueTheme: Story = {
  args: {
    ...Default.args,
    theme: blueTheme,
  },
};

export const GreenTheme: Story = {
  args: {
    ...Default.args,
    theme: greenTheme,
  },
};

export const PurpleTheme: Story = {
  args: {
    ...Default.args,
    theme: purpleTheme,
  },
};

export const CustomTheme: Story = {
  args: {
    ...Default.args,
    theme: {
      name: "custom",
      colors: {
        primary: "#ff6b6b",
        background: "#2c3e50",
        surface: "#34495e",
        border: "#7f8c8d",
        text: {
          primary: "#ecf0f1",
          secondary: "#bdc3c7",
        },
        state: {
          selected: "#e74c3c",
          hover: "#c0392b",
        },
        handle: {
          default: "#e67e22",
        },
        grid: {
          line: "#34495e",
        },
      },
    },
  },
};

export const ThemeComparison: StoryObj = {
  render: () => {
    const nodes: INode[] = [
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
    ];

    const edges: IEdge[] = [
      {
        id: "e1-2",
        source: "1",
        target: "2",
        data: { label: "connection" },
      },
    ];

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          height: "100vh",
        }}
      >
        <div>
          <h3 style={{ margin: "10px", textAlign: "center", color: "#333" }}>
            Light Theme
          </h3>
          <div
            style={{ height: "calc(50vh - 40px)", border: "1px solid #ccc" }}
          >
            <FlowCanvas nodes={nodes} edges={edges} />
          </div>
        </div>
        <div>
          <h3 style={{ margin: "10px", textAlign: "center", color: "#333" }}>
            Dark Theme
          </h3>
          <div
            style={{ height: "calc(50vh - 40px)", border: "1px solid #ccc" }}
          >
            <FlowCanvas nodes={nodes} edges={edges} theme={darkTheme} />
          </div>
        </div>
        <div>
          <h3 style={{ margin: "10px", textAlign: "center", color: "#333" }}>
            Blue Theme
          </h3>
          <div
            style={{ height: "calc(50vh - 40px)", border: "1px solid #ccc" }}
          >
            <FlowCanvas nodes={nodes} edges={edges} theme={blueTheme} />
          </div>
        </div>
        <div>
          <h3 style={{ margin: "10px", textAlign: "center", color: "#333" }}>
            Green Theme
          </h3>
          <div
            style={{ height: "calc(50vh - 40px)", border: "1px solid #ccc" }}
          >
            <FlowCanvas nodes={nodes} edges={edges} theme={greenTheme} />
          </div>
        </div>
      </div>
    );
  },
};

interface CustomizableThemeArgs {
  primaryColor: string;
  backgroundColor: string;
  surfaceColor: string;
  borderColor: string;
  textPrimaryColor: string;
  textSecondaryColor: string;
  nodeSpacing: number;
  borderRadius: number;
  fontSize: string;
  fontFamily: string;
  nodeWidth: number;
  nodeHeight: number;
  handleSize: number;
  handleOffset: number;
  edgeStrokeWidth: number;
}

export const CustomizableTheme: StoryObj<CustomizableThemeArgs> = {
  argTypes: {
    // 基本カラー
    primaryColor: {
      control: { type: "color" },
      description: "プライマリカラー（選択状態など）",
    },
    backgroundColor: {
      control: { type: "color" },
      description: "キャンバス背景色",
    },
    surfaceColor: {
      control: { type: "color" },
      description: "ノード背景色",
    },
    borderColor: {
      control: { type: "color" },
      description: "ボーダー色",
    },
    textPrimaryColor: {
      control: { type: "color" },
      description: "メインテキスト色",
    },
    textSecondaryColor: {
      control: { type: "color" },
      description: "サブテキスト色",
    },

    // スペーシング
    nodeSpacing: {
      control: { type: "range", min: 4, max: 24, step: 2 },
      description: "ノード内パディング",
      defaultValue: 10,
    },

    // ボーダー半径
    borderRadius: {
      control: { type: "range", min: 0, max: 20, step: 2 },
      description: "ボーダー半径",
      defaultValue: 4,
    },

    // フォント設定
    fontSize: {
      control: { type: "select" },
      options: ["12px", "14px", "16px", "18px"],
      description: "フォントサイズ",
      defaultValue: "14px",
    },
    fontFamily: {
      control: { type: "select" },
      options: [
        "system-ui, sans-serif",
        "Inter, sans-serif",
        "Roboto, sans-serif",
        "Arial, sans-serif",
        "Georgia, serif",
        "monospace",
      ],
      description: "フォントファミリー",
      defaultValue: "system-ui, sans-serif",
    },

    // ノード設定
    nodeWidth: {
      control: { type: "range", min: 80, max: 200, step: 10 },
      description: "デフォルトノード幅",
      defaultValue: 140,
    },
    nodeHeight: {
      control: { type: "range", min: 40, max: 120, step: 10 },
      description: "デフォルトノード高さ",
      defaultValue: 70,
    },

    // ハンドル設定
    handleSize: {
      control: { type: "range", min: 4, max: 16, step: 1 },
      description: "ハンドルサイズ",
      defaultValue: 8,
    },
    handleOffset: {
      control: { type: "range", min: 0, max: 20, step: 1 },
      description: "ハンドルオフセット",
      defaultValue: 5,
    },

    // エッジ設定
    edgeStrokeWidth: {
      control: { type: "range", min: 1, max: 6, step: 1 },
      description: "エッジの太さ",
      defaultValue: 2,
    },
  },

  render: (args: CustomizableThemeArgs) => {
    const customTheme: any = {
      name: "customizable",
      colors: {
        primary: args.primaryColor,
        secondary: "#6c757d",
        background: args.backgroundColor,
        surface: args.surfaceColor,
        border: args.borderColor,
        borderHover: args.primaryColor,
        text: {
          primary: args.textPrimaryColor,
          secondary: args.textSecondaryColor,
          disabled: "#adb5bd",
        },
        state: {
          selected: args.primaryColor,
          hover: args.primaryColor,
          dragging: args.primaryColor,
          connecting: args.primaryColor,
          error: "#dc3545",
          success: "#28a745",
        },
        edge: {
          default: args.borderColor,
          selected: args.primaryColor,
          hover: args.primaryColor,
          animated: args.primaryColor,
        },
        handle: {
          default: args.primaryColor,
          connectable: "#28a745",
          connecting: args.primaryColor,
        },
        grid: {
          line: args.borderColor,
          dot: args.borderColor,
        },
      },
      spacing: {
        xs: 2,
        sm: args.nodeSpacing / 2,
        md: args.nodeSpacing,
        lg: args.nodeSpacing * 2,
        xl: args.nodeSpacing * 3,
        xxl: args.nodeSpacing * 4,
      },
      borderRadius: {
        none: 0,
        sm: args.borderRadius,
        md: args.borderRadius * 2,
        lg: args.borderRadius * 3,
        xl: args.borderRadius * 4,
        full: "50%",
      },
      shadows: {
        none: "none",
        sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
        md: "0 2px 4px rgba(0, 0, 0, 0.1)",
        lg: "0 4px 8px rgba(0, 0, 0, 0.15)",
        xl: "0 8px 16px rgba(0, 0, 0, 0.2)",
      },
      typography: {
        fontFamily: args.fontFamily,
        fontSize: {
          xs: `${parseInt(args.fontSize) - 4}px`,
          sm: `${parseInt(args.fontSize) - 2}px`,
          md: args.fontSize,
          lg: `${parseInt(args.fontSize) + 2}px`,
          xl: `${parseInt(args.fontSize) + 4}px`,
        },
        fontWeight: {
          normal: 400,
          medium: 500,
          bold: 700,
        },
        lineHeight: {
          tight: 1.2,
          normal: 1.4,
          relaxed: 1.6,
        },
      },
      node: {
        defaultSize: {
          width: args.nodeWidth,
          height: args.nodeHeight,
        },
        minSize: {
          width: 60,
          height: 40,
        },
        padding: args.nodeSpacing,
        handleOffset: args.handleOffset,
        handleSize: args.handleSize,
      },
      edge: {
        strokeWidth: args.edgeStrokeWidth,
        strokeWidthSelected: args.edgeStrokeWidth + 1,
        animationDuration: 2000,
        labelPadding: 4,
      },
      controls: {
        buttonSize: 32,
        iconSize: 16,
        position: {
          bottom: 20,
          right: 20,
        },
      },
    };

    const [nodes, setNodes] = useState<INode[]>([
      {
        id: "theme1",
        position: { x: 100, y: 100 },
        data: { label: "カスタマイズ可能テーマ" },
        shape: "rectangle" as const,
      },
      {
        id: "theme2",
        position: { x: 350, y: 100 },
        data: { label: "リアルタイム反映" },
        shape: "rounded" as const,
        selected: true,
      },
      {
        id: "theme3",
        position: { x: 600, y: 100 },
        data: { label: "完全制御" },
        shape: "circle" as const,
      },
      {
        id: "theme4",
        position: { x: 100, y: 250 },
        data: { label: "デザイン自由" },
        shape: "square" as const,
      },
      {
        id: "theme5",
        position: { x: 350, y: 250 },
        data: { label: "プロジェクト統合" },
        shape: "rounded" as const,
      },
      {
        id: "theme6",
        position: { x: 600, y: 250 },
        data: { label: "美しいUI" },
        shape: "circle" as const,
      },
      {
        id: "theme7",
        position: { x: 225, y: 400 },
        data: { label: "統一感のあるデザイン" },
        shape: "rectangle" as const,
      },
      {
        id: "theme8",
        position: { x: 475, y: 400 },
        data: { label: "ユーザー体験向上" },
        shape: "rounded" as const,
      },
    ]);

    const [edges, setEdges] = useState<IEdge[]>([
      {
        id: "te1",
        source: "theme1",
        target: "theme2",
        data: { label: "テーマ設定" },
      },
      {
        id: "te2",
        source: "theme2",
        target: "theme3",
        data: { label: "カラー調整" },
      },
      {
        id: "te3",
        source: "theme1",
        target: "theme4",
        data: { label: "サイズ変更" },
      },
      {
        id: "te4",
        source: "theme4",
        target: "theme5",
        data: { label: "フォント設定" },
      },
      {
        id: "te5",
        source: "theme5",
        target: "theme6",
        data: { label: "スタイル統合" },
      },
      {
        id: "te6",
        source: "theme3",
        target: "theme6",
        data: { label: "視覚的一貫性" },
      },
      {
        id: "te7",
        source: "theme4",
        target: "theme7",
        data: { label: "レイアウト最適化" },
      },
      {
        id: "te8",
        source: "theme5",
        target: "theme7",
        data: { label: "デザインシステム" },
      },
      {
        id: "te9",
        source: "theme6",
        target: "theme8",
        data: { label: "UX向上" },
      },
      {
        id: "te10",
        source: "theme7",
        target: "theme8",
        data: { label: "最終目標" },
      },
    ]);

    return (
      <FlowCanvas
        nodes={nodes}
        edges={edges}
        theme={customTheme}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
        onNodeClick={(event: React.MouseEvent, node: INode) => {
          console.log("Node clicked:", node.id);
        }}
        onEdgeClick={(event: React.MouseEvent, edge: IEdge) => {
          console.log("Edge clicked:", edge.id);
        }}
      />
    );
  },

  args: {
    primaryColor: "#007bff",
    backgroundColor: "#f8f9fa",
    surfaceColor: "#ffffff",
    borderColor: "#dee2e6",
    textPrimaryColor: "#212529",
    textSecondaryColor: "#6c757d",
    nodeSpacing: 10,
    borderRadius: 4,
    fontSize: "14px",
    fontFamily: "system-ui, sans-serif",
    nodeWidth: 140,
    nodeHeight: 70,
    handleSize: 8,
    handleOffset: 5,
    edgeStrokeWidth: 2,
  },
};
