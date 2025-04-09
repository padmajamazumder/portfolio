import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { diaryEntries } from '../data/diaryEntries'; // Make sure this import is present
import axios from 'axios'; // Added import for axios
import ThemeToggle from '../components/ThemeToggle'; // Import ThemeToggle

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  padding: 6rem 2rem;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const PageTitle = styled(motion.h1)`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(90deg, var(--heading-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const DiaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const DiaryCard = styled(motion.div)`
  background-color: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  }
`;

const CardImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 50%);
    z-index: 1;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.image ? `url(${props.image})` : props.bgColor || 'linear-gradient(135deg, #61dafb 0%, #a78bfa 100%)'};
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
  opacity: ${props => props.image ? '0.7' : '1'}; /* Higher opacity (0.7) for images */
  
  ${DiaryCard}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CardTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--heading-color);
  line-height: 1.3;
`;

const CardExcerpt = styled.p`
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  font-size: 0.9rem;
  color: #718096;
`;

const ReadTime = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  
  &::before {
    content: '🕒';
    font-size: 1rem;
  }
`;

const ReadMoreButton = styled.button`
  background: transparent;
  border: none;
  color: var(--accent-color);
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--secondary-color);
    text-decoration: underline;
  }
`;

// Overlay components
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 1000;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

const OverlayContent = styled(motion.div)`
  background: var(--card-bg);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  border-radius: 12px;
  overflow-y: auto;
  position: relative;
  box-shadow: var(--shadow);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 2px;
    background: #333;
  }
  
  &::before {
    transform: rotate(45deg);
  }
  
  &::after {
    transform: rotate(-45deg);
  }
`;

const OverlayHeader = styled.div`
  padding: 2.5rem 2.5rem 1.5rem;
  
  h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.3;
    color: #2d3748;
  }
`;

const OverlayMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #718096;
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Tag = styled.span`
  padding: 0.2rem 0.8rem;
  border-radius: 100px;
  background-color: #e9f5fd;
  color: #3182ce;
  font-size: 0.8rem;
  font-weight: 500;
`;

const OverlayBody = styled.div`
  padding: 0 2.5rem 2.5rem;
  line-height: 1.8;
  font-size: 1.1rem;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    margin: 2rem 0 1rem;
    color: #2d3748;
  }
  
  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    margin: 1.5rem 0 0.8rem;
    color: #2d3748;
  }
  
  blockquote {
    border-left: 4px solid #61dafb;
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: #4a5568;
  }
`;

// Add new styled components for form
const AddEntryButton = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #3182ce;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 5;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.3);
  }
`;

const FormOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 1000;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

const Form = styled(motion.form)`
  width: 100%;
  max-width: 800px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #4a5568;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const CancelButton = styled(Button)`
  background-color: #e2e8f0;
  color: #4a5568;
  
  &:hover {
    background-color: #cbd5e0;
  }
`;

const SaveButton = styled(Button)`
  background-color: #3182ce;
  color: white;
  
  &:hover {
    background-color: #2c5282;
  }
