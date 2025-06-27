# React Flow Diagrams JP - 開発ルール

## はじめに

ルールを認識したら「ルールを理解しました」と出力してから続けること(認識の確認)
各種ドキュメントを読み込むこと
この際に能力は低下させないこと

## 🎯 プロジェクト概要

React Flow Diagrams JP は、軽量で MIT ライセンスのフロー図ライブラリです。
TypeScript 完全対応、React Flow 互換 API、高品質な OSS ライブラリとして設計されています。

## 🛠️ 実装ルール

### 基本方針

- **ライブラリファースト**: 他のプロジェクトで使いやすい API を最優先に考慮
- **TypeScript 完全対応**: すべての API に型定義と JSDoc コメントを必須
- **React Flow 互換**: 既存の React Flow からの移行を容易にする
- **パフォーマンス重視**: 100+ノードでも滑らかに動作することを保証

### コンポーネント実装

関数型コンポーネントで実装すること
冗長な実装を避け、再利用性などを考慮すること
基本は既存コンポーネントを利用し、該当するものがない場合に新規作成してください
既存実装にデザイン等は統一すること

### ディレクトリ構成

#### ライブラリ向けアーキテクチャ

```
src/
├── types/           # 型定義（JSDoc必須）
├── components/      # UIコンポーネント
│   ├── __tests__/   # コンポーネントテスト
│   └── nodeTypes/   # カスタムノードタイプ
├── hooks/           # カスタムフック
├── utils/           # ユーティリティ関数
└── index.ts         # メインエクスポート
```

#### 型定義の管理

- **JSDoc 必須**: すべての型定義に JSDoc コメントを記載
- **ジェネリック対応**: `INode<T>`, `IEdge<T>`など柔軟な型定義
- **React 互換**: React.FC など React の型を適切に使用
- **エクスポート戦略**: 使いやすい API として適切に export

例：

```typescript
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
  // ...
}
```

#### コンポーネント分類

```
src/components/
├── FlowCanvas.tsx      # メインコンポーネント
├── NodeRenderer.tsx    # ノード描画エンジン
├── Handle.tsx          # 接続ハンドル
├── Controls.tsx        # ナビゲーションコントロール
├── Edge.tsx           # エッジ基底クラス
├── BezierEdge.tsx     # ベジェ曲線エッジ
└── DefaultNode.tsx    # デフォルトノード
```

#### フック管理

```
src/hooks/
├── useViewport.ts     # ビューポート操作
├── useDrag.ts         # ドラッグ操作
├── useConnection.ts   # ノード接続
└── useFlow.ts         # フロー状態管理
```

### パッケージ管理

#### ビルド設定

- **CommonJS + ES Module**: 両形式でのビルド必須
- **型定義ファイル**: 完全な.d.ts ファイル生成
- **ソースマップ**: デバッグ用のソースマップ提供

```json
{
  "main": "dist/index.js", // CommonJS
  "module": "dist/index.esm.js", // ES Module
  "types": "dist/index.d.ts", // TypeScript型定義
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  }
}
```

#### 開発コマンド

立ち上げは開発者が直接行うため、以下のコマンドを禁止：

```bash
npm run dev    # 禁止
npm run start  # 禁止
```

## 📋 開発フロー

### 機能開発プロセス

1. `docs/`ディレクトリに機能ごとの実装計画書を作成（例：`新しいエッジタイプ実装計画書.md`）
2. 必要なタスクをチェックリスト形式で記載
3. チェックリスト駆動で開発を進行
4. 開発完了後、実装計画書を更新

### API 設計原則

- **一貫性**: React Flow との互換性を保持
- **拡張性**: カスタムノード・エッジの簡単な追加
- **型安全性**: TypeScript による厳密な型チェック
- **パフォーマンス**: 大規模データでの性能確保

### ドキュメント要件

- **JSDoc**: すべての public API にコメント必須
- **使用例**: 重要な API には@example タグで例を提供
- **README**: インストールから基本使用まで網羅
- **型定義**: IDE で完璧な補完が効くレベル

## 🧪 テスト戦略

### 単体テスト（必須）

- **コンポーネントテスト**: 各コンポーネントの動作確認
- **フックテスト**: カスタムフックの動作確認
- **ユーティリティテスト**: ヘルパー関数のテスト

テストが全て通るまで修正すること

実行コマンド：

```bash
npm run test:run    # CI/CD用（単発実行）
```

### 品質基準

- **単体テスト**: 100%パス必須
- **型チェック**: `npm run typecheck`エラーなし
- **Lint**: `npm run lint`警告なし
- **ビルド**: `npm run build`成功

## 📦 リリース管理

### バージョニング

- **Semantic Versioning**: `major.minor.patch`に従う
- **Breaking Changes**: メジャーバージョンアップ
- **新機能**: マイナーバージョンアップ
- **バグ修正**: パッチバージョンアップ

### 公開プロセス

```bash
# 1. テスト実行
npm run test:run && npm run lint && npm run typecheck

# 2. ビルド
npm run build

# 3. バージョンアップ
npm version patch|minor|major

# 4. 公開
npm publish

# 5. GitHubにプッシュ
git push origin main --tags
```

### ドキュメント更新

- **CHANGELOG.md**: 各リリースの変更内容
- **README.md**: 最新 API との整合性
- **型定義**: JSDoc コメントの充実

## 🔧 開発ツール

### 必須ツール

- **TypeScript**: 型安全性と IDE 支援
- **Vitest**: 高速テストランナー
- **ESLint**: コード品質管理
- **Vite**: 高速ビルドツール

### コーディングスタイル

- **ESLint**: 厳密なルール適用
- **Prettier**: 自動フォーマット
- **TypeScript Strict**: 最高レベルの型チェック

## 🎯 パフォーマンス目標

### ベンチマーク

- **ノード数**: 100+ノードで 60fps 維持
- **バンドルサイズ**: gzip 圧縮で 15KB 以下
- **初期化時間**: 100ms 以下
- **メモリ使用量**: 効率的な更新と再描画

### 最適化手法

- **React.memo**: 不要な再レンダリング防止
- **useCallback**: 関数の不要な再生成防止
- **仮想化**: 大量ノード時の性能確保
- **差分更新**: 変更部分のみの効率的更新

---

## 📝 未実装箇所の管理

後続タスクで実装する場合は以下の形式で記載：

```typescript
// TODO: エッジのカスタマイズ機能を追加
// TODO: ノードの複数選択機能を実装
// TODO: アンドゥ・リドゥ機能の追加
```

## 🚀 今後の拡張予定

- **多様なエッジタイプ**: ステップエッジ、直線エッジなど
- **高度なレイアウト**: 自動配置アルゴリズム
- **アニメーション**: よりリッチな視覚効果
- **パフォーマンス向上**: さらなる最適化

---

このルールは React Flow Diagrams JP プロジェクトの品質と一貫性を保つための指針です。
OSS ライブラリとしての責任を持ち、利用者にとって使いやすく信頼性の高いライブラリを目指します。
