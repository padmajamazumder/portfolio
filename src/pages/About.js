import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const AboutContainer = styled.div`
  min-height: 90vh;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-size: 1.1rem; /* Increased base font size */
  
  @media (max-width: 768px) {
    padding: 4rem 2rem;
    font-size: 1rem; /* Slightly smaller on mobile */
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: var(--accent-color, #61dafb);
  }
`;

// Add these new styled components for the section titles with effects
const GlitchedSectionTitle = styled.h2`
  position: relative;
  font-size: 3rem; /* Increased from 2.5rem */
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--text-color);
  text-transform: uppercase;
  letter-spacing: 2px;
  
  &:before,
  &:after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-color);
  }
  
  &:before {
    left: 2px;
    text-shadow: -2px 0 var(--accent-color);
    animation: glitch-1 2s linear infinite reverse;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  }
  
  &:after {
    left: -2px;
    text-shadow: 2px 0 var(--accent-color);
    animation: glitch-2 3s linear infinite reverse;
    clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
  }
  
  @keyframes glitch-1 {
    0% {
      transform: translateX(0);
    }
    80% {
      transform: translateX(0);
    }
    85% {
      transform: translateX(5px);
    }
    90% {
      transform: translateX(-5px);
    }
    95% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }
  
  @keyframes glitch-2 {
    0% {
      transform: translateX(0);
    }
    80% {
      transform: translateX(0);
    }
    85% {
      transform: translateX(-5px);
    }
    90% {
      transform: translateX(5px);
    }
    95% {
      transform: translateX(-3px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

// Particle Letter component for letter dispersion effect
const ParticleContainer = styled(motion.div)`
  display: inline-block;
  margin-bottom: 2rem;
`;

const ParticleLetter = styled(motion.span)`
  display: inline-block;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  text-transform: uppercase;
  margin: 0 2px;
  
  &:hover {
    scale: 1.2,
    rotate: Math.random() * 30 - 15,
    color: var(--accent-color),
    transition: { duration: 0.2 }
  }
`;

// SectionTitleContainer to hold the title
const SectionTitleContainer = styled.div`
  margin: 3rem 0 1rem;
  text-align: center;
  overflow: hidden;
`;

// Function component for particle text effect
const ParticleText = ({ text, delay = 0 }) => {
  return (
    <ParticleContainer
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay
          }
        }
      }}
    >
      {text.split("").map((char, index) => (
        <ParticleLetter
          key={index}
          variants={{
            hidden: {
              opacity: 0,
              y: 50,
              rotate: -10,
              scale: 0.5
            },
            visible: {
              opacity: 1,
              y: 0,
              rotate: 0,
              scale: 1,
              transition: {
                type: "spring",
                damping: 10,
                stiffness: 100
              }
            }
          }}
          whileHover={{
            scale: 1.2,
            rotate: Math.random() * 30 - 15,
            color: "#61dafb",
            transition: { duration: 0.2 }
          }}
        >
          {char === " " ? "\u00A0" : char}
        </ParticleLetter>
      ))}
    </ParticleContainer>
  );
};

// Introduction Section with Typewriter Effect
const IntroSection = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const AvatarContainer = styled(motion.div)`
  flex-shrink: 0;
  width: 280px;
  height: 280px;
  position: relative;
  
  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
`;

const AvatarImage = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--accent-color-transparent, rgba(97, 218, 251, 0.2));
  border: 3px solid var(--accent-color);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  color: var(--accent-color);
  background-image: url('/avatar.png');
  background-size: cover;
  background-position: center;
  
  &:before {
    content: '👩‍💻';
    display: ${props => props.noImage ? 'block' : 'none'};
  }
`;

const AvatarBubble = styled(motion.div)`
  position: absolute;
  background-color: var(--accent-color);
  color: var(--bg-color);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  
  &:after {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: var(--accent-color);
    transform: rotate(45deg);
  }
  
  ${props => {
    if (props.position === 'top') {
      return `
        top: 10px;
        right: 20px;
        &:after {
          bottom: -5px;
          left: 20px;
        }
      `;
    }
    if (props.position === 'left') {
      return `
        left: -20px;
        top: 50%;
        transform: translateY(-50%);
        &:after {
          right: -5px;
          top: 40%;
        }
      `;
    }
    if (props.position === 'right') {
      return `
        right: -20px;
        top: 40%;
        &:after {
          left: -5px;
          top: 40%;
        }
      `;
    }
    return `
      bottom: 10px;
      left: 30px;
      &:after {
        top: -5px;
        right: 20px;
      }
    `;
  }}
`;