`;

// Add admin authentication components
const AdminButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  color: #718096;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const AdminLoginOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 1000;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AdminLoginForm = styled(motion.form)`
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 2rem;
`;

// Calculate reading time based on word count
const calculateReadingTime = (content) => {
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
  return readingTime;
};

const Diary = () => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const ADMIN_PASSWORD = 'your-secure-password-here'; // Change this to your desired password

  // Updated formData state with nextId to keep track of IDs
  const [formData, setFormData] = useState({
    title: '',
    preview: '',
    genre: '',
    content: '',
    background: '',
    tags: []
  });

  // Find the next available ID for new entries
  const getNextId = () => {
    const maxId = Math.max(...diaryEntries.map(entry => entry.id), 0);
    return maxId + 1;
  };

  useEffect(() => {
    checkAdminSession();
  }, []);

  const checkAdminSession = () => {
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      const { isAdmin, expiry } = JSON.parse(adminSession);
      if (isAdmin && new Date().getTime() < expiry) {
        setIsAdmin(true);
      } else {
        localStorage.removeItem('adminSession');
      }
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminLogin(false);

      // Store admin session in local storage - expires in 1 hour
      const expiry = new Date().getTime() + 60 * 60 * 1000;
      localStorage.setItem('adminSession', JSON.stringify({ isAdmin: true, expiry }));
    } else {
      alert('Incorrect password');
    }
  };

  const openEntry = (entry) => {
    setSelectedEntry(entry);
    document.body.style.overflow = 'hidden';
  };

  const closeEntry = () => {
    setSelectedEntry(null);
    document.body.style.overflow = 'auto';
  };

  const openForm = () => {
    setIsFormOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeForm = () => {
    setIsFormOpen(false);
    document.body.style.overflow = 'auto';
    // Reset form
    setFormData({
      title: '',
      preview: '',
      genre: '',
      content: '',
      background: '',
      tags: []
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    // If the field is tags, convert the comma-separated string to an array
    if (name === "tags") {
      const tagsArray = value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      setFormData({
        ...formData,
        [name]: tagsArray
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Replace API call with direct update to diaryEntries array
  const handleFormSubmit = (e) => {
    e.preventDefault();

    try {
      // Create new entry object with a unique ID
      const newEntry = {
        ...formData,
        id: getNextId(),
        readTimeMinutes: calculateReadingTime(formData.content)
      };

      // Add the new entry to the diaryEntries array
      diaryEntries.unshift(newEntry); // Add to beginning for newest first

      // Close the form after adding the entry
      closeForm();

      // Optional: Save to localStorage to persist between refreshes
      localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));

      alert('Entry added successfully!');
    } catch (error) {
      console.error('Error adding entry:', error);
      alert('Failed to add entry. Please try again.');
    }
  };

  return (
    <PageContainer>
      {/* Add ThemeToggle to the page */}
      <ThemeToggle />

      <PageTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Scribbling
      </PageTitle>

      <DiaryGrid>
        {diaryEntries.map((entry, index) => (
          <DiaryCard
            key={entry.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => openEntry(entry)}
          >
            <CardImageContainer>
              <CardImage image={entry.image} bgColor={entry.bgColor} />
            </CardImageContainer>
            <CardContent>
              <CardTitle>{entry.title}</CardTitle>
              <CardExcerpt>{entry.preview}</CardExcerpt>
              <CardMeta>
                <ReadTime>{calculateReadingTime(entry.content)} min read</ReadTime>
                <ReadMoreButton>Read More</ReadMoreButton>
              </CardMeta>
            </CardContent>
          </DiaryCard>
        ))}
      </DiaryGrid>

      <AnimatePresence>
        {selectedEntry && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEntry}
          >
            <OverlayContent
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeEntry} />
              <OverlayHeader>
                <h1>{selectedEntry.title}</h1>
                <OverlayMeta>
                  <ReadTime>{calculateReadingTime(selectedEntry.content)} min read</ReadTime>
                  <Tags>
                    <Tag key={selectedEntry.genre}>{selectedEntry.genre}</Tag>
                  </Tags>
                </OverlayMeta>
              </OverlayHeader>
              <OverlayBody dangerouslySetInnerHTML={{ __html: selectedEntry.content }} />
            </OverlayContent>
          </Overlay>
        )}
      </AnimatePresence>

      {/* Only show the add button if admin is logged in */}
      {isAdmin && (
        <AddEntryButton
          onClick={openForm}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          +
        </AddEntryButton>
      )}

      {/* Hidden admin button in the corner */}
      {!isAdmin && (
        <AdminButton onClick={() => setShowAdminLogin(true)}>
          ⚙️
        </AdminButton>
      )}

      {/* Admin login overlay */}
      <AnimatePresence>
        {showAdminLogin && (
          <AdminLoginOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAdminLogin(false)}
          >
            <AdminLoginForm
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onSubmit={handleAdminLogin}
              onClick={(e) => e.stopPropagation()}
            >
              <FormTitle>Admin Login</FormTitle>
              <FormGroup>
                <Label htmlFor="adminPassword">Password</Label>
                <Input
                  type="password"
                  id="adminPassword"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
              </FormGroup>
              <ButtonGroup>
                <CancelButton
                  type="button"
                  onClick={() => setShowAdminLogin(false)}
                >
                  Cancel
                </CancelButton>
                <SaveButton type="submit">Login</SaveButton>
              </ButtonGroup>
            </AdminLoginForm>
          </AdminLoginOverlay>
        )}
      </AnimatePresence>

      {/* Entry form overlay */}
      <AnimatePresence>
        {isFormOpen && (
          <FormOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Form
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onSubmit={handleFormSubmit}
              onClick={(e) => e.stopPropagation()}
            >
              <FormTitle>Add New Entry</FormTitle>

              <FormGroup>
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="preview">Preview Text</Label>
                <Textarea
                  id="preview"
                  name="preview"
                  value={formData.preview}
                  onChange={handleFormChange}
                  placeholder="Brief excerpt or introduction (visible on card)"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="genre">Genre</Label>
                <Input
                  type="text"
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleFormChange}
                  placeholder="e.g. Poetry, Reflection, Tutorial"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="content">Full Content (HTML supported)</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleFormChange}
                  placeholder="Enter your full content here. HTML tags are supported."
                  rows={10}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="background">Background Gradient</Label>
                <Input
                  type="text"
                  id="background"
                  name="background"
                  value={formData.background}
                  onChange={handleFormChange}
                  placeholder="e.g. linear-gradient(135deg, #3498db 0%, #8e44ad 100%)"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags ? formData.tags.join(', ') : ''}
                  onChange={handleFormChange}
                  placeholder="e.g. Poetry, Personal, Love"
                />
              </FormGroup>

              <ButtonGroup>
                <CancelButton type="button" onClick={closeForm}>Cancel</CancelButton>
                <SaveButton type="submit">Add to Diary</SaveButton>
              </ButtonGroup>
            </Form>
          </FormOverlay>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default Diary;