import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const TextContainer = styled.div`
  position: relative;
  display: inline-block;
  overflow: hidden;
  font-size: ${props => props.size || '2.5rem'};
  font-weight: bold;
  margin: ${props => props.margin || '0'};
`;

const TextLayer = styled.span`
  display: block;
  position: ${props => props.isBase ? 'relative' : 'absolute'};
  top: 0;
  left: 0;
  transition: transform 0.3s ease-out;
  color: ${props => props.color || 'inherit'};
  opacity: ${props => props.opacity || 1};
  mix-blend-mode: ${props => props.blendMode || 'normal'};
  transform: ${props => props.transform || 'none'};
  filter: ${props => props.filter || 'none'};
`;

const TextDistortion = ({ text, size, margin, primaryColor, secondaryColor }) => {
  const containerRef = useRef(null);
  const baseLayerRef = useRef(null);
  const topLayerRef = useRef(null);
  const bottomLayerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    const baseLayer = baseLayerRef.current;
    const topLayer = topLayerRef.current;
    const bottomLayer = bottomLayerRef.current;
    
    if (!container || !baseLayer || !topLayer || !bottomLayer) return;
    
    const handleMouseMove = (e) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      
      const mouseX = e.clientX - left;
      const mouseY = e.clientY - top;
      
      const rotateX = (mouseY / height - 0.5) * 20; // -10 to 10 degrees
      const rotateY = (mouseX / width - 0.5) * -20; // -10 to 10 degrees
      
      topLayer.style.transform = `translate3d(${rotateY * -0.3}px, ${rotateX * -0.3}px, 0) scale(1.03)`;
      bottomLayer.style.transform = `translate3d(${rotateY * 0.3}px, ${rotateX * 0.3}px, 0) scale(1.03)`;
      baseLayer.style.transform = `perspective(500px) rotateX(${rotateX * 0.5}deg) rotateY(${rotateY * 0.5}deg)`;
    };
    
    const handleMouseLeave = () => {
      topLayer.style.transform = 'translate3d(0, 0, 0) scale(1)';
      bottomLayer.style.transform = 'translate3d(0, 0, 0) scale(1)';
      baseLayer.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <TextContainer ref={containerRef} size={size} margin={margin}>
      <TextLayer 
        ref={baseLayerRef} 
        isBase={true}
      >
        {text}
      </TextLayer>
      <TextLayer 
        ref={topLayerRef} 
        color={primaryColor || '#ff6b6b'} 
        opacity={0.6}
        blendMode="screen"
        filter="blur(2px)"
      >
        {text}
      </TextLayer>
      <TextLayer 
        ref={bottomLayerRef} 
        color={secondaryColor || '#4ecdc4'} 
        opacity={0.6}
        blendMode="multiply"
        filter="blur(2px)"
      >
        {text}
      </TextLayer>
    </TextContainer>
  );
};

export default TextDistortion;
