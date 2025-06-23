import { render } from "@testing-library/react";
import Handle from "../Handle";

describe("Handle", () => {
  const defaultProps = {
    id: "test-handle",
    type: "source" as const,
    position: "top" as const,
    nodeId: "test-node",
  };

  it("renders handle with default offset", () => {
    const { container } = render(<Handle {...defaultProps} />);

    const handle = container.querySelector('[data-handleid="test-handle"]');
    expect(handle).toBeInTheDocument();
  });

  it("applies custom offset to handle position", () => {
    const { container } = render(<Handle {...defaultProps} offset={10} />);

    const handle = container.querySelector('[data-handleid="test-handle"]');
    expect(handle).toHaveStyle({ top: "-10px" });
  });

  it("uses default offset of 5px when not specified", () => {
    const { container } = render(<Handle {...defaultProps} />);

    const handle = container.querySelector('[data-handleid="test-handle"]');
    expect(handle).toHaveStyle({ top: "-5px" });
  });

  it("applies offset correctly for different positions", () => {
    const positions = [
      { position: "top" as const, expectedStyle: { top: "-15px" } },
      { position: "right" as const, expectedStyle: { right: "-15px" } },
      { position: "bottom" as const, expectedStyle: { bottom: "-15px" } },
      { position: "left" as const, expectedStyle: { left: "-15px" } },
    ];

    positions.forEach(({ position, expectedStyle }) => {
      const { container } = render(
        <Handle {...defaultProps} position={position} offset={15} />
      );

      const handle = container.querySelector('[data-handleid="test-handle"]');
      expect(handle).toHaveStyle(expectedStyle);
    });
  });

  it("maintains handle attributes for connection functionality", () => {
    const { container } = render(<Handle {...defaultProps} offset={8} />);

    const handle = container.querySelector('[data-handleid="test-handle"]');
    expect(handle).toHaveAttribute("data-handleid", "test-handle");
    expect(handle).toHaveAttribute("data-handletype", "source");
    expect(handle).toHaveAttribute("data-nodeid", "test-node");
  });
});
