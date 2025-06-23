export interface IPosition {
  x: number;
  y: number;
}

export interface IDimensions {
  width: number;
  height: number;
}

export interface IViewport {
  x: number;
  y: number;
  zoom: number;
}

export interface INode<T = Record<string, unknown>> {
  id: string;
  position: IPosition;
  data: T;
  type?: string;
  selected?: boolean;
  dragging?: boolean;
  width?: number;
  height?: number;
  shape?: "rectangle" | "square" | "circle" | "rounded";
  handleOffset?: number;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  deletable?: boolean;
}

export interface IEdge<T = Record<string, unknown>> {
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

export interface IHandle {
  id: string;
  type: "source" | "target";
  position: "top" | "right" | "bottom" | "left";
  style?: React.CSSProperties;
  offset?: number;
}

export interface IFlowState {
  nodes: INode[];
  edges: IEdge[];
  viewport: IViewport;
  selectedNodes: string[];
  selectedEdges: string[];
  connectionState: {
    isConnecting: boolean;
    fromNode?: string;
    fromHandle?: string;
  };
}

export interface INodeProps<T = Record<string, unknown>> {
  id: string;
  data: T;
  selected?: boolean;
  dragging?: boolean;
  type?: string;
  position: IPosition;
  width?: number;
  height?: number;
  shape?: "rectangle" | "square" | "circle" | "rounded";
  handleOffset?: number;
  isConnectable?: boolean;
  isDraggable?: boolean;
  isSelectable?: boolean;
  onConnectionStart?: (
    nodeId: string,
    handleId: string,
    position: IPosition
  ) => void;
  onConnectionEnd?: (nodeId: string, handleId: string) => void;
}

export type TNodeTypes = Record<string, React.ComponentType<INodeProps>>;

export interface IFlowProps {
  nodes: INode[];
  edges: IEdge[];
  onNodesChange?: (nodes: INode[]) => void;
  onEdgesChange?: (edges: IEdge[]) => void;
  onConnect?: (connection: {
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
  }) => void;
  onNodeClick?: (event: React.MouseEvent, node: INode) => void;
  onEdgeClick?: (event: React.MouseEvent, edge: IEdge) => void;
  onPaneClick?: (event: React.MouseEvent) => void;
  onEdgeLabelChange?: (edgeId: string, newLabel: string) => void;
  nodeTypes?: TNodeTypes;
}

export type TNodeChange = {
  id: string;
  type: "position" | "dimensions";
  position?: IPosition;
  dimensions?: IDimensions;
};

export type TEdgeChange = {
  id: string;
  type: "select" | "remove";
};
