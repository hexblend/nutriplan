import { colors } from '@/lib/constants';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export const APP_THEME = {
  light: {
    background: colors.primary[900],
    border: colors.primary[400],
    card: colors.primary[500],
    notification: colors.secondary[300],
    primary: colors.primary[500],
    text: colors.grayscale['white'],
  },
  dark: {
    background: colors.primary[900],
    border: colors.primary[400],
    card: colors.primary[500],
    notification: colors.secondary[300],
    primary: colors.primary[500],
    text: colors.grayscale['white'],
  },
};

type ThemeColors = typeof APP_THEME.dark;

type ThemeCustomizerContextType = {
  theme: ThemeColors;
  // eslint-disable-next-line
  updateThemeColor: (key: keyof ThemeColors, color: string) => void;
  resetTheme: () => void;
};

const ThemeCustomizerContext = createContext<
  ThemeCustomizerContextType | undefined
>(undefined);

export function ThemeCustomizerProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeColors>({ ...APP_THEME.dark });

  const updateThemeColor = (key: keyof ThemeColors, color: string) => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      [key]: color,
    }));
  };

  const resetTheme = () => {
    setTheme({ ...APP_THEME.dark });
  };

  return (
    <ThemeCustomizerContext.Provider
      value={{
        theme,
        updateThemeColor,
        resetTheme,
      }}
    >
      {children}
    </ThemeCustomizerContext.Provider>
  );
}

export function useThemeCustomizer() {
  const context = useContext(ThemeCustomizerContext);
  if (!context) {
    throw new Error(
      'useThemeCustomizer must be used within ThemeCustomizerProvider'
    );
  }
  return context;
}
