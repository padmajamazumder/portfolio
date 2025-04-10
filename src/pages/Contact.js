import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ThemeToggle from '../components/ThemeToggle';

// Container for the entire contact page
const ContactContainer = styled.div`
  min-height: 90vh;
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.1rem; /* Added base font size */
`;

// Section title with glitch effect
const GlitchedSectionTitle = styled.h2`
  position: relative;
  font-size: 3rem; /* Increased from 2.5rem */
  font-weight: 700;
  margin-bottom: 4rem;
  color: var(--text-color); /* Using CSS variable instead of theme prop */
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
    background: var(--bg-color); /* Using CSS variable */
  }
  
  &:before {
    left: 2px;
    text-shadow: -2px 0 var(--accent-color); /* Using CSS variable */
    animation: glitch-1 2s linear infinite reverse;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  }
  
  &:after {
    left: -2px;
    text-shadow: 2px 0 var(--accent-color); /* Using CSS variable */
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
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); /* Increased from 150px */
  gap: 2rem; /* Reduced from 2.5rem */
  width: 100%;
  max-width: 850px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); /* Increased from 120px */
    gap: 1.8rem; /* Reduced from 2rem */
  }
`;

// Individual link item
const ContactItem = styled(motion.a)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--text-color); /* Using CSS variable */
  background-color: var(--card-bg); /* Using CSS variable */
  padding: 1.8rem 1.5rem; /* Adjusted from 1.5rem */
  border-radius: 16px;
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    background-color: var(--accent-color-transparent, rgba(97, 218, 251, 0.15)); /* Using CSS variable */
    
    .icon {
      color: var(--accent-color); /* Using CSS variable */
      transform: scale(1.2);
    }
    
    .name {
      color: var(--accent-color); /* Using CSS variable */
    }
  }
`;

const IconWrapper = styled.div`
  font-size: 2.8rem; /* Increased from 2.5rem */
  margin-bottom: 1.2rem; /* Increased from 1rem */
  
  .icon {
    transition: transform 0.3s ease, color 0.3s ease;
  }
`;

const LinkName = styled.span`
  font-weight: 500;
  font-size: 1.1rem; /* Increased from 1rem */
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

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.7rem; /* Increased from 0.5rem */
  font-weight: 500;
  font-size: 1.15rem; /* Added explicit font size */
`;

const Input = styled.input`
  padding: 1.1rem; /* Increased from 1rem */
  border-radius: 5px;
  border: 1px solid #333;
  background-color: rgba(255, 255, 255, 0.05);
  color: inherit;
  font-size: 1.1rem; /* Increased from 1rem */
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #61dafb;
  }
`;

const TextArea = styled.textarea`
  padding: 1.1rem; /* Increased from 1rem */
  border-radius: 5px;
  border: 1px solid #333;
  background-color: rgba(255, 255, 255, 0.05);
  color: inherit;
  font-size: 1.1rem; /* Increased from 1rem */
  min-height: 180px; /* Increased from 150px */
  transition: border-color 0.3s;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #61dafb;
  }
`;

const Button = styled(motion.button)`
  padding: 1.1rem 1.7rem; /* Increased from 1rem 1.5rem */
  background-color: var(--accent-color, #61dafb); /* Using CSS variable with fallback */
  color: #111;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem; /* Increased from 1rem */
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: var(--accent-hover, #4fa8d1); /* Using CSS variable with fallback */
  }
`;

const MessageDisplay = styled(motion.div)`
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 5px;
  background-color: ${props => props.success ? 'rgba(0, 200, 83, 0.2)' : 'rgba(255, 0, 0, 0.2)'};
  color: ${props => props.success ? '#00c853' : '#ff1744'};
`;

const Contact = () => {
  // Removed ThemeContext dependency
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would typically send the data to a server
    // For now, we'll just simulate a successful submission
    setStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! I will get back to you soon.'
    });

    // Clear form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

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
      <ThemeToggle />
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

      <Form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={handleSubmit}
      >
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="message">Message</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Send Message
        </Button>
      </Form>

      {status.submitted && (
        <MessageDisplay
          success={status.success}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {status.message}
        </MessageDisplay>
      )}
    </ContactContainer>
  );
};

export default Contact;
