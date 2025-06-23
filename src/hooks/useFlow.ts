import { useState, useCallback } from "react";
import { INode, IEdge } from "@/types";

interface UseFlowReturn {
  nodes: INode[];
  edges: IEdge[];
  setNodes: (nodes: INode[]) => void;
  setEdges: (edges: IEdge[]) => void;
  addNode: (node: INode) => void;
  addEdge: (edge: IEdge) => void;
  removeNode: (nodeId: string) => void;
  removeEdge: (edgeId: string) => void;
}

const useFlow = (
  initialNodes: INode[] = [],
  initialEdges: IEdge[] = []
): UseFlowReturn => {
  const [nodes, setNodes] = useState<INode[]>(initialNodes);
  const [edges, setEdges] = useState<IEdge[]>(initialEdges);

  const addNode = useCallback((node: INode) => {
    setNodes((prevNodes) => [...prevNodes, node]);
  }, []);

  const addEdge = useCallback((edge: IEdge) => {
    setEdges((prevEdges) => [...prevEdges, edge]);
  }, []);

  const removeNode = useCallback((nodeId: string) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
    setEdges((prevEdges) =>
      prevEdges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      )
    );
  }, []);

  const removeEdge = useCallback((edgeId: string) => {
    setEdges((prevEdges) => prevEdges.filter((edge) => edge.id !== edgeId));
  }, []);

  return {
    nodes,
    edges,
    setNodes,
    setEdges,
    addNode,
    addEdge,
    removeNode,
    removeEdge,
  };
};

export default useFlow;
