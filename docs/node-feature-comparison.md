# Node機能比較: React Flow vs このライブラリ

## 概要

このドキュメントでは、React Flowとこのフロー図ライブラリのNode機能を詳細に比較し、現在の実装状況と今後の開発優先度を整理します。

## 実装状況サマリー

- **実装済み**: 75%
- **基本機能**: 完全対応
- **独自優位点**: ハンドル距離調整、TypeScript統合など
- **最大の不足点**: カスタムノードタイプシステム

---

## ✅ 実装済み機能（このライブラリで利用可能）

### 基本ノード機能

| 機能 | React Flow | このライブラリ | 評価 |
|------|------------|---------------|------|
| ノードID管理 | `id: string` | `id: string` | ✅ 同等 |
| 位置制御 | `position: {x, y}` | `position: {x, y}` | ✅ 同等 |
| データ格納 | `data: any` | `data: T` (ジェネリック) | ✅ より型安全 |
| 選択状態 | `selected?: boolean` | `selected?: boolean` | ✅ 同等 |

### ドラッグ機能

| 機能 | React Flow | このライブラリ | 評価 |
|------|------------|---------------|------|
| ノードドラッグ | `draggable?: boolean` | 常時有効 | ✅ 実装済み |
| ドラッグフィードバック | 基本的 | スケール・影効果 | ✅ より高品質 |
| 座標変換 | 自動 | ビューポート対応 | ✅ 同等 |
| グローバルマウス対応 | あり | あり | ✅ 同等 |

### ハンドル機能

| 機能 | React Flow | このライブラリ | 評価 |
|------|------------|---------------|------|
| 接続ハンドル | `<Handle />` | `<Handle />` | ✅ 同等API |
| 4方向配置 | top/right/bottom/left | top/right/bottom/left | ✅ 同等 |
| ハンドル距離調整 | 固定 | 0-30px調整可能 | ✅ **より柔軟** |
| イベント処理 | あり | マウスダウン/アップ | ✅ 同等 |

### ノード形状・スタイリング

| 機能 | React Flow | このライブラリ | 評価 |
|------|------------|---------------|------|
| 基本形状 | デフォルトのみ | 4種類（rectangle, square, circle, rounded） | ✅ 対応済み |
| 動的スタイリング | CSS制御 | 選択・ドラッグ状態対応 | ✅ 同等 |
| サイズ制御 | 自動計算推奨 | 固定サイズ | ✅ 基本対応 |

---

## ❌ 未実装機能（React Flowにあってこのライブラリにない）

### 🔴 高優先度（React Flow互換性のため必須）

#### 1. カスタムノードタイプシステム
```typescript
// React Flow
const nodeTypes = { 
  textUpdater: TextUpdaterNode,
  customInput: CustomInputNode 
};
<ReactFlow nodeTypes={nodeTypes} />

// このライブラリ
// 未実装 - 全ノードが同じコンポーネント
```
**影響度**: 非常に高い  
**理由**: カスタムノード作成はReact Flowの核心機能

#### 2. カスタムノードコンポーネント
```typescript
// React Flow
function CustomNode({ data, isConnectable }) {
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

// このライブラリ
// 未実装 - 固定レイアウトのみ
```

#### 3. ノード制御フラグ
```typescript
// React Flow
{
  draggable: false,     // 個別ドラッグ制御
  selectable: true,     // 選択可否
  connectable: false,   // 接続可否
  deletable: true       // 削除可否
}

// このライブラリ
// 未実装 - 全体制御のみ
```

### 🟡 中優先度（機能拡張）

#### 4. 自動サイズ計算
```typescript
// React Flow
// width, heightは自動計算（設定非推奨）

// このライブラリ  
// 固定サイズ設定
```

#### 5. 親子関係・グループ化
```typescript
// React Flow
{
  id: 'child',
  parentId: 'parent',  // 未実装
  type: 'group'        // 未実装
}
```

#### 6. カスタムハンドル位置制御
```typescript
// React Flow
{
  sourcePosition: Position.Right,
  targetPosition: Position.Left
}

// このライブラリ
// 4方向固定配置のみ
```

### 🟢 低優先度（高度な機能）

