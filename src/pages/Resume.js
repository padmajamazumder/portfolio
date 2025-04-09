import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle'; // Add import

const ResumeContainer = styled.div`
  min-height: 90vh;
  padding: 4rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
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
    background-color: #61dafb;
  }
`;

const DownloadButton = styled.a`
  display: inline-block;
  background-color: #333;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  margin-bottom: 2rem;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #555;
  }
`;

const Resume = () => {
  // Path to your resume PDF in the public folder
  const resumePdfPath = "/Resume.pdf";

  return (
    <ResumeContainer>
      <ThemeToggle /> {/* Add ThemeToggle component */}
      <SectionTitle
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Resume
      </SectionTitle>

      {/* <DownloadButton
          href={resumePdfPath}
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          Download Resume (PDF)
        </DownloadButton> */}

      <iframe
        src={resumePdfPath}
        width="100%"
        height="800px"
        title="Resume Preview"
        style={{ border: "1px solid #ddd" }}
      />
    </ResumeContainer>
  );
};

export default Resume;
