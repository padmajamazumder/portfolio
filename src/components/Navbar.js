import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ThemeContext } from '../theme/ThemeContext';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2.5rem;
  background-color: ${props => props.theme.navBg};
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
`;

const Logo = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.accent};
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.text};
  font-weight: 500;
  position: relative;
  transition: all 0.3s ease;
  
  &:after {
    content: '';
    position: absolute;
    width: ${props => (props.active ? '100%' : '0')};
    height: 2px;
    bottom: -5px;
    left: 0;
    background-color: ${props => props.theme.accent};
    transition: all 0.3s ease;
  }
  
  &:hover {
    color: ${props => props.theme.accent};
    
    &:after {
      width: 100%;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  
  &:hover {
    color: ${props => props.theme.accent};
    transform: rotate(30deg);
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${props => props.theme.accent}20;
    transform: scale(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scale(1);
  }
`;

const ThemeToggleIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  height: 100vh;
  background-color: ${props => props.theme.cardBg};
  padding: 2rem;
  z-index: 200;
  box-shadow: -2px 0 10px rgba(0,0,0,0.1);
`;

const MobileMenuItem = styled(Link)`
  color: ${props => props.theme.text};
  font-weight: 500;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.background};
  
  &:hover {
    color: ${props => props.theme.accent};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: 2rem;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 150;
`;

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <Nav>
        <Logo to="/">PM</Logo>
        <NavLinks>
          <StyledLink to="/" active={location.pathname === '/' ? 1 : 0}>Home</StyledLink>
          <StyledLink to="/about" active={location.pathname === '/about' ? 1 : 0}>About</StyledLink>
          <StyledLink to="/projects" active={location.pathname === '/projects' ? 1 : 0}>Projects</StyledLink>
          <StyledLink to="/contact" active={location.pathname === '/contact' ? 1 : 0}>Contact</StyledLink>
          <StyledLink to="/resume" active={location.pathname === '/resume' ? 1 : 0}>Resume</StyledLink>
        </NavLinks>

        <RightSection>
          <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
            <ThemeToggleIcon
              initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              key={theme}
            >
              {theme === 'dark' ? (
                <i className="fas fa-sun"></i>
              ) : (
                <i className="fas fa-moon"></i>
              )}
            </ThemeToggleIcon>
          </ThemeToggle>
          <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
            <i className="fas fa-bars"></i>
          </MobileMenuButton>
        </RightSection>
      </Nav>

      {mobileMenuOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <MobileMenu
        initial={{ x: '100%' }}
        animate={{ x: mobileMenuOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <CloseButton onClick={() => setMobileMenuOpen(false)}>
          <i className="fas fa-times"></i>
        </CloseButton>
        <MobileMenuItem to="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileMenuItem>
        <MobileMenuItem to="/about" onClick={() => setMobileMenuOpen(false)}>About</MobileMenuItem>
        <MobileMenuItem to="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</MobileMenuItem>
        <MobileMenuItem to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</MobileMenuItem>
        <MobileMenuItem to="/resume" onClick={() => setMobileMenuOpen(false)}>Resume</MobileMenuItem>
      </MobileMenu>
    </>
  );
};

export default Navbar;
