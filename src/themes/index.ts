import { IFlowTheme } from "@/types/theme";

/**
 * ライトテーマ（デフォルト）
 */
export const lightTheme: IFlowTheme = {
  name: "light",
  colors: {
    primary: "#007bff",
    secondary: "#6c757d",
    background: "#f8f9fa",
    surface: "#ffffff",
    border: "#dee2e6",
    borderHover: "#007bff",
    text: {
      primary: "#212529",
      secondary: "#6c757d",
      disabled: "#adb5bd",
    },
    state: {
      selected: "#007bff",
      hover: "#0056b3",
      dragging: "#0056b3",
      connecting: "#007bff",
      error: "#dc3545",
      success: "#28a745",
    },
    edge: {
      default: "#6c757d",
      selected: "#007bff",
      hover: "#0056b3",
      animated: "#007bff",
    },
    handle: {
      default: "#6c757d",
      connectable: "#28a745",
      connecting: "#007bff",
    },
    grid: {
      line: "#e9ecef",
      dot: "#dee2e6",
    },
  },
  spacing: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: "50%",
  },
  shadows: {
    none: "none",
    sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
    md: "0 2px 4px rgba(0, 0, 0, 0.1)",
    lg: "0 4px 8px rgba(0, 0, 0, 0.15)",
    xl: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    fontSize: {
      xs: "10px",
      sm: "12px",
      md: "14px",
      lg: "16px",
      xl: "18px",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
    },
  },
  node: {
    defaultSize: {
      width: 140,
      height: 70,
    },
    minSize: {
      width: 60,
      height: 40,
    },
    padding: 10,
    handleOffset: 5,
    handleSize: 8,
  },
  edge: {
    strokeWidth: 2,
    strokeWidthSelected: 3,
    animationDuration: 2000,
    labelPadding: 4,
  },
  controls: {
    buttonSize: 32,
    iconSize: 16,
    position: {
      bottom: 20,
      right: 20,
    },
  },
};

/**
 * ダークテーマ
 */
export const darkTheme: IFlowTheme = {
  ...lightTheme,
  name: "dark",
  colors: {
    primary: "#4dabf7",
    secondary: "#868e96",
    background: "#212529",
    surface: "#343a40",
    border: "#495057",
    borderHover: "#4dabf7",
    text: {
      primary: "#f8f9fa",
      secondary: "#adb5bd",
      disabled: "#6c757d",
    },
    state: {
      selected: "#4dabf7",
      hover: "#339af0",
      dragging: "#339af0",
      connecting: "#4dabf7",
      error: "#ff6b6b",
      success: "#51cf66",
    },
    edge: {
      default: "#868e96",
      selected: "#4dabf7",
      hover: "#339af0",
      animated: "#4dabf7",
    },
    handle: {
      default: "#868e96",
      connectable: "#51cf66",
      connecting: "#4dabf7",
    },
    grid: {
      line: "#495057",
      dot: "#343a40",
    },
  },
};

/**
 * ブルーテーマ
 */
export const blueTheme: IFlowTheme = {
  ...lightTheme,
  name: "blue",
  colors: {
    ...lightTheme.colors,
    primary: "#1976d2",
    background: "#e3f2fd",
    surface: "#ffffff",
    state: {
      selected: "#1976d2",
      hover: "#1565c0",
      dragging: "#1565c0",
      connecting: "#1976d2",
      error: "#d32f2f",
      success: "#388e3c",
    },
    edge: {
      default: "#757575",
      selected: "#1976d2",
      hover: "#1565c0",
      animated: "#1976d2",
    },
  },
};

/**
 * グリーンテーマ
 */
export const greenTheme: IFlowTheme = {
  ...lightTheme,
  name: "green",
  colors: {
    ...lightTheme.colors,
    primary: "#388e3c",
    background: "#e8f5e8",
    surface: "#ffffff",
    state: {
      selected: "#388e3c",
      hover: "#2e7d32",
      dragging: "#2e7d32",
      connecting: "#388e3c",
      error: "#d32f2f",
      success: "#388e3c",
    },
    edge: {
      default: "#757575",
      selected: "#388e3c",
      hover: "#2e7d32",
      animated: "#388e3c",
    },
  },
};

/**
 * 紫テーマ
 */
export const purpleTheme: IFlowTheme = {
  ...lightTheme,
  name: "purple",
  colors: {
    ...lightTheme.colors,
    primary: "#7b1fa2",
    background: "#f3e5f5",
    surface: "#ffffff",
    state: {
      selected: "#7b1fa2",
      hover: "#6a1b9a",
      dragging: "#6a1b9a",
      connecting: "#7b1fa2",
      error: "#d32f2f",
      success: "#388e3c",
    },
    edge: {
      default: "#757575",
      selected: "#7b1fa2",
      hover: "#6a1b9a",
      animated: "#7b1fa2",
    },
  },
};

/**
 * 利用可能なテーマ一覧
 */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  blue: blueTheme,
  green: greenTheme,
  purple: purpleTheme,
} as const;

/**
 * テーマ名の型
 */
export type ThemeName = keyof typeof themes;

/**
 * デフォルトテーマ
 */
export const defaultTheme = lightTheme;