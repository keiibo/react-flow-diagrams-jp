/**
 * @fileoverview カスタムノードタイプの定義とエクスポート
 *
 * このモジュールは利用可能なカスタムノードタイプを提供します。
 * 現在はDefaultNodeのみ提供し、typeプロパティによる機能拡張をサポートします。
 */

// 現在はDefaultNodeに画像機能を統合したため、特別なImageNodeは不要
// type="image"を指定することでDefaultNodeが画像として動作する

export { default as DefaultNode } from "../DefaultNode";
