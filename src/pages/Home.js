// This page should be rendered WITHOUT navbar or footer
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

// Full-screen container with no room for navbar/footer
const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; // Ensure it's above other content
  overflow: hidden;
`;

const CardsContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
  overflow: visible; /* Allow cards to expand outside container */
  
  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
    gap: 20px;
  }
`;

const CardWrapper = styled(motion.div)`
  position: absolute;
  width: 250px; /* Reduced from 280px */
  height: 350px; /* Reduced from 380px */
  cursor: pointer;
  perspective: 1000px;
  transform-origin: bottom center; /* Changed from bottom left to center */
  z-index: ${props => props.zIndex};
  left: calc(50% - 125px); /* Adjusted to account for new width */
  bottom: 20px;
  filter: ${props => props.isActive ? 'blur(0)' : 'blur(1px)'};
  opacity: ${props => props.isActive ? 1 : 0.8};
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  
  &:hover {
    z-index: 50;
    filter: blur(0);
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    position: relative;
    left: auto;
    bottom: auto;
    margin-bottom: 20px;
    transform: none;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const Card = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 20px;
  box-shadow: var(--shadow);
  background-color: var(--card-bg);
  overflow: hidden;
  color: var(--text-color);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transform-style: preserve-3d;
  border: 1px solid transparent;
  transition: box-shadow 0.5s ease, border-color 0.5s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--accent-color)33 0%, transparent 60%);
    z-index: 1;
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, var(--accent-color)22 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
  }
  
  ${CardWrapper}:hover & {
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2), 0 0 30px var(--accent-color)50;
    border-color: var(--accent-color)50;
    
    &::after {
      opacity: 1;
    }
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--accent-color);
  transform: translateZ(30px);
`;

const CardTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: var(--heading-color);
  transform: translateZ(20px);
`;

const CardDescription = styled.p`
  font-size: 1rem;
  opacity: 0.8;
  color: var(--subtext-color);
  transform: translateZ(15px);
`;

const Home = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [containerHovered, setContainerHovered] = useState(false);

  const handleMouseMove = (e, id) => {
    // Only apply 3D mouse tracking when container is NOT hovered
    if (hoveredCard === id && !containerHovered) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `rotate(${card.dataset.rotation}deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const handleMouseLeave = (e) => {
    const rotation = e.currentTarget.dataset.rotation || 0;
    const expandedRotation = e.currentTarget.dataset.expandedRotation || 0;
    // Use appropriate rotation based on container state
    if (containerHovered) {
      e.currentTarget.style.transform = `rotate(${expandedRotation}deg)`;
    } else {
      e.currentTarget.style.transform = `rotate(${rotation}deg)`;
    }
    setHoveredCard(null);
  };

  // Card data
  const cards = [
    {
      id: 'portfolio',
      icon: '💼',
      title: 'Portfolio',
      description: 'Explore my projects and skills',
      link: '/about'
    },
    {
      id: 'projects',
      icon: '🚀',
      title: 'Projects',
      description: 'See what I\'ve built',
      link: '/projects'
    },
    {
      id: 'diary',
      icon: '📝',
      title: 'Diary',
      description: 'Read my personal thoughts',
      link: '/diary'
    },
    {
      id: 'contact',
      icon: '✉️',
      title: 'Contact',
      description: 'Get in touch with me',
      link: '/contact'
    }
  ];

  // Calculate expanded positions for each card - more centered spread
  const expandedRotations = [-30, -10, 10, 30]; // Keep these the same
  const expandedOffsets = [-120, -40, 40, 120]; // Reduced horizontal offsets for better centering

  return (
    <FullScreenContainer>
      <ThemeToggle />
      <CardsContainer
        onMouseEnter={() => setContainerHovered(true)}
        onMouseLeave={() => setContainerHovered(false)}
      >
        {cards.map((card, index) => {
          // Calculate initial rotation for fan effect (cluttered)
          const initialRotation = index * 2; // Cards start more cluttered
          // Calculate expanded rotation (fanned out)
          const expandedRotation = expandedRotations[index];
          // Calculate z-index for layering
          const zIndex = hoveredCard === card.id ? 50 : cards.length - index;
          // Determine current rotation based on container hover state
          const currentRotation = containerHovered ? expandedRotation : initialRotation;

          return (
            <CardWrapper
              key={card.id}
              data-rotation={initialRotation}
              data-expanded-rotation={expandedRotation}
              initial={{
                opacity: 0,
                rotate: initialRotation,
                y: 50
              }}
              animate={{
                opacity: 1,
                rotate: currentRotation,
                y: containerHovered ? -20 : 0, // Lift cards up slightly when expanded
                x: containerHovered ? expandedOffsets[index] : 0, // Spread cards horizontally
                scale: containerHovered ? 1 : 0.85, // Smaller in cluttered state
                filter: containerHovered ? "blur(0px)" : "blur(1px)",
                transition: { duration: 0.5 }
              }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              zIndex={zIndex}
              isActive={hoveredCard === card.id || containerHovered}
              whileHover={{
                scale: 1.15, // Scale up more on hover
                filter: "blur(0px)",
                opacity: 1,
                y: containerHovered ? -30 : -20, // Different lift based on state
                // Remove any rotation changes when expanded
                rotate: containerHovered ? undefined : undefined,
                transition: { duration: 0.4 }
              }}
              onHoverStart={() => setHoveredCard(card.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onMouseMove={(e) => handleMouseMove(e, card.id)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotate(${currentRotation}deg) translateX(${containerHovered ? expandedOffsets[index] : 0}px)`,
                transformOrigin: 'bottom center' /* Changed from bottom left to center */
              }}
            >
              <Link to={card.link} style={{ textDecoration: 'none', width: '100%', height: '100%' }}>
                <Card
                  whileHover={{
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(97, 218, 251, 0.6)',
                  }}
                >
                  <CardIcon>{card.icon}</CardIcon>
                  <CardTitle
                    style={{
                      opacity: containerHovered ? 1 : 0.7, // More visible when expanded
                    }}
                  >
                    {card.title}
                  </CardTitle>
                  <CardDescription
                    style={{
                      opacity: containerHovered ? 0.9 : 0.5, // More visible when expanded
                    }}
                  >
                    {card.description}
                  </CardDescription>
                </Card>
              </Link>
            </CardWrapper>
          );
        })}
      </CardsContainer>
    </FullScreenContainer>
  );
};

export default Home;