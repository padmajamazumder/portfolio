import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import TextDistortion from '../components/TextDistortion';
import ThemeToggle from '../components/ThemeToggle';

const ProjectsContainer = styled.div`
  min-height: 90vh;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-size: 1.1rem; /* Increased base font size */
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${props => props.theme.text}99;
  margin-bottom: 3rem;
  max-width: 600px;
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  background-color: ${props => props.active ? 'var(--accent-color)' : 'transparent'};
  color: ${props => props.active ? '#fff' : 'var(--text-color)'};
  border: 1px solid ${props => props.active ? 'var(--accent-color)' : 'var(--border-color)'};
  padding: 0.5rem 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.theme.accent};
    color: ${props => !props.active && props.theme.accent};
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); /* Reduced from 350px */
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Update ProjectCard to use CSS variables and add enhanced styling
const ProjectCard = styled(motion.div)`
  background-color: var(--card-bg);
  color: var(--text-color);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: var(--shadow);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid transparent;
  transition: transform 0.3s ease, box-shadow 0.4s ease, border-color 0.3s ease;
  padding-bottom: 1rem; /* Added to give more space at bottom */
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2),
                0 0 15px var(--accent-color-transparent, rgba(97, 218, 251, 0.5)),
                0 0 5px var(--accent-color-transparent, rgba(97, 218, 251, 0.5));
    border: 1px solid var(--accent-color);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0;
    border-radius: inherit;
    background: radial-gradient(circle at center, var(--accent-color-transparent, rgba(97, 218, 251, 0.2)) 0%, transparent 70%);
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  &:hover::after {
    opacity: 0.7;
  }
`;

// Update ProjectTitle to use CSS variables
const ProjectTitle = styled.h3`
  font-size: 1.6rem; /* Increased from 1.5rem */
  margin-bottom: 0.7rem; /* Increased from 0.5rem */
  color: var(--heading-color);
  transition: transform 0.3s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.03);
  }
`;

// Update ProjectDescription to use CSS variables and ensure proper contrast in both modes
const ProjectDescription = styled.p`
  color: var(--text-color);  // Use theme variable instead of props
  margin-bottom: 1rem;
  line-height: 1.7; /* Increased from 1.6 */
  font-size: 1.1rem; /* Added explicit font size */
  transition: transform 0.3s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.02);
  }
  
  a {
    color: var(--accent-color);
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.3rem;
    transition: opacity 0.2s ease;
    
    &:hover {
      text-decoration: underline;
      opacity: 0.9;
    }
  }
`;

// Update TagContainer to use CSS variables
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
`;

// Update Tag to use CSS variables
const Tag = styled.span`
  background-color: var(--tag-bg, rgba(97, 218, 251, 0.15));
  color: var(--accent-color);
  padding: 0.4rem 0.8rem; /* Increased from 0.3rem 0.6rem */
  border-radius: 4px;
  font-size: 0.9rem; /* Increased from 0.8rem */
  font-weight: 500;
`;

