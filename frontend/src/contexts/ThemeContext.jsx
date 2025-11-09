import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  purple: {
    name: 'Purple Dream',
    primary: '#6A38C2',
    primaryHover: '#5b30a6',
    secondary: '#8b5cf6',
    accent: '#F83002',
    gradient: 'from-[#6A38C2] to-[#8b5cf6]',
    bgGradient: 'from-purple-50 to-white',
    cardHover: 'hover:border-purple-300',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-[#6A38C2]',
  },
  ocean: {
    name: 'Ocean Blue',
    primary: '#0891b2',
    primaryHover: '#0e7490',
    secondary: '#06b6d4',
    accent: '#f59e0b',
    gradient: 'from-[#0891b2] to-[#06b6d4]',
    bgGradient: 'from-cyan-50 to-white',
    cardHover: 'hover:border-cyan-300',
    badgeBg: 'bg-cyan-50',
    badgeText: 'text-[#0891b2]',
  },
  sunset: {
    name: 'Sunset Orange',
    primary: '#ea580c',
    primaryHover: '#c2410c',
    secondary: '#f97316',
    accent: '#8b5cf6',
    gradient: 'from-[#ea580c] to-[#f97316]',
    bgGradient: 'from-orange-50 to-white',
    cardHover: 'hover:border-orange-300',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-[#ea580c]',
  },
  forest: {
    name: 'Forest Green',
    primary: '#059669',
    primaryHover: '#047857',
    secondary: '#10b981',
    accent: '#f59e0b',
    gradient: 'from-[#059669] to-[#10b981]',
    bgGradient: 'from-emerald-50 to-white',
    cardHover: 'hover:border-emerald-300',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-[#059669]',
  },
  rose: {
    name: 'Rose Pink',
    primary: '#e11d48',
    primaryHover: '#be123c',
    secondary: '#f43f5e',
    accent: '#8b5cf6',
    gradient: 'from-[#e11d48] to-[#f43f5e]',
    bgGradient: 'from-rose-50 to-white',
    cardHover: 'hover:border-rose-300',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-[#e11d48]',
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('jobportal-theme') || 'purple';
  });

  useEffect(() => {
    localStorage.setItem('jobportal-theme', currentTheme);
  }, [currentTheme]);

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, setCurrentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
