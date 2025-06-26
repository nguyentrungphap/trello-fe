import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
  currentTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'system',
  setThemeMode: () => { },
  currentTheme: 'light',
});

interface ThemeProviderCustomProps {
  children: ReactNode;
}

export const ThemeProviderCustom = ({ children }: ThemeProviderCustomProps) => {
  const getSystemTheme = (): 'light' | 'dark' => {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 6 ? 'dark' : 'light';
    console.log({ hour });
  };

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem('themeMode') as ThemeMode) || 'system';
  });

  const currentTheme: 'light' | 'dark' = useMemo(() => {
    return themeMode === 'system' ? getSystemTheme() : themeMode;
  }, [themeMode]);

  // Lưu vào localStorage mỗi khi themeMode thay đổi
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('themeMode', themeMode);
    }
  }, [themeMode]);

  // Lắng nghe thay đổi của hệ điều hành
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (themeMode === 'system') {
        setThemeMode('system'); // re-trigger để cập nhật currentTheme
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);