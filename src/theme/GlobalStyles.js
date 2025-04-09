import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  body {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
  }
  
  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.theme.heading};
  }
  
  body[data-theme="light"] {
    --background: #F9F9F6;
    --card-bg: #FFFFFF;
    --text: #4A4A4A;
    --heading: #2F2F2F;
    --accent: #5F9EA0;
    --secondary: #FF6B6B;
    --border: #EAEAEA;
  }
  
  body[data-theme="dark"] {
    --background: #0F0F11;
    --card-bg: #1A1A1E;
    --text: #F5F5F5;
    --heading: #FFFFFF;
    --accent: #4CFFB3;
    --secondary: #4CC9F0;
    --border: #2A2A2D;
  }
`;

export default GlobalStyles;
