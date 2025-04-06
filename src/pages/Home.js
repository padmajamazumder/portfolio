import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../theme/ThemeContext';
import { gsap } from 'gsap';

const HomeContainer = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const BackgroundCircle = styled(motion.div)`
  position: absolute;
  width: ${props => props.size || '300px'};
  height: ${props => props.size || '300px'};
  border-radius: 50%;
  background: linear-gradient(45deg, ${props => props.theme.primary}33, ${props => props.theme.accent}22);
  filter: blur(60px);
  z-index: 0;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
`;

const ContentWrapper = styled.div`
  z-index: 1;
  max-width: 800px;
  width: 100%;
`;

const Greeting = styled(motion.p)`
  font-family: 'Inter', sans-serif;
  color: ${props => props.theme.accent};
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const Name = styled(motion.h1)`
  font-size: 3.5rem;
  margin: 0.5rem 0;
  background: linear-gradient(135deg, ${props => props.theme.secondary}, ${props => props.theme.accent});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.text}cc;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(motion(Link))`
  background-color: ${props => props.theme.accent};
  color: white;
  padding: 0.8rem 1.8rem;
  border-radius: 30px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 15px rgba(0, 0, 0, 0.1);
  }
`;

const SecondaryButton = styled(motion(Link))`
  border: 2px solid ${props => props.theme.secondary};
  color: ${props => props.theme.text};
  padding: 0.8rem 1.8rem;
  border-radius: 30px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.theme.secondary}22;
    transform: translateY(-3px);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: ${props => props.theme.text}aa;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

const ScrollIcon = styled(motion.div)`
  font-size: 1.2rem;
`;

const AvatarContainer = styled(motion.div)`
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 2rem;
  position: relative;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, ${props => props.theme.accent}66, transparent);
    z-index: 1;
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${AvatarContainer}:hover & {
    transform: scale(1.1);
  }
`;

const MagneticText = styled.span`
  display: inline-block;
  font-weight: 700;
  color: ${props => props.theme.accent};
  cursor: default;
  transition: transform 0.3s ease;
`;

const GlitchName = styled.span`
  position: relative;
  display: inline-block;
  
  &:before, &:after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
  
  &:before {
    color: ${props => props.theme.accent};
    z-index: -1;
  }
  
  &:after {
    color: ${props => props.theme.secondary};
    z-index: -2;
  }
  
  &.glitching {
    animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
  }
  
  &.glitching:before {
    animation: glitchBefore 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
  }
  
  &.glitching:after {
    animation: glitchAfter 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
  }
  
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }
  
  @keyframes glitchBefore {
    0% { transform: translate(0); }
    20% { transform: translate(3px, -3px); }
    40% { transform: translate(3px, 3px); }
    60% { transform: translate(-3px, -3px); }
    80% { transform: translate(-3px, 3px); }
    100% { transform: translate(0); }
  }
  
  @keyframes glitchAfter {
    0% { transform: translate(0); }
    20% { transform: translate(-3px, 3px); }
    40% { transform: translate(-3px, -3px); }
    60% { transform: translate(3px, 3px); }
    80% { transform: translate(3px, -3px); }
    100% { transform: translate(0); }
  }
`;

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const nameRef = useRef(null);
  const magneticTextRef = useRef(null);
  const glitchNameRef = useRef(null);

  // Magnetic text effect
  useEffect(() => {
    const magneticElement = magneticTextRef.current;

    if (!magneticElement) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = magneticElement.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const deltaX = (e.clientX - centerX) * 0.1;
      const deltaY = (e.clientY - centerY) * 0.1;

      gsap.to(magneticElement, {
        x: deltaX,
        y: deltaY,
        duration: 0.3
      });
    };

    const handleMouseLeave = () => {
      gsap.to(magneticElement, {
        x: 0,
        y: 0,
        duration: 0.3
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    magneticElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      magneticElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Glitch effect
  useEffect(() => {
    const glitchElement = glitchNameRef.current;

    if (!glitchElement) return;

    const triggerGlitch = () => {
      glitchElement.classList.add('glitching');

      setTimeout(() => {
        glitchElement.classList.remove('glitching');
      }, 300);
    };

    const intervalId = setInterval(triggerGlitch, 5000);

    glitchElement.addEventListener('mouseenter', triggerGlitch);

    return () => {
      clearInterval(intervalId);
      glitchElement?.removeEventListener('mouseenter', triggerGlitch);
    };
  }, []);

  return (
    <HomeContainer>
      <BackgroundCircle
        size="500px"
        top="-100px"
        right="-100px"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1.5 }}
      />
      <BackgroundCircle
        size="400px"
        bottom="-50px"
        left="-100px"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />

      <ContentWrapper>
        <AvatarContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          <Avatar src="/picture.jpeg" alt="Padmaja Mazumder" />
        </AvatarContainer>

        <Greeting
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          👋 Hello, I'm
        </Greeting>

        <Name
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          ref={nameRef}
        >
          <GlitchName
            ref={glitchNameRef}
            data-text="Padmaja Mazumder"
          >
            Padmaja Mazumder
          </GlitchName>
        </Name>

        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MagneticText ref={magneticTextRef}>
            Web Developer
          </MagneticText> & Electronics Engineering Student
        </Title>

        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          I bring ideas to life with code and design, creating responsive web applications and seamless user experiences.
        </Subtitle>

        <ButtonContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <PrimaryButton
            to="/projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-code"></i> View My Work
          </PrimaryButton>
          <SecondaryButton
            to="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-envelope"></i> Contact Me
          </SecondaryButton>
        </ButtonContainer>
      </ContentWrapper>

      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.p>Scroll Down</motion.p>
        <ScrollIcon
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <i className="fas fa-chevron-down"></i>
        </ScrollIcon>
      </ScrollIndicator>
    </HomeContainer>
  );
};

export default Home;
