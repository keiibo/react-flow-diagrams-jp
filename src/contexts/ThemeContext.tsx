import React, { createContext, useContext, useState, useCallback } from "react";
import { IFlowTheme, IFlowThemePartial, IFlowThemeContext } from "@/types/theme";
import { defaultTheme } from "@/themes";

/**
 * テーマコンテキスト
 */
const ThemeContext = createContext<IFlowThemeContext | undefined>(undefined);

/**
 * テーマプロバイダーのプロパティ
 */
interface ThemeProviderProps {
  /** 子コンポーネント */
  children: React.ReactNode;
  /** 初期テーマ */
  initialTheme?: IFlowTheme;
}

/**
 * 深いマージ関数
 * オブジェクトを再帰的にマージする
 */
function deepMerge(target: IFlowTheme, source: IFlowThemePartial): IFlowTheme {
  const result = { ...target } as IFlowTheme;
  
  for (const key in source) {
    if (source[key as keyof IFlowThemePartial] !== undefined) {
      const sourceValue = source[key as keyof IFlowThemePartial];
      const targetValue = target[key as keyof IFlowTheme];
      
      if (
        typeof sourceValue === "object" &&
        sourceValue !== null &&
        !Array.isArray(sourceValue) &&
        typeof targetValue === "object" &&
        targetValue !== null &&
        !Array.isArray(targetValue)
      ) {
        (result as any)[key] = { ...targetValue, ...sourceValue };
      } else {
        (result as any)[key] = sourceValue;
      }
    }
  }
  
  return result;
}

/**
 * テーマプロバイダー
 * フロー図のテーマを管理するコンテキストプロバイダー
 * 
 * @example
 * ```tsx
 * <ThemeProvider initialTheme={darkTheme}>
 *   <FlowCanvas nodes={nodes} edges={edges} />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = defaultTheme,
}) => {
  const [theme, setThemeState] = useState<IFlowTheme>(initialTheme);

  /**
   * テーマを設定する
   * パーシャルなテーマオブジェクトを受け取り、現在のテーマとマージする
   */
  const setTheme = useCallback((newTheme: IFlowThemePartial) => {
    setThemeState((currentTheme) => deepMerge(currentTheme, newTheme));
  }, []);

  const value: IFlowThemeContext = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * テーマフック
 * フロー図コンポーネント内でテーマを使用するためのフック
 * 
 * @returns テーマコンテキストの値
 * @throws {Error} ThemeProvider外で使用された場合
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, setTheme } = useFlowTheme();
 *   
 *   return (
 *     <div style={{ color: theme.colors.text.primary }}>
 *       Hello World
 *     </div>
 *   );
 * }
 * ```
 */
export const useFlowTheme = (): IFlowThemeContext => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useFlowTheme must be used within a ThemeProvider");
  }
  
  return context;
};

/**
 * テーマを安全に取得するフック
 * ThemeProvider外でも使用可能で、その場合はデフォルトテーマを返す
 * 
 * @returns 現在のテーマまたはデフォルトテーマ
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const theme = useFlowThemeSafe();
 *   
 *   return (
 *     <div style={{ color: theme.colors.text.primary }}>
 *       Hello World
 *     </div>
 *   );
 * }
 * ```
 */
export const useFlowThemeSafe = (): IFlowTheme => {
  const context = useContext(ThemeContext);
  return context?.theme ?? defaultTheme;
};