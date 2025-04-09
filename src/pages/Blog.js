import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';

const BlogContainer = styled.div`
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

const Blog = () => {
    return (
        <BlogContainer>
            <ThemeToggle />
            <SectionTitle
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                Blog
            </SectionTitle>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                Coming soon! Blog content will be added in the future.
            </motion.p>
        </BlogContainer>
    );
};

export default Blog;