const IntroContent = styled.div`
  flex-grow: 1;
`;

const TypewriterText = styled(motion.div)`
  min-height: 8rem;
  font-size: 1.3rem; /* Increased from 1.2rem */
  line-height: 1.8;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: var(--text-color);
  margin-left: 2px;
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

// Skills Section with Interactive Elements
const SkillsSection = styled(motion.section)`
  margin-top: 3rem;
  margin-bottom: 4rem;
`;

const SkillsCategoryTabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const CategoryTab = styled.button`
  background-color: ${props => props.active ? 'var(--accent-color)' : 'transparent'};
  color: ${props => props.active ? 'var(--bg-color)' : 'var(--text-color)'};
  border: 1px solid ${props => props.active ? 'var(--accent-color)' : 'var(--text-color-muted, rgba(75, 75, 75, 0.5))'};
  padding: 0.5rem 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--accent-color);
    color: ${props => !props.active && 'var(--accent-color)'};
  }
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1.5rem;
`;

const SkillItem = styled(motion.div)`
  background-color: var(--card-bg);
  padding: 1.2rem; /* Increased from 1rem */
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, var(--accent-color-transparent, rgba(97, 218, 251, 0.2)) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    border-color: var(--accent-color);
    
    &:before {
      opacity: 1;
    }
  }
`;

const SkillIcon = styled.div`
  font-size: 2rem; /* Increased from 1.8rem */
  margin-bottom: 0.6rem; /* Adjusted from 0.5rem */
  color: var(--accent-color);
  position: relative;
  z-index: 1;
`;

const SkillName = styled.h4`
  margin: 0;
  font-size: 1rem; /* Increased from 0.9rem */
  position: relative;
  z-index: 1;
`;

const SkillLevel = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  height: 4px;
  background-color: var(--bg-color);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

const SkillLevelFill = styled.div`
  height: 100%;
  width: ${props => props.level}%;
  background-color: var(--accent-color);
  border-radius: 2px;
`;

// Experience Timeline Section
const ExperienceSection = styled(motion.section)`
  margin-top: 4rem;
`;

const TimelineView = styled.div`
  position: relative;
  margin-left: 1.5rem;
  padding-left: 2rem;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background-color: var(--accent-color-transparent, rgba(97, 218, 251, 0.4));
  }
`;

const TimelineItem = styled(motion.div)`
  margin-bottom: 2.5rem;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: var(--accent-color);
    left: -2.6rem;
    top: 0.5rem;
    box-shadow: 0 0 0 4px var(--accent-color-transparent, rgba(97, 218, 251, 0.2));
  }
`;

const ExperienceCard = styled(motion.div)`
  background-color: var(--card-bg);
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  cursor: pointer;
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.expanded ? '1rem' : '0'};
`;

const ExperienceHeaderLeft = styled.div``;

const JobTitle = styled.h3`
  font-size: 1.5rem; /* Increased from 1.3rem */
  margin-bottom: 0.5rem;
`;

const Company = styled.h4`
  font-size: 1.2rem; /* Increased from 1.1rem */
  color: var(--text-color-muted, rgba(75, 75, 75, 0.7));
  margin-bottom: 0.3rem;
`;

const Period = styled.p`
  font-style: italic;
  color: var(--text-color-muted, rgba(75, 75, 75, 0.5));
  margin: 0;
  font-size: 0.9rem;
