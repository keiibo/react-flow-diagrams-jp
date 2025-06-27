/**
 * フロー図ライブラリのテーマシステム型定義
 */

/**
 * カラーパレット定義
 */
export interface IFlowColors {
  /** プライマリカラー（選択状態など） */
  primary: string;
  /** セカンダリカラー */
  secondary: string;
  /** 背景色（キャンバス） */
  background: string;
  /** サーフェス色（ノード背景など） */
  surface: string;
  /** ボーダー色 */
  border: string;
  /** ボーダー色（ホバー時） */
  borderHover: string;
  /** テキスト色 */
  text: {
    /** プライマリテキスト */
    primary: string;
    /** セカンダリテキスト */
    secondary: string;
    /** 無効状態のテキスト */
    disabled: string;
  };
  /** 状態別カラー */
  state: {
    /** 選択状態 */
    selected: string;
    /** ホバー状態 */
    hover: string;
    /** ドラッグ中 */
    dragging: string;
    /** 接続中 */
    connecting: string;
    /** エラー状態 */
    error: string;
    /** 成功状態 */
    success: string;
  };
  /** エッジカラー */
  edge: {
    /** デフォルトエッジ */
    default: string;
    /** 選択されたエッジ */
    selected: string;
    /** ホバー時のエッジ */
    hover: string;
    /** アニメーションエッジ */
    animated: string;
  };
  /** ハンドルカラー */
  handle: {
    /** デフォルトハンドル */
    default: string;
    /** 接続可能時 */
    connectable: string;
    /** 接続中 */
    connecting: string;
  };
  /** グリッドカラー */
  grid: {
    /** グリッド線 */
    line: string;
    /** ドット */
    dot: string;
  };
}

/**
 * スペーシング定義
 */
export interface IFlowSpacing {
  /** 極小: 2px */
  xs: number;
  /** 小: 4px */
  sm: number;
  /** 中: 8px */
  md: number;
  /** 大: 16px */
  lg: number;
  /** 極大: 24px */
  xl: number;
  /** 超大: 32px */
  xxl: number;
}

/**
 * ボーダー半径定義
 */
export interface IFlowBorderRadius {
  /** なし: 0px */
  none: number;
  /** 小: 4px */
  sm: number;
  /** 中: 8px */
  md: number;
  /** 大: 12px */
  lg: number;
  /** 極大: 16px */
  xl: number;
  /** 完全な円: 50% */
  full: string;
}

/**
 * シャドウ定義
 */
export interface IFlowShadows {
  /** シャドウなし */
  none: string;
  /** 小さなシャドウ */
  sm: string;
  /** 中程度のシャドウ */
  md: string;
  /** 大きなシャドウ */
  lg: string;
  /** 極大シャドウ */
  xl: string;
}

/**
 * タイポグラフィ定義
 */
export interface IFlowTypography {
  /** フォントファミリー */
  fontFamily: string;
  /** フォントサイズ */
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  /** フォントウェイト */
  fontWeight: {
    normal: number;
    medium: number;
    bold: number;
  };
  /** 行の高さ */
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

/**
 * ノード関連の設定
 */
export interface IFlowNodeConfig {
  /** デフォルトサイズ */
  defaultSize: {
    width: number;
    height: number;
  };
  /** 最小サイズ */
  minSize: {
    width: number;
    height: number;
  };
  /** パディング */
  padding: number;
  /** ハンドルのデフォルトオフセット */
  handleOffset: number;
  /** ハンドルサイズ */
  handleSize: number;
}

/**
 * エッジ関連の設定
 */
export interface IFlowEdgeConfig {
  /** デフォルトの線の太さ */
  strokeWidth: number;
  /** 選択時の線の太さ */
  strokeWidthSelected: number;
  /** アニメーション速度 */
  animationDuration: number;
  /** ラベルの背景パディング */
  labelPadding: number;
}

/**
 * コントロール関連の設定
 */
export interface IFlowControlsConfig {
  /** ボタンサイズ */
  buttonSize: number;
  /** アイコンサイズ */
  iconSize: number;
  /** 配置位置 */
  position: {
    bottom: number;
    right: number;
  };
}

/**
 * フロー図のテーマ定義
 */
export interface IFlowTheme {
  /** テーマ名 */
  name: string;
  /** カラーパレット */
  colors: IFlowColors;
  /** スペーシング */
  spacing: IFlowSpacing;
  /** ボーダー半径 */
  borderRadius: IFlowBorderRadius;
  /** シャドウ */
  shadows: IFlowShadows;
  /** タイポグラフィ */
  typography: IFlowTypography;
  /** ノード設定 */
  node: IFlowNodeConfig;
  /** エッジ設定 */
  edge: IFlowEdgeConfig;
  /** コントロール設定 */
  controls: IFlowControlsConfig;
}

/**
 * テーマのパーシャル型（ユーザーがカスタマイズ時に使用）
 */
export type IFlowThemePartial = {
  name?: string;
  colors?: Partial<IFlowColors>;
  spacing?: Partial<IFlowSpacing>;
  borderRadius?: Partial<IFlowBorderRadius>;
  shadows?: Partial<IFlowShadows>;
  typography?: Partial<IFlowTypography>;
  node?: Partial<IFlowNodeConfig>;
  edge?: Partial<IFlowEdgeConfig>;
  controls?: Partial<IFlowControlsConfig>;
};

/**
 * テーマコンテキストの値
 */
export interface IFlowThemeContext {
  /** 現在のテーマ */
  theme: IFlowTheme;
  /** テーマを設定する関数 */
  setTheme: (theme: IFlowThemePartial) => void;
}