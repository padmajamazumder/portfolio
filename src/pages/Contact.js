import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ThemeContext } from '../theme/ThemeContext';

// Container for the entire contact page
const ContactContainer = styled.div`
  min-height: 90vh;
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Section title with glitch effect
const GlitchedSectionTitle = styled.h2`
  position: relative;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 4rem;
  color: ${props => props.theme.text};
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  
  &:before,
  &:after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.background};
  }
  
  &:before {
    left: 2px;
    text-shadow: -2px 0 ${props => props.theme.accent};
    animation: glitch-1 2s linear infinite reverse;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  }
  
  &:after {
    left: -2px;
    text-shadow: 2px 0 ${props => props.theme.accent};
    animation: glitch-2 3s linear infinite reverse;
    clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
  }
  
  @keyframes glitch-1 {
    0% { transform: translateX(0); }
    80% { transform: translateX(0); }
    85% { transform: translateX(5px); }
    90% { transform: translateX(-5px); }
    95% { transform: translateX(3px); }
    100% { transform: translateX(0); }
  }
  
  @keyframes glitch-2 {
    0% { transform: translateX(0); }
    80% { transform: translateX(0); }
    85% { transform: translateX(-5px); }
    90% { transform: translateX(5px); }
    95% { transform: translateX(-3px); }
    100% { transform: translateX(0); }
  }
`;

// Grid for all contact links
const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 2.5rem;
  width: 100%;
  max-width: 850px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 2rem;
  }
`;

// Individual link item
const ContactItem = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${props => props.theme.text};
  background-color: ${props => props.theme.cardBg};
  padding: 1.5rem;
  border-radius: 16px;
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    background-color: ${props => props.theme.accent}22;
    
    .icon {
      color: ${props => props.theme.accent};
      transform: scale(1.2);
    }
    
    .name {
      color: ${props => props.theme.accent};
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  .icon {
    transition: transform 0.3s ease, color 0.3s ease;
  }
`;

const LinkName = styled.span`
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  transition: color 0.3s ease;
  class="name"
`;

// Contact animation variants
const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Contact = () => {
  const { theme } = useContext(ThemeContext);

  // All contact links (social + email)
  const contactLinks = [
    { name: "Instagram", icon: "fab fa-instagram", url: "https://www.instagram.com/willingly_me/" },
    { name: "LinkedIn", icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/padmaja-mazumder/" },
    { name: "GitHub", icon: "fab fa-github", url: "https://github.com/padmajamazumder" },
    { name: "Discord", icon: "fab fa-discord", url: "https://discord.com/users/1189074212447600640" },
    { name: "Reddit", icon: "fab fa-reddit-alien", url: "https://www.reddit.com/user/willingly_me/" },
    { name: "Snapchat", icon: "fab fa-snapchat-ghost", url: "https://www.snapchat.com/add/willingly_me" },
    { name: "NIT Silchar Mail", icon: "fas fa-university", url: "mailto:padmajam_ug_22@ei.nits.ac.in" },
    { name: "IIT Madras Mail", icon: "fas fa-graduation-cap", url: "mailto:22f3002032@ds.study.iitm.ac.in" },
    { name: "Personal Mail", icon: "fas fa-envelope", url: "mailto:padmajamazumder@gmail.com" },
  ];

  return (
    <ContactContainer>
      <GlitchedSectionTitle data-text="Connect With Me">Connect With Me</GlitchedSectionTitle>

      <motion.div
        variants={containerAnimation}
        initial="hidden"
        animate="show"
      >
        <ContactGrid>
          {contactLinks.map((link, index) => (
            <ContactItem
              key={index}
              href={link.url}
              target={link.url.startsWith('mailto') ? '' : '_blank'}
              rel={link.url.startsWith('mailto') ? '' : 'noopener noreferrer'}
              variants={itemAnimation}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <IconWrapper>
                <i className={`${link.icon} icon`}></i>
              </IconWrapper>
              <LinkName>{link.name}</LinkName>
            </ContactItem>
          ))}
        </ContactGrid>
      </motion.div>
    </ContactContainer>
  );
};

export default Contact;
