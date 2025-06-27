/**
 * 2D座標位置を表すインターフェース
 */
export interface IPosition {
  /** X座標 */
  x: number;
  /** Y座標 */
  y: number;
}

/**
 * 要素の幅と高さを表すインターフェース
 */
export interface IDimensions {
  /** 幅（ピクセル） */
  width: number;
  /** 高さ（ピクセル） */
  height: number;
}

/**
 * ビューポートの状態を表すインターフェース
 */
export interface IViewport {
  /** ビューポートのX座標オフセット */
  x: number;
  /** ビューポートのY座標オフセット */
  y: number;
  /** ズーム倍率 */
  zoom: number;
}

/**
 * フロー図のノードを表すインターフェース
 * @template T ノードが保持するデータの型
 */
export interface INode<T = Record<string, unknown>> {
  /** ノードの一意識別子 */
  id: string;
  /** ノードの位置座標 */
  position: IPosition;
  /** ノードに関連付けられたデータ */
  data: T;
  /** カスタムノードのタイプ名 */
  type?: string;
  /** ノードが選択されているかどうか */
  selected?: boolean;
  /** ノードがドラッグ中かどうか */
  dragging?: boolean;
  /** ノードの幅（ピクセル） */
  width?: number;
  /** ノードの高さ（ピクセル） */
  height?: number;
  /** ノードの形状 */
  shape?: "rectangle" | "square" | "circle" | "rounded";
  /** ハンドルのオフセット距離（ピクセル） */
  handleOffset?: number;
  /** ドラッグ可能かどうか */
  draggable?: boolean;
  /** 選択可能かどうか */
  selectable?: boolean;
  /** 接続可能かどうか */
  connectable?: boolean;
  /** 削除可能かどうか */
  deletable?: boolean;
}

/**
 * ノード間の接続（エッジ）を表すインターフェース
 * @template T エッジが保持するデータの型
 */
export interface IEdge<T = Record<string, unknown>> {
  /** エッジの一意識別子 */
  id: string;
  /** 接続元ノードのID */
  source: string;
  /** 接続先ノードのID */
  target: string;
  /** 接続元ハンドルのID */
  sourceHandle?: string;
  /** 接続先ハンドルのID */
  targetHandle?: string;
  /** エッジに関連付けられたデータ */
  data?: T;
  /** カスタムエッジのタイプ名 */
  type?: string;
  /** エッジが選択されているかどうか */
  selected?: boolean;
  /** エッジがアニメーション表示されるかどうか */
  animated?: boolean;
}

/**
 * ノードの接続ハンドルを表すインターフェース
 */
export interface IHandle {
  /** ハンドルの一意識別子 */
  id: string;
  /** ハンドルのタイプ（接続元または接続先） */
  type: "source" | "target";
  /** ハンドルの位置 */
  position: "top" | "right" | "bottom" | "left";
  /** ハンドルのカスタムスタイル */
  style?: React.CSSProperties;
  /** ノード境界からのオフセット距離（ピクセル） */
  offset?: number;
}

/**
 * フロー図全体の状態を表すインターフェース
 */
export interface IFlowState {
  /** フロー図内の全ノード */
  nodes: INode[];
  /** フロー図内の全エッジ */
  edges: IEdge[];
  /** 現在のビューポート状態 */
  viewport: IViewport;
  /** 選択されているノードのIDリスト */
  selectedNodes: string[];
  /** 選択されているエッジのIDリスト */
  selectedEdges: string[];
  /** 接続操作の状態 */
  connectionState: {
    /** 接続操作中かどうか */
    isConnecting: boolean;
    /** 接続元ノードのID */
    fromNode?: string;
    /** 接続元ハンドルのID */
    fromHandle?: string;
  };
}

/**
 * カスタムノードコンポーネントのプロパティ
 * @template T ノードが保持するデータの型
 */
export interface INodeProps<T = Record<string, unknown>> {
  /** ノードの一意識別子 */
  id: string;
  /** ノードに関連付けられたデータ */
  data: T;
  /** ノードが選択されているかどうか */
  selected?: boolean;
  /** ノードがドラッグ中かどうか */
  dragging?: boolean;
  /** ノードのタイプ名 */
  type?: string;
  /** ノードの位置座標 */
  position: IPosition;
  /** ノードの幅（ピクセル） */
  width?: number;
  /** ノードの高さ（ピクセル） */
  height?: number;
  /** ノードの形状 */
  shape?: "rectangle" | "square" | "circle" | "rounded";
  /** ハンドルのオフセット距離（ピクセル） */
  handleOffset?: number;
  /** ハンドルを表示して接続を許可するかどうか */
  isConnectable?: boolean;
  /** ドラッグ操作を許可するかどうか */
  isDraggable?: boolean;
  /** 選択操作を許可するかどうか */
  isSelectable?: boolean;
  /** 接続開始時のコールバック関数 */
  onConnectionStart?: (
    nodeId: string,
    handleId: string,
    position: IPosition
  ) => void;
  /** 接続終了時のコールバック関数 */
  onConnectionEnd?: (nodeId: string, handleId: string) => void;
}

/**
 * カスタムノードタイプのマッピング
 * キーはノードタイプ名、値はそのタイプに対応するReactコンポーネント
 */
export type TNodeTypes = Record<string, React.ComponentType<INodeProps>>;

/**
 * FlowCanvasコンポーネントのプロパティ
 */
export interface IFlowProps {
  /** 表示するノードの配列 */
  nodes: INode[];
  /** 表示するエッジの配列 */
  edges: IEdge[];
  /** ノードが変更された時のコールバック関数 */
  onNodesChange?: (nodes: INode[]) => void;
  /** エッジが変更された時のコールバック関数 */
  onEdgesChange?: (edges: IEdge[]) => void;
  /** 新しい接続が作成された時のコールバック関数 */
  onConnect?: (connection: {
    /** 接続元ノードのID */
    source: string;
    /** 接続先ノードのID */
    target: string;
    /** 接続元ハンドルのID */
    sourceHandle?: string;
    /** 接続先ハンドルのID */
    targetHandle?: string;
  }) => void;
  /** ノードがクリックされた時のコールバック関数 */
  onNodeClick?: (event: React.MouseEvent, node: INode) => void;
  /** エッジがクリックされた時のコールバック関数 */
  onEdgeClick?: (event: React.MouseEvent, edge: IEdge) => void;
  /** 背景がクリックされた時のコールバック関数 */
  onPaneClick?: (event: React.MouseEvent) => void;
  /** エッジのラベルが変更された時のコールバック関数 */
  onEdgeLabelChange?: (edgeId: string, newLabel: string) => void;
  /** カスタムノードタイプの定義 */
  nodeTypes?: TNodeTypes;
  /** カスタムテーマ設定 */
  theme?: import('./theme').IFlowThemePartial;
  /** 追加のCSSクラス名 */
  className?: string;
  /** 追加のインラインスタイル */
  style?: React.CSSProperties;
}

/**
 * ノードの変更を表すタイプ
 */
export type TNodeChange = {
  /** 変更対象ノードのID */
  id: string;
  /** 変更のタイプ */
  type: "position" | "dimensions";
  /** 新しい位置（position変更時） */
  position?: IPosition;
  /** 新しい寸法（dimensions変更時） */
  dimensions?: IDimensions;
};

/**
 * エッジの変更を表すタイプ
 */
export type TEdgeChange = {
  /** 変更対象エッジのID */
  id: string;
  /** 変更のタイプ */
  type: "select" | "remove";
};
