import { useState, useCallback } from "react";
import { IPosition } from "@/types";

interface ConnectionState {
  isConnecting: boolean;
  fromNode?: string;
  fromHandle?: string;
  fromPosition?: IPosition;
  toPosition?: IPosition;
}

interface UseConnectionReturn {
  connectionState: ConnectionState;
  startConnection: (
    nodeId: string,
    handleId: string,
    position: IPosition
  ) => void;
  updateConnectionPosition: (position: IPosition) => void;
  completeConnection: (targetNodeId: string, targetHandleId: string) => void;
  cancelConnection: () => void;
  connectionPath?: string;
}

export const useConnection = (
  onConnect?: (connection: {
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
  }) => void
): UseConnectionReturn => {
  const [connectionState, setConnectionState] = useState<ConnectionState>({
    isConnecting: false,
  });

  const startConnection = useCallback(
    (nodeId: string, handleId: string, position: IPosition) => {
      // どのハンドルからも接続を開始可能にする
      setConnectionState({
        isConnecting: true,
        fromNode: nodeId,
        fromHandle: handleId,
        fromPosition: position,
        toPosition: position,
      });
    },
    []
  );

  const updateConnectionPosition = useCallback((position: IPosition) => {
    setConnectionState((prev) => ({
      ...prev,
      toPosition: position,
    }));
  }, []);

  const completeConnection = useCallback(
    (targetNodeId: string, targetHandleId: string) => {
      // 同じノードへの接続を防ぐ
      if (
        connectionState.fromNode &&
        connectionState.fromHandle &&
        connectionState.fromNode !== targetNodeId
      ) {
        onConnect?.({
          source: connectionState.fromNode,
          target: targetNodeId,
          sourceHandle: connectionState.fromHandle,
          targetHandle: targetHandleId,
        });
      }

      setConnectionState({
        isConnecting: false,
      });
    },
    [connectionState, onConnect]
  );

  const cancelConnection = useCallback(() => {
    setConnectionState({
      isConnecting: false,
    });
  }, []);

  const connectionPath =
    connectionState.isConnecting &&
    connectionState.fromPosition &&
    connectionState.toPosition
      ? `M${connectionState.fromPosition.x},${connectionState.fromPosition.y} L${connectionState.toPosition.x},${connectionState.toPosition.y}`
      : undefined;

  return {
    connectionState,
    startConnection,
    updateConnectionPosition,
    completeConnection,
    cancelConnection,
    connectionPath,
  };
};
