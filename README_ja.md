# Flow Diagram

インタラクティブなノードベース図表やフローチャートを構築するための軽量で MIT ライセンスのフロー図ライブラリです。

## 特徴

- 🚀 **軽量・高速** - 100+ノードでの性能最適化
- 📝 **MIT ライセンス** - ライセンス制約なし、完全無料で使用可能
- 🎯 **React Flow 互換** - 馴染みのある API で簡単な移行
- 🎨 **カスタマイズ可能なノード** - 異なるノード形状とカスタムコンポーネントのサポート
- 🔗 **インタラクティブな接続** - ベジェ曲線でのドラッグ&ドロップエッジ作成
- 🔍 **ズーム・パン** - Figma 風のナビゲーションでスムーズなビューポート制御
- 🎛️ **組み込みコントロール** - ズームイン/アウト、フィットビュー、リセットコントロール
- 🔧 **TypeScript** - 厳密な型付けによる完全な TypeScript サポート

## インストール

```bash
npm install flow-diagram
# または
yarn add flow-diagram
# または
pnpm add flow-diagram
```

## クイックスタート

```tsx
import React, { useState } from 'react';
import { FlowCanvas, INode, IEdge } from 'flow-diagram';

const initialNodes: INode[] = [
  {
    id: '1',
    position: { x: 100, y: 100 },
    data: { label: 'ノード 1' },
  },
  {
    id: '2',
    position: { x: 300, y: 100 },
    data: { label: 'ノード 2' },
  },
];

const initialEdges: IEdge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
];

function FlowDiagram() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  return (
    &lt;div style={{ width: '100vw', height: '100vh' }}&gt;
      &lt;FlowCanvas
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
      /&gt;
    &lt;/div&gt;
  );
}

export default FlowDiagram;
```

## 基本的な使用方法

### ノードタイプと形状

Flow Diagram は標準で異なるノード形状をサポートしています：

```tsx
const nodes: INode[] = [
  {
    id: "rect",
    position: { x: 50, y: 50 },
    data: { label: "長方形" },
    shape: "rectangle",
  },
  {
    id: "circle",
    position: { x: 200, y: 50 },
    data: { label: "円形" },
    shape: "circle",
  },
  {
    id: "rounded",
    position: { x: 350, y: 50 },
    data: { label: "角丸" },
    shape: "rounded",
  },
  {
    id: "square",
    position: { x: 500, y: 50 },
    data: { label: "正方形" },
    shape: "square",
  },
];
```

### インタラクティブな接続

`onConnect`コールバックを処理してノード接続を有効にします：

```tsx
function InteractiveFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const handleConnect = (connection) =&gt; {
    const newEdge = {
      id: `e${connection.source}-${connection.target}`,
      source: connection.source,
      target: connection.target,
      sourceHandle: connection.sourceHandle,
      targetHandle: connection.targetHandle,
    };
    setEdges(prev =&gt; [...prev, newEdge]);
  };

  return (
    &lt;FlowCanvas
      nodes={nodes}
      edges={edges}
      onNodesChange={setNodes}
      onEdgesChange={setEdges}
      onConnect={handleConnect}
    /&gt;
  );
}
```

### エッジラベル

エッジにラベルを追加・編集できます：

```tsx
const edgesWithLabels: IEdge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    data: { label: 'ダブルクリックで編集' },
  },
];

&lt;FlowCanvas
  nodes={nodes}
  edges={edgesWithLabels}
  onEdgeLabelChange={(edgeId, newLabel) =&gt; {
    console.log(`エッジ ${edgeId} のラベルが変更されました: ${newLabel}`);
  }}
/&gt;
```

## ナビゲーション操作

Flow Diagram は直感的なナビゲーションを提供します：

- **マウスホイール**: 縦スクロール（パン）
- **Shift + マウスホイール**: 横スクロール（パン）
- **Cmd/Ctrl + マウスホイール**: カーソル位置でのズームイン/アウト
- **背景ドラッグ**: キャンバス全体のパン
- **ノードドラッグ**: 個別ノードの移動
- **ハンドルドラッグ**: ノード間の接続作成

## API リファレンス

### FlowCanvas Props

