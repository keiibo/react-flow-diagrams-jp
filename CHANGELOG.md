# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2024-01-24

### 🎉 Major API Improvements

#### Added

- **新しい統合フック**: `useReactFlow()` - フロー操作を一つのインターフェースで提供
- **React Flow 互換命名**: `ReactFlow` コンポーネント（`FlowCanvas`のエイリアス）
- **簡素化された型名**: `Node`, `Edge`, `Position`（従来の`INode`, `IEdge`, `IPosition`も利用可能）
- **高度なビューポート操作**:
  - `zoomToNode()` - 指定ノードにフォーカス
  - `fitToNodes()` - 複数ノードにフィット
  - `panTo()` - プログラム的なパン操作
  - `screenToFlowPosition()` / `flowToScreenPosition()` - 座標変換
- **JSDoc コメント**: 全ての型定義と主要関数に詳細な説明を追加

#### Improved

- **エクスポート戦略の最適化**: 利用者に必要な API のみを公開
- **開発者体験の向上**: より直感的で使いやすい API 設計
- **ドキュメントの大幅改善**: 詳細な使用例と API 説明を追加
- **TypeScript 完全対応**: 全 API に JSDoc コメント付きで型定義を提供
- **ビルド設定の改善**: CommonJS + ES Module 対応、正しい型定義出力

#### Breaking Changes

- 一部の内部コンポーネントを非公開化（`NodeRenderer`, `DraggableNode`等）
- メインエクスポートの整理（後方互換性は保持）

### Features

- 🚀 Lightweight & Fast - Optimized for 100+ nodes
- 📝 MIT Licensed - No licensing constraints
- 🎯 React Flow compatible API
- 🎨 Customizable node shapes
- 🔗 Interactive connections with Bezier curves
- 🔍 Smooth zoom & pan controls
- 🎛️ Built-in navigation controls
- 🔧 Full TypeScript support
- 🎪 統合フック `useReactFlow` で簡単操作

## [0.1.0] - 2024-01-23

### Added

- Initial release of React Flow Diagrams JP library
- Basic node and edge rendering
- Interactive drag and drop functionality
- Bezier edge connections
- Multiple node shapes (rectangle, circle, rounded, square)
- Zoom and pan controls
- TypeScript support
- Comprehensive test suite

---

**Note**: This project follows semantic versioning. Breaking changes will increment the major version.
