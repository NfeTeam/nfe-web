import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import SocialService from './pages/SocialService';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Media from './pages/Media';
import WhatsAppBubbleComponent from './components/WhatsAppBubble';

// Define a custom theme with a catchy font
const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth={false} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', marginTop:"70px", padding:"0px" }}>
          <Header />
          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/social-service" element={<SocialService />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/media" element={<Media />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppBubbleComponent />
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;