| プロパティ          | 型                                         | 説明                                           |
| ------------------- | ------------------------------------------ | ---------------------------------------------- |
| `nodes`             | `INode[]`                                  | 表示するノードの配列                           |
| `edges`             | `IEdge[]`                                  | 表示するエッジの配列                           |
| `onNodesChange`     | `(nodes: INode[]) => void`                 | ノード変更時のコールバック                     |
| `onEdgesChange`     | `(edges: IEdge[]) => void`                 | エッジ変更時のコールバック                     |
| `onConnect`         | `(connection: Connection) => void`         | ノード接続時のコールバック                     |
| `onNodeClick`       | `(event: MouseEvent, node: INode) => void` | ノードクリック時のコールバック                 |
| `onEdgeClick`       | `(event: MouseEvent, edge: IEdge) => void` | エッジクリック時のコールバック                 |
| `onPaneClick`       | `(event: MouseEvent) => void`              | 背景クリック時のコールバック                   |
| `onEdgeLabelChange` | `(edgeId: string, label: string) => void`  | エッジラベル変更時のコールバック               |
| `nodeTypes`         | `TNodeTypes`                               | カスタムノードコンポーネントタイプ             |
| `edgeTypes`         | `TEdgeTypes`                               | カスタムエッジコンポーネントタイプ             |
| `fitView`           | `boolean`                                  | 初期レンダリング時にフィットビューするかどうか |
| `fitViewOptions`    | `FitViewOptions`                           | フィットビューの動作オプション                 |

### INode インターフェース

```tsx
interface INode&lt;T = any&gt; {
  id: string;
  position: IPosition;
  data: T;
  type?: string;
  selected?: boolean;
  shape?: 'rectangle' | 'square' | 'circle' | 'rounded';
  handleOffset?: number;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  width?: number;
  height?: number;
}
```

### IEdge インターフェース

```tsx
interface IEdge&lt;T = any&gt; {
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
```

## 高度な機能

### カスタムノードタイプ

カスタムノードコンポーネントを作成します：

```tsx
import { INodeProps } from 'flow-diagram';

const CustomNode = ({ data, selected }: INodeProps) =&gt; {
  return (
    &lt;div
      style={{
        padding: '10px',
        border: selected ? '2px solid blue' : '1px solid gray',
        borderRadius: '4px',
        background: 'white',
      }}
    &gt;
      &lt;strong&gt;{data.title}&lt;/strong&gt;
      &lt;p&gt;{data.description}&lt;/p&gt;
    &lt;/div&gt;
  );
};

const nodeTypes: TNodeTypes = {
  custom: CustomNode,
};

&lt;FlowCanvas
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes}
/&gt;
```

### ハンドルのカスタマイズ

ハンドルの位置や外観を調整します：

```tsx
const nodeWithCustomHandles: INode = {
  id: "custom-handles",
  position: { x: 100, y: 100 },
  data: { label: "カスタムハンドル" },
  handleOffset: 15, // ノードエッジからの距離（ピクセル）
};
```

## 開発

### 前提条件

- Node.js 16+
- npm、yarn、または pnpm

### セットアップ

```bash
git clone https://github.com/your-org/flow-diagram.git
cd flow-diagram
npm install
```

### 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# テスト実行
npm run test

# UIでテスト実行
npm run test:ui

# 型チェック
npm run typecheck

# リント実行
npm run lint

# ライブラリビルド
npm run build

# ビルドプレビュー
npm run preview

# Storybook起動
npm run storybook
```

## パフォーマンス

Flow Diagram はパフォーマンスに最適化されています：

- **目標**: 100+ノードでスムーズなパフォーマンス
- **レンダリング**: SVG + foreignObject（パフォーマンス向上のため Canvas フォールバック）
- **アニメーション**: 60fps+のスムーズなアニメーション
- **バンドルサイズ**: 軽量でツリーシェイキング対応

## ブラウザサポート

- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

## React Flow からの移行

Flow Diagram は React Flow のコア機能について部分的な API 互換性を提供します。基本的なフローは、インポートを変更するだけで移行できます：

```tsx
// 移行前（React Flow）
import ReactFlow from "reactflow";

// 移行後（Flow Diagram）
import { FlowCanvas } from "flow-diagram";
```

高度な機能については、いくつかの調整が必要になる場合があります。主な違いは以下の通りです：

- インターフェース名に`I`プレフィックス（例：`INode`、`IEdge`）
- 型名に`T`プレフィックス（例：`TNodeTypes`）
- コンポーネント名が`ReactFlow`から`FlowCanvas`に変更

## 貢献

コントリビュートを歓迎します！
誤字修正からでも参加してみませんか？✨

## ライセンス

MIT ライセンス

## 変更履歴

リリース履歴については[CHANGELOG.md](CHANGELOG.md)をご覧ください。

---

React コミュニティのために ❤️ で作成
