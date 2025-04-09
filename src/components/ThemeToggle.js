import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Standalone toggle positioned in top-right corner
const ToggleButton = styled(motion.button)`
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.isDark ? 'rgba(123, 143, 109, 0.2)' : 'rgba(224, 207, 193, 0.3)'};
  border: none;
  color: ${props => props.isDark ? '#7B8F6D' : '#8C6253'};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9999;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: rotate(15deg) scale(1.1);
    box-shadow: 0 6px 10px rgba(0,0,0,0.2);
    background: ${props => props.isDark ? 'rgba(169, 185, 162, 0.3)' : 'rgba(214, 191, 165, 0.4)'};
  }
`;

const IconContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ThemeToggle = () => {
    // Initialize with localStorage or default to dark
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme ? savedTheme === 'dark' : true;
    });

    // Apply theme effect
    useEffect(() => {
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

        // Apply the theme colors directly to the root element for immediate effect
        if (isDark) {
            // Dark mode colors
            document.documentElement.style.setProperty('--bg-color', '#1A1A1E');
            document.documentElement.style.setProperty('--card-bg', '#495A3C');
            document.documentElement.style.setProperty('--text-color', '#EAEAEA');
            document.documentElement.style.setProperty('--heading-color', '#5D6D7E');
            document.documentElement.style.setProperty('--accent-color', '#7B8F6D');
            document.documentElement.style.setProperty('--secondary-color', '#B26A5A');
            document.documentElement.style.setProperty('--border-color', '#2F2F30');
            document.documentElement.style.setProperty('--button-color', '#59684C');
            document.documentElement.style.setProperty('--highlight-color', '#404B69');
            document.documentElement.style.setProperty('--hover-bg', '#A9B9A2');
            document.documentElement.style.setProperty('--subtext-color', '#A6A6A6');
            document.documentElement.style.setProperty('--shadow', '0 4px 6px rgba(0, 0, 0, 0.3)');

            document.body.style.backgroundColor = '#1A1A1E';
            document.body.style.color = '#EAEAEA';
        } else {
            // Light mode colors
            document.documentElement.style.setProperty('--bg-color', '#F5F1ED');
            document.documentElement.style.setProperty('--card-bg', '#E0CFC1');
            document.documentElement.style.setProperty('--text-color', '#2A2A2A');
            document.documentElement.style.setProperty('--heading-color', '#5D6D7E');
            document.documentElement.style.setProperty('--accent-color', '#7B8F6D');
            document.documentElement.style.setProperty('--secondary-color', '#404B69');
            document.documentElement.style.setProperty('--border-color', '#D6BFA5');
            document.documentElement.style.setProperty('--button-color', '#7B8F6D');
            document.documentElement.style.setProperty('--highlight-color', '#404B69');
            document.documentElement.style.setProperty('--hover-bg', '#D6BFA5');
            document.documentElement.style.setProperty('--subtext-color', '#8C6253');
            document.documentElement.style.setProperty('--shadow', '0 4px 6px rgba(0, 0, 0, 0.1)');

            document.body.style.backgroundColor = '#F5F1ED';
            document.body.style.color = '#2A2A2A';
        }

        // Store preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <ToggleButton
            isDark={isDark}
            onClick={() => setIsDark(!isDark)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
        >
            <IconContainer
                initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                key={isDark ? 'dark' : 'light'}
            >
                {isDark ? '☀️' : '🌙'}
            </IconContainer>
        </ToggleButton>
    );
};

export default ThemeToggle;