`;

const ExperienceToggle = styled.button`
  background: none;
  border: none;
  color: var(--accent-color);
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  transform: ${props => props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const ExperienceContent = styled(motion.div)`
  margin-top: 1rem;
`;

const Description = styled.p`
  line-height: 1.7; /* Increased from 1.6 */
  margin-bottom: 1rem;
  font-size: 1.1rem; /* Added explicit font size */
  color: var(--text-color); // Explicitly set text color to ensure visibility in all themes
`;

const TechStack = styled.div`
  margin-top: 1rem;
`;

const TechBadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const TechBadge = styled.span`
  background-color: var(--bg-color-secondary, rgba(240, 240, 240, 0.5));
  padding: 0.3rem 0.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

// Education & Other Sections
const EducationContainer = styled(motion.div)`
  margin-top: 3rem;
`;

const PositionsContainer = styled(motion.div)`
  margin-top: 3rem;
`;

const ExtracurricularsContainer = styled(motion.div)`
  margin-top: 3rem;
`;

// Add these new styled components near your other styled components
const SectionContent = styled(motion.div)`
  margin-top: 1.5rem;
  line-height: 1.6;
`;

const ContentItem = styled.div`
  background-color: var(--card-bg);
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

// Add this new styled component with the existing styled components
const CertificationsContainer = styled(motion.div)`
  margin-top: 3rem;
`;

const CertificationItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background-color: var(--card-bg);
  border-radius: 8px;
  margin-bottom: 0.8rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const CertificationTitle = styled.div`
  font-weight: 500;
`;

const ViewDocumentLink = styled.a`
  display: flex;
  align-items: center;
  color: var(--text-color); /* Changed from accent color to text color for better visibility */
  gap: 0.5rem;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
    color: var(--accent-color); /* Keep accent color only on hover for interaction feedback */
  }
`;

// Carousel card styles
const CarouselContainer = styled.div`
  margin: 2rem 0;
  
  .swiper {
    padding: 1.5rem 0;
  }
  
  .swiper-pagination {
    bottom: 0;
  }
`;

// Update CarouselCard to handle background images with overlay
const CarouselCard = styled(motion.div)`
  background-color: var(--card-bg);
  background-image: ${props => props.backgroundImage ? `url(${props.backgroundImage})` : 'none'};
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  height: 250px; /* Reduced from 300px */
  position: relative;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
              box-shadow 0.4s ease;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 30px rgba(0,0,0,0.15), 
                0 0 15px var(--accent-color-transparent, rgba(97, 218, 251, 0.5)),
                0 0 5px var(--accent-color-transparent, rgba(97, 218, 251, 0.5));
  }
  
  // Dark overlay to ensure text readability over images
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.backgroundImage ? 'rgba(0,0,0,0.6)' : 'transparent'}; // Adjust opacity here (0.6)
    z-index: 1;
  }
`;

// Update CardOverlay to always display content (not on hover)
const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${props => props.backgroundImage ?
    'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.4) 85%, transparent 100%)' :
    `linear-gradient(
      to top, 
      var(--card-bg) 60%, 
      var(--card-bg-transparent, rgba(255, 255, 255, 0.9)) 80%, 
      transparent
    )`};
  padding: 1.5rem;
  transform: translateY(0); /* Always visible */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 2;
`;

// Update CardTitle to use appropriate colors for better visibility in all themes
const CardTitle = styled.h4`
  margin: 0 0 0.5rem;
  font-size: 1.4rem; /* Increased from 1.25rem */
  font-weight: 600;
  transform: translateY(0); /* Always visible */
  text-shadow: ${props => props.backgroundImage ? '0 2px 4px rgba(0,0,0,0.5)' : 'none'};
  color: ${props => props.backgroundImage ? '#fff' : 'var(--text-color)'};
`;

// Update CardContent to always be visible
const CardContent = styled.div`
  opacity: 1; /* Always visible */
  transform: translateY(0); /* Always visible */
  overflow-y: auto;
  max-height: 200px;
  padding-right: 5px;
  font-weight: ${props => props.backgroundImage ? '500' : '400'};
  font-size: 1.05rem; /* Added explicit font size */
  line-height: 1.6;
  color: ${props => props.backgroundImage ? '#fff' : 'var(--text-color)'};
  text-shadow: ${props => props.backgroundImage ? '0 1px 2px rgba(0,0,0,0.4)' : 'none'};
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: var(--accent-color);
    border-radius: 4px;
  }
