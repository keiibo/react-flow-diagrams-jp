// メインコンポーネント
export { default as ReactFlow } from "./components/FlowCanvas";
export { default as FlowCanvas } from "./components/FlowCanvas"; // 後方互換性

// 拡張可能なコンポーネント（カスタムノード作成用）
export { default as Handle } from "./components/Handle";
export { default as Controls } from "./components/Controls";
export { default as BezierEdge } from "./components/BezierEdge";

// 基本ノードコンポーネント（カスタムノード作成の参考用）
export { default as DefaultNode } from "./components/DefaultNode";
export { ImageNode } from "./components/nodeTypes/ImageNode";

// 型定義
export type {
  // 利用者が直接使用する型
  INode as Node,
  IEdge as Edge,
  IPosition as Position,
  INodeProps as NodeProps,
  IFlowProps as ReactFlowProps,
  IFlowProps as FlowCanvasProps,
  TNodeTypes as NodeTypes,

  // 元の型名（後方互換性）
  INode,
  IEdge,
  IPosition,
  INodeProps,
  IFlowProps,
  TNodeTypes,
  IHandle,
  IViewport,
  IDimensions,
  IImageNodeData,
} from "./types";

// フック（メインフック推奨）
export { useReactFlow } from "./hooks/useReactFlow";
export { useViewport } from "./hooks/useViewport";

// ユーティリティ
export * from "./utils";

// テーマシステム
export type {
  IFlowTheme,
  IFlowThemePartial,
  IFlowColors,
  IFlowSpacing,
  IFlowBorderRadius,
  IFlowShadows,
  IFlowTypography,
  IFlowNodeConfig,
  IFlowEdgeConfig,
  IFlowControlsConfig,
} from "./types/theme";

export {
  ThemeProvider,
  useFlowTheme,
  useFlowThemeSafe,
} from "./contexts/ThemeContext";

export {
  lightTheme,
  darkTheme,
  blueTheme,
  greenTheme,
  purpleTheme,
  themes,
  defaultTheme,
  type ThemeName,
} from "./themes";
