// src/context/ThemeContext.js
import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Persist theme using local storage
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Apply theme class to body dynamically
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('light', 'dark'); // Remove previous theme class
      document.body.classList.add(theme);              // Add current theme class
    }
  }, [theme]); // React whenever 'theme' changes

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`theme-wrapper ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// Custom Hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