`;

// Add this temporary styled component to replace Swiper until installed
const TempCarouselGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); /* Reduced from 280px */
  gap: 1.2rem; /* Reduced from 1.5rem */
  margin: 2rem 0;
`;

// Add these specialized components for compact cards
const CompactCarouselGrid = styled(TempCarouselGrid)`
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); /* Adjusted from 320px */
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CompactCard = styled(CarouselCard)`
  height: 160px; /* Adjusted from 180px */
  
  &:hover {
    transform: translateY(-5px) scale(1.01); /* Smaller animation */
  }
`;

const CompactCardOverlay = styled(CardOverlay)`
  transform: translateY(0); /* Always visible */
  padding: 1rem;
`;

const CompactCardContent = styled(CardContent)`
  max-height: 80px; /* Reduced from 100px */
  opacity: 1; /* Always visible */
  font-size: 1rem; /* Explicit font size */
`;

const About = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('all');
  const [expandedExperience, setExpandedExperience] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);

  // Add refs for scrolling to sections
  const aboutMeRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const positionsRef = useRef(null);
  const extracurricularsRef = useRef(null);
  const certificationsRef = useRef(null);

  // Add state for active section - remove hoveredCard state
  const [activeSection, setActiveSection] = useState('about');

  // Function to scroll to a section
  const scrollToSection = (sectionRef, sectionName) => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionName);
  };

  // Text content for typewriter animation
  const aboutMeText = "I'm a passionate web developer and engineering student with expertise in creating responsive and user-friendly web applications. Currently pursuing dual degrees in Electronics and Instrumentation Engineering at NIT Silchar and Data Science and Applications at IIT Madras, I combine technical knowledge with practical development skills to build innovative solutions.";

  // Education content
  const educationContent = [
    {
      institution: "NIT S",
      description: "B.Tech in Electronics and Instrumentation Engineering at National Institute of Technology, Silchar (2022-2026).",
      image: "/nits.png" // Updated to use the NITS image
    },
    {
      institution: "IIT M",
      description: "B.S in Data Science and Applications at Indian Institute of Technology, Madras (2022-2026).",
      image: "/iitm.png"
    },
    {
      institution: "RPS",
      description: "Higher secondary PCM+B (AISSCE) at Rajdhani Public School, Assam (2020-2022).",
      image: "/rps.png"
    },
    {
      institution: "PVM",
      description: "Schooling +cs (AISSE) at Pranabananda Vidyamandir, Assam (2008-2020).",
      image: "/pvm.png"
    }
  ];

  // Position content with descriptive titles
  const positionsContent = [
    {
      title: "GDSC Core Executive",
      content: "🌟 At Google Developer Student Club '25, I'm a Core Executive of Cloud Team and Senior Marketing Executive. I managed club orientation, interviewed 58 juniors, and contributed to projects like Efficacy."
    },
    {
      title: "GDSC jr. member",
      content: "🔍 I organized Web Blitz 4.0 (40+ attendees), Prototype Plenary 4.0 on Figma (55+ attendees), and led a Git/GitHub workshop (25+ attendees)."
    },
    {
      title: "Illuminits Executive",
      content: "📝 At Illuminits, I'm a Junior Executive in the Marketing Team, coordinating events like Graffiti (30+ participants) and Literary Premier League (60+ attendees)."
    },
    {
      title: "Cultural Coordinator",
      content: "🎭 I've actively participated in Deprador, Kaladarshan, and conducted multiple debates with over 25 attendees."
    },
    {
      title: "Marketing Roles",
      content: "🎯 Other roles include Marketing Executive positions at Incandescence, Senior Marketing Executive at POSUA and Oikyotaan."
    },
    {
      title: "Social Service",
      content: "🤝 I'm a member of Gyansagar Social Service Wing and part of Think India NITS Students Fraternity's Empowering Minds initiative."
    },
    {
      title: "IITM White Hat Guild",
      content: "💻 At IIT Madras, I'm a Core Executive of White Hat Guild (Remote)."
    },
    {
      title: "Sundarbans House IITM",
      content: "🔧 I also serve as a Technical Team Member of Sundarbans House IITM BS Degree (Remote)."
    }
  ];

  // Extracurricular content with descriptive titles
  const extracurricularContent = [
    {
      title: "Dance",
      content: "🎵 I'm trained in Ravindra nritya and Nazrul nritya dance forms."
    },
    {
      title: "Classical Music",
      content: "🎼 I've studied Classical Music (Bhatkhande)"
    },
    {
      title: "Instrumental",
      content: "🎸 also trained in spanish guitar"
    }
  ];

  // Certification data - Add this with the other data arrays
  const certificationsData = [
    { name: "Google Cloud Skills Boost", link: "https://www.cloudskillsboost.google/public_profiles/658f7312-733c-4a2e-ad36-13bd1e554594" },
    { name: "Gen AI Study Jams", link: "https://www.cloudskillsboost.google/public_profiles/210f6064-c521-47c2-8a0f-163a700777f2" },
    { name: "Social Summer Of Code", link: "https://drive.google.com/file/d/1_m6VnHB_Aj65BsZKHofAy-hD7DBNKvOD/view?usp=drive_link" },
    { name: "Diploma in Programming", link: "https://drive.google.com/file/d/1ku3uQMmibivFuemHvPpmV8Qg7bCny2lJ/view?usp=sharing" },
    { name: "Foundation in Data Science", link: "https://drive.google.com/file/d/1gAoKPJhoM7PrgCpuGDhyUxQaXxYnDUpq/view?usp=sharing" },
    { name: "Intern at TeccGadgets", link: "https://drive.google.com/file/d/1TYPMvKZEqPf1Lz_mN3zrNCnUEXN-LA4V/view?usp=drive_link" },
    { name: "Cloud Computing Intern", link: "https://drive.google.com/file/d/1Ajx48EfallOwaUbOMhey1380rz7bTTNq/view?usp=sharing" },
    { name: "Robotics Workshop by IEEE", link: "https://drive.google.com/file/d/1V6OOtP4GJptjrCDw3kyzOBuAaGNninXx/view?usp=sharing" },
    { name: "Drone Workshop by MEITY", link: "https://drive.google.com/file/d/1oHFTMdHse0iSpm0yHRFpnqDbSvkl2eLh/view?usp=sharing" },
    { name: "Indian Oil Corporation Limited trainee", link: "https://drive.google.com/file/d/1Id0y09xxyGjZpm2FQzL4fOYhY4ReXU_T/view?usp=sharing" }
  ];

  // Skills data organized by category
  const skillsData = {
    frontend: [
      { name: 'React', icon: 'fab fa-react', level: 63 },
      { name: 'JavaScript', icon: 'fab fa-js', level: 75 },
      { name: 'HTML5', icon: 'fab fa-html5', level: 95 },
      { name: 'CSS3', icon: 'fab fa-css3-alt', level: 95 },
      { name: 'TailwindCSS', icon: 'fas fa-wind', level: 90 },
      { name: 'Bootstrap', icon: 'fab fa-bootstrap', level: 95 },
      { name: 'Flutter', icon: 'fas fa-mobile-alt', level: 40 }
    ],
    backend: [
      { name: 'Node.js', icon: 'fab fa-node-js', level: 65 },
      { name: 'Express', icon: 'fas fa-server', level: 65 },
      { name: 'Flask', icon: 'fab fa-python', level: 85 },
      { name: 'MongoDB', icon: 'fas fa-database', level: 75 },
      { name: 'Redis', icon: 'fas fa-database', level: 50 },
      { name: 'Prisma', icon: 'fas fa-database', level: 50 },
      { name: 'SQL', icon: 'fas fa-database', level: 85 }
    ],
    languages: [
      { name: 'C/C++', icon: 'fas fa-code', level: 90 },
      { name: 'Python', icon: 'fab fa-python', level: 85 },
      { name: 'Dart', icon: 'fas fa-code', level: 30 }
    ],
    tools: [
      { name: 'Git', icon: 'fab fa-git-alt', level: 75 },
      { name: 'AWS', icon: 'fab fa-aws', level: 40 },
      { name: 'Canva', icon: 'fas fa-palette', level: 90 },
      { name: 'Figma', icon: 'fab fa-figma', level: 75 }
    ]
  };

  // Work experience data with enhanced details
  const experienceData = [
    {
      id: 1,
      title: "SellSphere AdXchange Project",
      company: "IIT Madras",
      period: "May 2024 - August 2024 (Remote)",
      description: "Automated campaign management and ad requests, reducing manual effort and facilitating targeted promotions and monetization.",
      details: "Created collaboration opportunities between brands and influencers. Increased brand visibility while doubling influencer earnings. Implemented an admin panel for monitoring and flagging, creating a safer, fraud-free environment.",
      image: "/mad1.png",
      techStack: ["Flask", "SQLAlchemy", "SQLite", "HTML", "CSS", "ChartJS", "Jinja2", "Flask-Login"]
    },
    {
      id: 2,
      title: "Nanolink Project",
      company: "Google Developer Student Club",
      period: "August 2023 - August 2024 (Silchar, India)",
      description: "Streamlined the process of sharing lengthy URLs across different communication platforms, enhancing information distribution for over 500 students and faculty.",
      details: "Increased engagement with shared content on social platforms by 25% by reducing link clutter and improving user experience. Implemented analytics for tracking link performance and user engagement.",
      techStack: ["HTML", "CSS", "JavaScript", "Bootstrap", "NodeJS", "ExpressJS", "MongoDB", "Prisma", "Git", "AWS"]
    },
    {
      id: 3,
      title: "Industrial Training Intern",
      company: "Indian Oil Corporation Limited (IOCL)",
      period: "Summer 2023 (Guwahati, Assam)",
      description: "Worked in the Thermal Power Station (TPS) at IOCL, Guwahati Refinery, as part of industrial training program focusing on Process Control Engineering.",
      details: "Conducted a comprehensive study on the functioning of DCS & PLC in refinery operations. Gained hands-on understanding of controllers used in process automation for critical refinery units. Learned about instrumentation, control loops, and safety interlocks in large-scale industrial plants.",
      techStack: ["DCS", "PLC", "Process Control Systems", "Instrumentation", "Sensors & Actuators", "Safety Interlocks"],
      projectInfo: "A Study on the Functioning of DCS & PLC of TPS at Guwahati Refinery",
      projectGuide: "Shri Madhurjya Pegu, Assistant Manager (Instrumentation), IOCL",
      certificateLink: "https://drive.google.com/file/d/1Id0y09xxyGjZpm2FQzL4fOYhY4ReXU_T/view?usp=sharing"
    }
  ];

  // Typewriter effect for About Me text
  useEffect(() => {
    if (currentIndex < aboutMeText.length) {
      const timer = setTimeout(() => {
        setDisplayText(aboutMeText.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30); // Speed of typing
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  // Toggle experience card expansion
  const toggleExperience = (id) => {
    setExpandedExperience(expandedExperience === id ? null : id);
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Filter skills based on selected category
  const filteredSkills = selectedSkillCategory === 'all'
    ? [...skillsData.frontend, ...skillsData.backend, ...skillsData.languages, ...skillsData.tools]
    : skillsData[selectedSkillCategory];

  return (
    <AboutContainer>
      <ThemeToggle /> {/* Add ThemeToggle component */}
      <div ref={aboutMeRef}>
        <SectionTitleContainer>
          <GlitchedSectionTitle data-text="About Me">About Me</GlitchedSectionTitle>
        </SectionTitleContainer>

        {/* Only typewriter effect bio */}
        <IntroSection
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AvatarContainer
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Update image styling and remove the unnecessary background image styles */}
            <AvatarImage noImage={false} style={{ overflow: 'hidden' }}>
              <img
                src="/pic.jpeg"
                alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%'
                }}
              />
            </AvatarImage>
            <AnimatePresence>
              {currentIndex > aboutMeText.length * 0.3 && (
                <AvatarBubble
                  position="top"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  Hello there! 👋
                </AvatarBubble>
              )}
              {currentIndex > aboutMeText.length * 0.6 && (
                <AvatarBubble
                  position="right"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.2 }}
                  as={Link}
                  to="/contact"
                  clickable={true}
                >
                  get in touch !!
                </AvatarBubble>
              )}
            </AnimatePresence>
          </AvatarContainer>
          <IntroContent>
            <TypewriterText>
              {displayText}
              <Cursor />
            </TypewriterText>
          </IntroContent>
        </IntroSection>
      </div>

      {/* Skills Section with Categories and Interactive Elements */}
      <div ref={skillsRef}>
        <SectionTitleContainer>
          <GlitchedSectionTitle data-text="Skills">Skills</GlitchedSectionTitle>
        </SectionTitleContainer>
        <SkillsSection
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SkillsCategoryTabs>
            <CategoryTab
              active={selectedSkillCategory === 'all'}
              onClick={() => setSelectedSkillCategory('all')}
            >
              All Skills
            </CategoryTab>
            <CategoryTab
              active={selectedSkillCategory === 'frontend'}
              onClick={() => setSelectedSkillCategory('frontend')}
            >
              Frontend
            </CategoryTab>
            <CategoryTab
              active={selectedSkillCategory === 'backend'}
              onClick={() => setSelectedSkillCategory('backend')}
            >
              Backend
            </CategoryTab>
            <CategoryTab
              active={selectedSkillCategory === 'languages'}
              onClick={() => setSelectedSkillCategory('languages')}
            >
              Languages
            </CategoryTab>
            <CategoryTab
              active={selectedSkillCategory === 'tools'}
              onClick={() => setSelectedSkillCategory('tools')}
            >
              Tools
            </CategoryTab>
          </SkillsCategoryTabs>
          <SkillsGrid>
            <AnimatePresence>
              {filteredSkills.map((skill, index) => (
                <SkillItem
                  key={`${skill.name}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{
                    y: -8,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    borderColor: '#61dafb'
                  }}
                >
                  <SkillIcon>
                    <i className={skill.icon}></i>
                  </SkillIcon>
                  <SkillName>{skill.name}</SkillName>
                  <SkillLevel>
                    <SkillLevelFill level={skill.level} />
                  </SkillLevel>
                </SkillItem>
              ))}
            </AnimatePresence>
          </SkillsGrid>
        </SkillsSection>
      </div>

      {/* Experience Section with Timeline View */}
      <div ref={experienceRef}>
        <SectionTitleContainer>
          <GlitchedSectionTitle data-text="Work Experience">Work Experience</GlitchedSectionTitle>
        </SectionTitleContainer>
        <ExperienceSection
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <TimelineView>
            {experienceData.map((exp, index) => (
              <TimelineItem
                key={exp.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
              >
                <ExperienceCard onClick={() => toggleExperience(exp.id)}>
                  <ExperienceHeader expanded={expandedExperience === exp.id}>
                    <ExperienceHeaderLeft>
                      <JobTitle>{exp.title}</JobTitle>
                      <Company>{exp.company}</Company>
                      <Period>{exp.period}</Period>
                    </ExperienceHeaderLeft>
                    <ExperienceToggle
                      expanded={expandedExperience === exp.id}
                    >
                      <i className="fas fa-chevron-down"></i>
                    </ExperienceToggle>
                  </ExperienceHeader>
                  <AnimatePresence>
                    {expandedExperience === exp.id && (
                      <ExperienceContent
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {exp.image && (
                          <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                            <img
                              src={exp.image}
                              alt={exp.title}
                              style={{
                                maxWidth: '100%',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                              }}
                            />
                          </div>
                        )}
                        <Description>
                          {exp.description}
                        </Description>
                        <Description>
                          {exp.details}
                        </Description>
                        {/* Add project information if available */}
                        {exp.projectInfo && (
                          <Description>
                            <strong>📌 Project:</strong> "{exp.projectInfo}"<br />
                            {exp.projectGuide && <><strong>👨‍🏫 Guide:</strong> {exp.projectGuide}<br /></>}
                            {exp.certificateLink && (
                              <ViewDocumentLink href={exp.certificateLink} target="_blank" rel="noopener noreferrer">
                                <i className="fas fa-file-alt"></i> View Certificate
                              </ViewDocumentLink>
                            )}
                          </Description>
                        )}

                        <TechStack>
                          <h4>Technologies Used:</h4>
                          <TechBadgesContainer>
                            {exp.techStack.map(tech => (
                              <TechBadge key={tech}>
                                <i className={
                                  tech.toLowerCase().includes('react') ? 'fab fa-react' :
                                    tech.toLowerCase().includes('node') ? 'fab fa-node-js' :
                                      tech.toLowerCase().includes('html') ? 'fab fa-html5' :
                                        tech.toLowerCase().includes('css') ? 'fab fa-css3-alt' :
                                          tech.toLowerCase().includes('js') ? 'fab fa-js' :
                                            tech.toLowerCase().includes('aws') ? 'fab fa-aws' :
                                              tech.toLowerCase().includes('git') ? 'fab fa-git-alt' :
                                                'fas fa-code'
                                }></i>
                                {tech}
                              </TechBadge>
                            ))}
                          </TechBadgesContainer>
                        </TechStack>
                      </ExperienceContent>
                    )}
                  </AnimatePresence>
                </ExperienceCard>
              </TimelineItem>
            ))}
          </TimelineView>
        </ExperienceSection>
      </div>

      {/* Updated Education section without hover effects */}
      <div ref={educationRef}>
        <SectionTitleContainer>
          <GlitchedSectionTitle data-text="Education">Education</GlitchedSectionTitle>
        </SectionTitleContainer>
        <EducationContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <TempCarouselGrid>
            {educationContent.map((item, index) => (
              <CarouselCard
                key={index}
                backgroundImage={item.image}
                className="shadow-md"
              >
                <CardOverlay backgroundImage={item.image}>
                  <CardTitle backgroundImage={item.image}>
                    <strong>{item.institution}</strong>
                  </CardTitle>
                  <CardContent backgroundImage={item.image}>
                    {item.description}
                  </CardContent>
                </CardOverlay>
              </CarouselCard>
            ))}
          </TempCarouselGrid>
        </EducationContainer>
      </div>

      {/* Updated Positions section without hover effects */}
      <div ref={positionsRef}>
        <SectionTitleContainer>
          <GlitchedSectionTitle data-text="Positions">Positions</GlitchedSectionTitle>
        </SectionTitleContainer>
        <PositionsContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <TempCarouselGrid>
            {positionsContent.map((item, index) => (
              <CarouselCard key={index}>
                <CardOverlay>
                  <CardTitle>{item.title}</CardTitle>
                  <CardContent>
                    {item.content}
                  </CardContent>
                </CardOverlay>
              </CarouselCard>
            ))}
          </TempCarouselGrid>
        </PositionsContainer>
      </div>

      {/* Updated Extracurriculars section without hover effects */}
      <div ref={extracurricularsRef}>
        <SectionTitleContainer>
          <GlitchedSectionTitle data-text="Extracurriculars">Extracurriculars</GlitchedSectionTitle>
        </SectionTitleContainer>
        <ExtracurricularsContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <CompactCarouselGrid>
            {extracurricularContent.map((item, index) => (
              <CompactCard key={index}>
                <CompactCardOverlay>
                  <CardTitle>{item.title}</CardTitle>
                  <CompactCardContent>
                    {item.content}
                  </CompactCardContent>
                </CompactCardOverlay>
              </CompactCard>
            ))}
          </CompactCarouselGrid>
        </ExtracurricularsContainer>
      </div>

      {/* Updated Certifications section without hover effects */}
      <div ref={certificationsRef}>
        <SectionTitleContainer>
          <GlitchedSectionTitle data-text="Certifications">Certifications</GlitchedSectionTitle>
        </SectionTitleContainer>

        <CertificationsContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <CompactCarouselGrid>
            {certificationsData.map((cert, index) => (
              <CompactCard key={index}>
                <CompactCardOverlay>
                  <CardTitle>{cert.name}</CardTitle>
                  <CompactCardContent>
                    <ViewDocumentLink href={cert.link} target="_blank" rel="noopener noreferrer">
                      <i className="fas fa-file-alt"></i> View Certificate
                    </ViewDocumentLink>
                  </CompactCardContent>
                </CompactCardOverlay>
              </CompactCard>
            ))}
          </CompactCarouselGrid>
        </CertificationsContainer>
      </div>
    </AboutContainer>
  );
};

export default About;
