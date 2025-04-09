import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import { initializeFirebase } from './components/firebase';

// Define a custom theme with a catchy font
const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  // const [firebaseConfig, setFirebaseConfig] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Fetch Firebase configuration from the server
  //   const fetchFirebaseConfig = async () => {
  //     try {
  //       const response = await fetch('http://localhost:5000/firebase-config');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch Firebase configuration');
  //       }
  //       const config = await response.json();
  //       setFirebaseConfig(config);
        
  //       // Initialize Firebase with the fetched configuration
  //       initializeFirebase(config);
        
  //       setLoading(false);
  //     } catch (err) {
  //       console.error('Error fetching Firebase configuration:', err);
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };
  //   fetchFirebaseConfig();
  //   setFirebaseConfig(null)
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
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

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

export default App;

