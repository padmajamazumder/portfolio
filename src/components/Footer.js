import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  padding: 2rem;
  background-color: ${props => props.theme.navBg};
  color: ${props => props.theme.text};
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FooterLogo = styled(Link)`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.accent};
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 1rem 0;
`;

const SocialLink = styled(motion.a)`
  color: ${props => props.theme.text};
  font-size: 1.5rem;
  
  &:hover {
    color: ${props => props.theme.accent};
  }
`;

const FooterNav = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1.5rem 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.text};
  font-weight: 500;
  
  &:hover {
    color: ${props => props.theme.accent};
  }
`;

const Copyright = styled.p`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.text}aa;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterContent>
                <FooterLogo to="/">Padmaja Mazumder</FooterLogo>

                <SocialLinks>
                    <SocialLink
                        href="https://www.linkedin.com/in/padmaja-mazumder/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5 }}
                    >
                        <i className="fab fa-linkedin"></i>
                    </SocialLink>
                    <SocialLink
                        href="https://github.com/padmajamazumder"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5 }}
                    >
                        <i className="fab fa-github"></i>
                    </SocialLink>
                    <SocialLink
                        href="mailto:padmajamazumder@gmail.com"
                        whileHover={{ y: -5 }}
                    >
                        <i className="far fa-envelope"></i>
                    </SocialLink>
                </SocialLinks>

                <FooterNav>
                    <FooterLink to="/">Home</FooterLink>
                    <FooterLink to="/about">About</FooterLink>
                    <FooterLink to="/projects">Projects</FooterLink>
                    <FooterLink to="/contact">Contact</FooterLink>
                    <FooterLink to="/resume">Resume</FooterLink>
                </FooterNav>

                <Copyright>© {new Date().getFullYear()} Padmaja Mazumder. All rights reserved.</Copyright>
            </FooterContent>
        </FooterContainer>
    );
};

export default Footer;