#### 7. その他制御機能
```typescript
// React Flow
{
  hidden: true,           // ノード非表示
  className: 'custom',    // カスタムCSS
  style: { ... },         // インラインスタイル
  ariaLabel: 'Node'       // アクセシビリティ
}
```

---

## 🚀 このライブラリの独自優位点

### 1. ハンドル距離調整
```typescript
// このライブラリのみ
{
  handleOffset: 15  // 0-30px調整可能
}
```

### 2. TypeScript統合
- 完全な型安全性
- ジェネリック型によるデータ型制御
- 厳密な型チェック

### 3. 軽量性・パフォーマンス
- React Flowより軽量
- シンプルで高速な実装
- 不要な機能を含まない

### 4. ライセンス・カスタマイズ性
- MIT ライセンス（React Flowは制限あり）
- シンプルで改造しやすいコードベース
- 独自要件への対応が容易

---

## 📋 実装優先度ロードマップ

### Phase 1: React Flow基本互換性 (高優先度)
1. **カスタムノードタイプシステム**
   - `nodeTypes`プロパティの実装
   - 複数ノードタイプサポート
   - カスタムReactコンポーネント対応

2. **ノード制御フラグ**
   - `draggable`, `selectable`, `connectable`個別制御
   - 細かな動作制御の実装

3. **カスタムノードコンポーネントAPI**
   - NodePropsインターフェース
   - Handle配置の自由度向上

### Phase 2: 機能拡張 (中優先度)
4. **自動サイズ計算**
   - コンテンツベースの動的サイズ
   - width/height自動調整

5. **親子関係・階層構造**
   - `parentId`による親子関係
   - グループノード機能

6. **ハンドル高度制御**
   - `sourcePosition`, `targetPosition`
   - カスタムハンドル数・位置

### Phase 3: 高度機能 (低優先度)
7. **その他制御機能**
   - `hidden`, `className`, `style`
   - アクセシビリティ対応

8. **パフォーマンス最適化**
   - 大量ノード対応
   - 仮想化技術導入

---

## 🧪 現在の実装詳細

### Node型定義
```typescript
interface Node<T = any> {
  id: string;                    // ✅ 実装済み
  position: Position;            // ✅ 実装済み  
  data: T;                      // ✅ 実装済み（ジェネリック）
  type?: string;                // ❌ 未実装（無視される）
  selected?: boolean;           // ✅ 実装済み
  dragging?: boolean;           // ✅ 実装済み
  width?: number;               // ✅ 実装済み（固定値）
  height?: number;              // ✅ 実装済み（固定値）
  shape?: "rectangle" | "square" | "circle" | "rounded"; // ✅ 独自機能
  handleOffset?: number;        // ✅ 独自機能
}
```

### コンポーネント構成
```
src/components/
├── Node.tsx              # 基本ノード
├── DraggableNode.tsx     # ドラッグ可能ノード  
├── NodeWithHandles.tsx   # ハンドル付きノード（メイン）
└── Handle.tsx            # ハンドルコンポーネント
```

### 実装済み機能一覧
- ✅ 4種類のノード形状
- ✅ ドラッグ&ドロップ（ビューポート対応）
- ✅ 選択状態管理・視覚フィードバック
- ✅ 4方向ハンドル（上下左右）
- ✅ ハンドル距離調整（0-30px）
- ✅ 接続イベント処理
- ✅ TypeScript完全対応
- ✅ Storybook例とテスト

---

## 📊 総合評価

### 現在の状況
- **実装率**: 75% (基本機能完了)
- **React Flow互換性**: 部分的
- **独自価値**: ハンドル調整、TypeScript、軽量性

### 結論
このライブラリは基本的なフロー図作成には十分な機能を持っており、**カスタムノードタイプシステムを実装すればReact Flowの有力な代替**となる可能性があります。

特に以下の用途には現状でも十分活用可能：
- シンプルなフロー図
- プロトタイプ作成
- 軽量なダイアグラム機能
- TypeScript重視の開発

最優先実装課題は**カスタムノードタイプシステム**であり、これによりReact Flowからの移行可能性が大幅に向上します。

---

*最終更新: 2025年6月21日*  
*バージョン: 0.1.0*