import { render, screen } from "@testing-library/react";
import NodeRenderer from "../NodeRenderer";
import { INode, INodeProps, TNodeTypes } from "@/types";

// テスト用カスタムノード
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TestNode: React.FC<INodeProps<any>> = ({ id, data }) => (
  <div data-testid={`custom-node-${id}`}>
    <span>Custom: {data?.label}</span>
  </div>
);

describe("NodeRenderer", () => {
  const mockNode: INode = {
    id: "test-node",
    position: { x: 100, y: 100 },
    data: { label: "Test Node" },
    type: "custom",
  };

  const mockViewport = { x: 0, y: 0, zoom: 1 };

  it("renders custom node when nodeType is provided", () => {
    const nodeTypes: TNodeTypes = {
      custom: TestNode,
    };

    render(
      <NodeRenderer
        node={mockNode}
        nodeTypes={nodeTypes}
        viewport={mockViewport}
      />
    );

    expect(screen.getByTestId("custom-node-test-node")).toBeInTheDocument();
    expect(screen.getByText("Custom: Test Node")).toBeInTheDocument();
  });

  it("renders default node when nodeType is not found", () => {
    const nodeTypes: TNodeTypes = {
      other: TestNode,
    };

    render(
      <NodeRenderer
        node={mockNode}
        nodeTypes={nodeTypes}
        viewport={mockViewport}
      />
    );

    // デフォルトノード（NodeWithHandles）がレンダリングされることを確認
    expect(
      screen.queryByTestId("custom-node-test-node")
    ).not.toBeInTheDocument();
  });

  it("renders default node when no nodeTypes provided", () => {
    render(<NodeRenderer node={mockNode} viewport={mockViewport} />);

    // デフォルトノードがレンダリングされることを確認
    expect(
      screen.queryByTestId("custom-node-test-node")
    ).not.toBeInTheDocument();
  });

  it("passes correct props to custom node", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CustomNodeWithProps: React.FC<INodeProps<any>> = (props) => (
      <div data-testid="props-node">
        <span>ID: {props.id}</span>
        <span>Type: {props.type}</span>
        <span>Draggable: {props.isDraggable ? "true" : "false"}</span>
        <span>Connectable: {props.isConnectable ? "true" : "false"}</span>
        <span>Selectable: {props.isSelectable ? "true" : "false"}</span>
      </div>
    );

    const nodeTypes: TNodeTypes = {
      custom: CustomNodeWithProps,
    };

    const nodeWithFlags: INode = {
      ...mockNode,
      draggable: true,
      connectable: false,
      selectable: true,
    };

    render(
      <NodeRenderer
        node={nodeWithFlags}
        nodeTypes={nodeTypes}
        viewport={mockViewport}
      />
    );

    expect(screen.getByText("ID: test-node")).toBeInTheDocument();
    expect(screen.getByText("Type: custom")).toBeInTheDocument();
    expect(screen.getByText("Draggable: true")).toBeInTheDocument();
    expect(screen.getByText("Connectable: false")).toBeInTheDocument();
    expect(screen.getByText("Selectable: true")).toBeInTheDocument();
  });

  it("uses default node when node.type is undefined", () => {
    const nodeWithoutType: INode = {
      ...mockNode,
      type: undefined,
    };

    const nodeTypes: TNodeTypes = {
      default: TestNode,
      custom: TestNode,
    };

    const { container } = render(
      <NodeRenderer
        node={nodeWithoutType}
        nodeTypes={nodeTypes}
        viewport={mockViewport}
      />
    );

    // type が undefined の場合、デフォルトのNodeWithHandlesが使用される
    expect(
      screen.queryByTestId("custom-node-test-node")
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('[data-node-id="test-node"]')
    ).toBeInTheDocument();
  });

  it("renders custom node component correctly", () => {
    const nodeTypes: TNodeTypes = {
      custom: TestNode,
    };

    render(
      <NodeRenderer
        node={mockNode}
        nodeTypes={nodeTypes}
        viewport={mockViewport}
      />
    );

    // カスタムノードが正しくレンダリングされることを確認
    expect(screen.getByTestId("custom-node-test-node")).toBeInTheDocument();
    expect(screen.getByText("Custom: Test Node")).toBeInTheDocument();
  });
});
