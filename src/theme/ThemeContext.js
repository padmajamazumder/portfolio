import React, { createContext, useState, useEffect } from 'react';

// Light theme colors
const lightTheme = {
  background: '#F9F9F6', // Soft Beige
  cardBg: '#FFFFFF',
  text: '#4A4A4A', // Deep Gray
  heading: '#2F2F2F', // Charcoal
  accent: '#5F9EA0', // Soft Teal
  secondary: '#FF6B6B', // Muted Coral
  border: '#EAEAEA',
  navBg: 'rgba(249, 249, 246, 0.8)' // Translucent Soft Beige
};

// Dark theme colors
const darkTheme = {
  background: '#0F0F11', // True black tint
  cardBg: '#1A1A1E', // Card/section contrast
  text: '#F5F5F5', // High-contrast white
  heading: '#FFFFFF',
  accent: '#4CFFB3', // Techy neon green
  secondary: '#4CC9F0', // Electric blue
  border: '#2A2A2D',
  navBg: 'rgba(15, 15, 17, 0.8)' // Translucent true black tint
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark'; // Default to dark theme
  });

  const [themeColors, setThemeColors] = useState(theme === 'light' ? lightTheme : darkTheme);

  // Apply theme to document body and save to localStorage
  useEffect(() => {
    document.body.style.backgroundColor = themeColors.background;
    document.body.style.color = themeColors.text;
    localStorage.setItem('theme', theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme, themeColors]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setThemeColors(newTheme === 'light' ? lightTheme : darkTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeColors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
