import React, { useState, useEffect, useContext } from 'react';  // Remove useRef import
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import TextDistortion from '../components/TextDistortion';
import { ThemeContext } from '../theme/ThemeContext';

const ProjectsContainer = styled.div`
  min-height: 90vh;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

// Remove unused styled component
// const SectionTitle = styled(motion.h2)`...`;

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
  background-color: ${props => props.active ? props.theme.accent : 'transparent'};
  color: ${props => props.active ? '#fff' : props.theme.text};
  border: 1px solid ${props => props.active ? props.theme.accent : props.theme.text + '55'};
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
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: ${props => props.theme.cardBg};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadow};
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
`;

const ProjectImage = styled.div`
  height: 200px;
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

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  color: ${props => props.theme.text};
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.text}bb;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background-color: ${props => props.theme.background};
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  color: ${props => props.theme.text}dd;
  font-weight: 500;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const ProjectLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: ${props => props.primary ? props.theme.accent : props.theme.text};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props.theme.accent};
  }
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

const ModalContent = styled(motion.div)`
  background-color: ${props => props.theme.cardBg};
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  border-radius: 12px;
  overflow-y: auto;
  position: relative;
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

const ModalBody = styled.div`
  padding: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.text};
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

const Projects = () => {
  const { theme } = useContext(ThemeContext);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  // Enhanced project data with images, detailed descriptions, etc.
  const projectsData = [
    {
      id: 1,
      title: "Aura-3D Navigator",
      description: "An innovative 3D mapping application powered by Gemini technology to provide detailed, real-time spatial visualization and navigation.",
      detailedDescription: "Aura-3D Navigator seamlessly integrates Unity and Flutter for precise indoor navigation, offering users detailed spatial mapping with multiple attachments. The application uses advanced algorithms to provide real-time positioning even in areas with poor GPS coverage, making it ideal for large indoor spaces like shopping malls, museums, and airports.",
      image: "https://via.placeholder.com/400x200/F67E5D/FFFFFF?text=Aura-3D+Navigator",
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
      image: "https://via.placeholder.com/400x200/E8C9A2/000000?text=SellSphere+AdXchange",
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
      image: "https://via.placeholder.com/400x200/333333/FFFFFF?text=Nanolink",
      tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "NodeJS", "ExpressJS", "MongoDB"],
      category: ["web", "frontend"],
      liveLink: "#",
      codeLink: "https://github.com/gdsc-nits-org/nanolink.git",
      featured: false
    }
  ];

  // Filter projects based on selected category
  const filteredProjects = selectedFilter === "all"
    ? projectsData
    : projectsData.filter(project => project.category.includes(selectedFilter));

  // Open project detail modal
  const openProjectDetail = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  // Close project detail modal
  const closeProjectDetail = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Initialize the blurbs effect
  useEffect(() => {
    // Existing effect code...
  }, []);

  return (
    <ProjectsContainer>
      <BlobContainer>
        <Blob />
      </BlobContainer>

      <TextDistortion
        text="My Projects"
        size="2.5rem"
        margin="0 0 1rem 0"
        primaryColor={theme.accent}
        secondaryColor={theme.secondary}
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
                <ProjectDescription>{project.description}</ProjectDescription>

                <TagsContainer>
                  {project.tags.slice(0, 4).map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                  {project.tags.length > 4 && <Tag>+{project.tags.length - 4}</Tag>}
                </TagsContainer>

                <LinksContainer>
                  <ProjectLink
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    primary
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.05 }}
                  >
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </ProjectLink>
                  <ProjectLink
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.05 }}
                  >
                    <i className="fab fa-github"></i> View Code
                  </ProjectLink>
                </LinksContainer>
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

                <ProjectDescription>
                  {selectedProject.detailedDescription || selectedProject.description}
                </ProjectDescription>

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
