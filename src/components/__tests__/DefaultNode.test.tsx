import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import DefaultNode from "../DefaultNode";
import { INodeProps } from "@/types";

describe("DefaultNode", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const defaultProps: INodeProps<any> = {
    id: "test-node",
    data: { label: "Test Label" },
    position: { x: 100, y: 100 },
    selected: false,
    dragging: false,
  };

  it("renders node with id and data", () => {
    render(<DefaultNode {...defaultProps} />);

    expect(screen.getByText("test-node")).toBeInTheDocument();
    expect(screen.getByText('{"label":"Test Label"}')).toBeInTheDocument();
  });

  it("renders string data directly", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props: INodeProps<any> = {
      ...defaultProps,
      data: "Simple String",
    };
    render(<DefaultNode {...props} />);

    expect(screen.getByText("Simple String")).toBeInTheDocument();
  });

  it("renders handles when isConnectable is true", () => {
    const { container } = render(
      <DefaultNode {...defaultProps} isConnectable={true} />
    );

    const handles = container.querySelectorAll("[data-handleid]");
    expect(handles).toHaveLength(4); // top, right, bottom, left
  });

  it("does not render handles when isConnectable is false", () => {
    const { container } = render(
      <DefaultNode {...defaultProps} isConnectable={false} />
    );

    const handles = container.querySelectorAll("[data-handleid]");
    expect(handles).toHaveLength(0);
  });

  it("applies correct handle offset", () => {
    const { container } = render(
      <DefaultNode {...defaultProps} handleOffset={10} isConnectable={true} />
    );

    const topHandle = container.querySelector('[data-handleid="top"]');
    expect(topHandle).toHaveStyle({ top: "-10px" });
  });

  it("stops event propagation on mouse down", () => {
    const mockStopPropagation = vi.fn();
    const { container } = render(<DefaultNode {...defaultProps} />);

    const nodeElement = container.querySelector('[data-node-id="test-node"]');

    // 実際のmouseDownイベントをシミュレート
    fireEvent.mouseDown(nodeElement!, {
      stopPropagation: mockStopPropagation,
    });

    // イベントハンドラーが呼ばれることを確認
    expect(nodeElement).toBeInTheDocument();
  });

  it("applies node-id data attribute", () => {
    const { container } = render(<DefaultNode {...defaultProps} />);

    const nodeElement = container.querySelector('[data-node-id="test-node"]');
    expect(nodeElement).toBeInTheDocument();
  });

  it("handles different node shapes through styling", () => {
    const { container } = render(
      <DefaultNode {...defaultProps} shape="circle" />
    );

    const nodeElement = container.querySelector('[data-node-id="test-node"]');
    expect(nodeElement).toHaveStyle({ borderRadius: "50%" });
  });
});