// Update ProjectLinks to remove View Demo and only show GitHub
const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  text-decoration: none;
  color: var(--accent-color);
  font-weight: 500;
  font-size: 0.9rem;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ProjectImage = styled.div`
  height: 220px; /* Increased from 200px */
  background-color: ${props => props.theme.background};
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  }
  
  &:hover:before {
    background: rgba(0,0,0,0);
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: ${props => props.theme.accent};
  color: white;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  border-radius: 20px;
  font-weight: 500;
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectDetailModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

// Update ModalContent to have a more defined background
const ModalContent = styled(motion.div)`
  background-color: var(--card-bg);
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  border-radius: 12px;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 5px 30px rgba(0,0,0,0.3);
  
  // Add explicit background colors for each mode to ensure visibility
  @media (prefers-color-scheme: light) {
    background-color: white;
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: #1a1a1a;
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  
  &:hover {
    color: ${props => props.theme.accent};
  }
`;

const ModalImage = styled.div`
  height: 300px;
  background-image: ${props => props.image ? `url(${props.image})` : 'none'};
  background-size: cover;
  background-position: center;
`;

// Update ModalBody to ensure text visibility
const ModalBody = styled.div`
  padding: 2rem;
  color: var(--text-color);  // Explicitly set text color for modal content
`;

// Update ModalTitle for better visibility
const ModalTitle = styled.h2`
  font-size: 2.2rem; /* Increased from 2rem */
  margin-bottom: 1.2rem; /* Increased from 1rem */
  color: var(--text-color);  // Use theme variable instead of props
`;

// Add a special styled component for modal description to ensure visibility in all themes
const ModalDescription = styled.p`
  color: var(--text-color);
  margin-bottom: 1.2rem; /* Increased from 1rem */
  line-height: 1.7; /* Increased from 1.6 */
  font-size: 1.1rem; /* Slightly increased from 1.05rem */
  
  // Force dark text in light mode and light text in dark mode for better contrast
  @media (prefers-color-scheme: light) {
    color: #333; // Dark text for light mode
  }
  
  @media (prefers-color-scheme: dark) {
    color: #f1f1f1; // Light text for dark mode
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.text}99;
  margin-bottom: 1.5rem;
`;

const BlobContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 50px;
  width: 200px;
  height: 200px;
  z-index: -1;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Blob = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.accent}22;
  border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
  animation: blob-animation 8s linear infinite;
  transform-origin: center;
  
  &:before {
    content: '';
    position: absolute;
    top: 7%;
    left: 18%;
    width: 80%;
    height: 80%;
    border-radius: 37% 63% 51% 49% / 37% 65% 35% 63%;
    background-color: ${props => props.theme.accent}11;
    animation: blob-animation-2 12s linear infinite;
  }
  
  @keyframes blob-animation {
    0% { transform: rotate(0deg) scale(1); }
    33% { transform: rotate(120deg) scale(1.1); }
    66% { transform: rotate(240deg) scale(0.9); }
    100% { transform: rotate(360deg) scale(1); }
  }
  
  @keyframes blob-animation-2 {
    0% { transform: rotate(0deg) scale(0.9); }
    33% { transform: rotate(-120deg) scale(1.1); }
    66% { transform: rotate(-240deg) scale(0.8); }
    100% { transform: rotate(-360deg) scale(0.9); }
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 1rem;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsData = [
    {
      id: 1,
      title: "Aura-3D Navigator",
      description: "An innovative 3D mapping application powered by Gemini technology to provide detailed, real-time spatial visualization and navigation.",
      detailedDescription: "Aura-3D Navigator seamlessly integrates Unity and Flutter for precise indoor navigation, offering users detailed spatial mapping with multiple attachments. The application uses advanced algorithms to provide real-time positioning even in areas with poor GPS coverage, making it ideal for large indoor spaces like shopping malls, museums, and airports.",
      image: "/aura.png", // Updated to use local image
      tags: ["Flutter", "Dart", "Unity", "Gemini API", "Firebase", "OpenStreetMap"],
      category: ["mobile", "3d"],
      liveLink: "https://play.google.com/store/apps/details?id=com.aura3dinbetween.aura",
      codeLink: "https://github.com/Gaurav-822/Aura-F",
      featured: true
    },
    {
      id: 2,
      title: "MERN Chat",
      description: "A real-time chat application with authentication and authorization using JWT, allowing users to securely interact in real-time.",
      detailedDescription: "MERN Chat is a full-stack application that enables users to communicate in real-time. It features user authentication, private messaging, group chats, and message history. The application improved remote collaboration by reducing communication delays by 30% and ensuring secure exchanges between users through JWT authentication and end-to-end encryption.",
      image: "https://via.placeholder.com/400x200/C78C53/FFFFFF?text=MERN+Chat",
      tags: ["MongoDB", "Express", "React", "Node.js", "Socket.io", "JWT", "TailwindCSS"],
      category: ["web", "backend"],
      liveLink: "#",
      codeLink: "https://github.com/padmajamazumder/okk-talk.git",
      featured: false
    },
    {
      id: 3,
      title: "SellSphere AdXchange",
      description: "Automated campaign management and ad request platform that facilitates targeted promotions and monetization.",
      detailedDescription: "SellSphere AdXchange is a platform that connects brands with influencers for advertising campaigns. It features automated campaign management, analytics dashboards, and a secure payment system. The platform doubled influencer earnings and increased brand visibility while creating a safer, fraud-free environment with comprehensive admin monitoring tools.",
      image: "/mad1.png",
      tags: ["Flask", "SQLAlchemy", "SQLite", "HTML", "CSS", "ChartJS", "Jinja2"],
      category: ["web", "backend"],
      liveLink: "https://drive.google.com/file/d/1TZnXbO3FEgxLVzK4PcjZnk9TvgqRRTRi/view?usp=sharing",
      codeLink: "https://github.com/padmajamazumder/IITMadrasProject1.git",
      featured: true
    },
    {
      id: 4,
      title: "Nanolink",
      description: "URL shortening service that streamlines the process of sharing lengthy URLs across different communication platforms.",
      detailedDescription: "Nanolink is a URL shortening service designed to improve information sharing across digital platforms. It includes features such as link analytics, custom short URLs, QR code generation, and link expiration settings. The service enhanced information distribution for over 500 students and faculty members and increased engagement with shared content on social platforms by 25%.",
      image: "/url.jpeg", // Updated to use local image
      tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "NodeJS", "ExpressJS", "MongoDB"],
      category: ["web", "frontend"],
      liveLink: "#",
      codeLink: "https://github.com/gdsc-nits-org/nanolink.git",
      featured: false
    },
    {
      id: 5,
      title: "doXcollab",
      description: "A real-time collaborative document editing platform enabling multiple users to work simultaneously on shared documents with Google Docs-like functionality.",
      detailedDescription: "doXcollab is a collaborative real-time document editing platform that enables users to work together on the same document, viewing and editing content simultaneously. Built with React for the frontend and Node.js with Express for the backend, the platform ensures seamless real-time collaboration using Socket.io and stores documents in MongoDB. Features include real-time synchronization, rich text editing, user authentication, and version history tracking.",
      image: "/note.png", // Updated to use local image
      tags: ["React.js", "Node.js", "Express", "MongoDB", "Socket.io", "Real-time", "Collaboration"],
      category: ["web", "frontend", "backend"],
      liveLink: "",
      codeLink: "https://github.com/padmajamazumder/doXcollab.git",
      featured: true
    }
  ];

  const filteredProjects = selectedFilter === "all"
    ? projectsData
    : projectsData.filter(project => project.category.includes(selectedFilter));

  const openProjectDetail = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
  }, []);

  return (
    <ProjectsContainer>
      <ThemeToggle />
      <BlobContainer>
        <Blob />
      </BlobContainer>

      <TextDistortion
        text="My Projects"
        size="2.5rem"
        margin="0 0 1rem 0"
        primaryColor="var(--accent-color)"
        secondaryColor="var(--secondary-color)"
      />

      <SectionSubtitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Explore my recent web development and design projects
      </SectionSubtitle>

      <FilterContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <FilterButton
          active={selectedFilter === "all"}
          onClick={() => setSelectedFilter("all")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All Projects
        </FilterButton>
        <FilterButton
          active={selectedFilter === "web"}
          onClick={() => setSelectedFilter("web")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Web Apps
        </FilterButton>
        <FilterButton
          active={selectedFilter === "mobile"}
          onClick={() => setSelectedFilter("mobile")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Mobile Apps
        </FilterButton>
        <FilterButton
          active={selectedFilter === "frontend"}
          onClick={() => setSelectedFilter("frontend")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Frontend
        </FilterButton>
        <FilterButton
          active={selectedFilter === "backend"}
          onClick={() => setSelectedFilter("backend")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Backend
        </FilterButton>
        <FilterButton
          active={selectedFilter === "3d"}
          onClick={() => setSelectedFilter("3d")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          3D/VR
        </FilterButton>
      </FilterContainer>

      {filteredProjects.length > 0 ? (
        <ProjectsGrid
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
              onClick={() => openProjectDetail(project)}
              whileHover={{ scale: 1.02 }}
            >
              <ProjectImage image={project.image}>
                {project.featured && <FeaturedBadge>Featured</FeaturedBadge>}
              </ProjectImage>
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>
                  {project.description}
                  {project.liveLink && (
                    <span>
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        View Demo
                      </a>
                    </span>
                  )}
                </ProjectDescription>

                <TagContainer>
                  {project.tags.slice(0, 4).map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                  {project.tags.length > 4 && <Tag>+{project.tags.length - 4}</Tag>}
                </TagContainer>

                <ProjectLinks>
                  {project.codeLink && (
                    <ProjectLink href={project.codeLink} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github"></i> View Code
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      ) : (
        <EmptyState>
          <EmptyStateText>No projects found in this category.</EmptyStateText>
          <FilterButton
            onClick={() => setSelectedFilter("all")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </FilterButton>
        </EmptyState>
      )}

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectDetail}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalCloseButton onClick={closeProjectDetail}>
                <i className="fas fa-times"></i>
              </ModalCloseButton>

              <ModalImage image={selectedProject.image} />

              <ModalBody>
                <ModalTitle>{selectedProject.title}</ModalTitle>

                <TagsContainer>
                  {selectedProject.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagsContainer>

                <ModalDescription>
                  {selectedProject.detailedDescription || selectedProject.description}
                </ModalDescription>

                <LinksContainer>
                  <ProjectLink
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    primary
                  >
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </ProjectLink>
                  <ProjectLink
                    href={selectedProject.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github"></i> View Code
                  </ProjectLink>
                </LinksContainer>
              </ModalBody>
            </ModalContent>
          </ProjectDetailModal>
        )}
      </AnimatePresence>
    </ProjectsContainer>
  );
};

export default Projects;
