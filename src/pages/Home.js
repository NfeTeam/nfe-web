import { useState, useEffect, useRef } from "react"
import { Box, Typography, Button, Container, Card,styled } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import BF from "../images/building-filled.png"
import { db, collection, getDoc, doc } from "../components/firebase"
import getMediaUrl from "../components/MediaUrl"
import AboutModal from "../components/AboutModal"
import { useNavigate } from "react-router-dom"

const ourServices = [
  "ARCHITECTURE BIM SERVICES",
  "STRUCTURAL BIM SERVICES",
  "MEP BIM SERVICES",
  "VDC / BIM COORDINATION / CSD",
  "POINT CLOUD SCAN TO BIM",
  "4D SIMULATION / RENDERING",
  "VR / AR VDC",
  "5D COST / QUANTITY TAKE-OFF",
  "BIM DOCUMENTATION",
];
const StyledHeroSection = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "600px", // Fixed height for all screen sizes
  [theme.breakpoints.down('md')]: {
    height: "400px",
  },
  [theme.breakpoints.down('sm')]: {
    height: "300px",
  },
  overflow: "hidden",
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))",
    zIndex: 1,
  },
}))

const StyledOverlayText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "#ffffff",
  textAlign: "center",
  zIndex: 2,
  textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
  width: "90%",
  maxWidth: "800px",
  animation: "fadeIn 1.5s ease-out",
  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translate(-50%, -40%)" },
    to: { opacity: 1, transform: "translate(-50%, -50%)" },
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}))

const StyledDotContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  justifyContent: "center",
  zIndex: 2,
  gap: theme.spacing(1),
}))

const StyledDot = styled(Box)(({ theme, active }) => ({
  width: "12px",
  height: "12px",
  borderRadius: "50%",
  backgroundColor: active ? "#0077b6" : "rgba(255,255,255,0.5)",
  margin: "0 5px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  transform: active ? "scale(1.2)" : "scale(1)",
  "&:hover": {
    backgroundColor: active ? "#0077b6" : "rgba(255,255,255,0.8)",
  },
}))

const StyledIntroSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.9), rgba(0, 163, 255, 0.9))',
  color: "white",
  padding: theme.spacing(8, 0),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
    backgroundSize: '100px 100px',
    animation: 'moveBackground 20s linear infinite',
    opacity: 0.3,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(0, 102, 255, 0.2), rgba(0, 163, 255, 0.2), rgba(0, 102, 255, 0.2))',
    backgroundSize: '200% 200%',
    animation: 'gradientShift 8s ease infinite',
    zIndex: 0,
  },
  "@keyframes moveBackground": {
    "0%": { backgroundPosition: "0 0" },
    "100%": { backgroundPosition: "100px 100px" },
  },
  "@keyframes gradientShift": {
    "0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" },
  },
}))

const StyledServicesSection = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(8, 0),
  background: "linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%)",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100px",
    background: "linear-gradient(180deg, rgba(0,0,0,0.03) 0%, transparent 100%)",
  },
}))

const ServiceCard = styled(Card)(({ theme }) => ({
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  cursor:"pointer",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.9), rgba(0, 163, 255, 0.9))', // Adjusted gradient
  border: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.05)',
    boxShadow: '0 12px 24px rgba(0, 102, 255, 0.3)',
    background: 'rgba(255, 255, 255, 0.9)', // Whitish background on hover
    '& .MuiTypography-root': {
      color: '#0077b6', // Blue text on hover
    },
  },
}))

const ServiceIcon = styled(Box)(({ theme }) => ({
  width: "80px",
  height: "80px",
  marginBottom: theme.spacing(3),
  transition: "transform 0.3s ease",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  "&:hover": {
    transform: "scale(1.1) rotate(5deg)",
  },
}))

const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 'bolder',
  color: '#ffffff', // White text for contrast
  textAlign: 'center',
  marginBottom: theme.spacing(1),
  transition: 'color 0.3s ease',
  '&:hover': {
    color: 'inherit', // Remove individual hover effect
  },
}))

const SubServiceButton = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  background: "linear-gradient(45deg, rgba(0, 102, 255, 0.1), rgba(0, 163, 255, 0.1))",
  color: "#0066FF",
  borderRadius: theme.spacing(1),
  textAlign: "center",
  fontWeight: "500",
  transition: "all 0.3s ease",
  cursor: "pointer",
  border: "1px solid rgba(0, 102, 255, 0.1)",
  "&:hover": {
    background: "linear-gradient(45deg, #0066FF, #00A3FF)",
    color: "white",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0, 102, 255, 0.2)",
  },
}))

const LearnMoreButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  background: "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.2))",
  color: "white",
  border: "2px solid rgba(255,255,255,0.5)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 600,
  transition: "all 0.3s ease",
  backdropFilter: "blur(4px)",
  "&:hover": {
    background: "linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.3))",
    borderColor: "rgba(255,255,255,0.8)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },
}))

const Home = () => {
  const [slides, setSlides] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [homeData, setHomeData] = useState({})
  const [showAboutModal, setShowAboutModal] = useState(false)
  const videoRef = useRef(null)
  const playerRef = useRef(null)
  const theme = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSlidesData = async () => {
      try {
        const homeDataRef = doc(collection(db, "homeContent"), "homeData")
        const homeDataDoc = await getDoc(homeDataRef)
        const homeData = homeDataDoc.data()

        const homeMediaRef = doc(collection(db, "homeContent"), "homeMedia")
        const homeMediaDoc = await getDoc(homeMediaRef)
        const homeMedia = homeMediaDoc.data().media

        const combinedSlides = homeMedia.map((media, index) => ({
          type: media.type,
          src: getMediaUrl(media.url, media.type),
          alt: homeData.title + " Slide " + (index + 1),
        }))

        setSlides(combinedSlides)
        setHomeData(homeData)
      } catch (error) {
        console.error("Error fetching slides data: ", error)
      }
    }

    fetchSlidesData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (slides.length > 0) {
        if (slides[currentSlide].type === "image") {
          setCurrentSlide((prev) => (prev + 1) % slides.length)
        }
      }
    }, 7000) // Change slide every 7 seconds

    return () => clearInterval(interval)
  }, [currentSlide, slides])

  useEffect(() => {
    const handleVideoEnded = () => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    if (videoRef.current) {
      videoRef.current.addEventListener("ended", handleVideoEnded)
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("ended", handleVideoEnded)
      }
    }
  }, [currentSlide, slides])

  // Add YouTube API script
  useEffect(() => {
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
      if (slides[currentSlide]?.type === 'video') {
        initializeYouTubePlayer()
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [])

  // Initialize/Update YouTube player when slide changes
  useEffect(() => {
    if (slides[currentSlide]?.type === 'video') {
      initializeYouTubePlayer()
    }
  }, [currentSlide, slides])

  const initializeYouTubePlayer = () => {
    const videoUrl = slides[currentSlide]?.src
    if (!videoUrl) return

    try {
      let videoId = ''
      if (videoUrl.includes('youtube.com/embed/')) {
        videoId = videoUrl.split('/embed/')[1].split('?')[0]
      } else if (videoUrl.includes('youtube.com')) {
        const urlParams = new URLSearchParams(videoUrl.split('?')[1])
        videoId = urlParams.get('v')
      } else if (videoUrl.includes('youtu.be')) {
        videoId = videoUrl.split('/').pop().split('?')[0]
      }

      if (videoId) {
        if (playerRef.current) {
          playerRef.current.destroy()
        }

        playerRef.current = new window.YT.Player('youtube-player', {
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            rel: 0,
            showinfo: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
            loop: 0
          },
          events: {
            onStateChange: (event) => {
              // When video ends (state = 0), move to next slide
              if (event.data === 0) {
                setCurrentSlide((prev) => (prev + 1) % slides.length)
              }
            }
          }
        })
      }
    } catch (error) {
      console.error('Error initializing YouTube player:', error)
    }
  }

  const handleDotClick = (index) => {
    setCurrentSlide(index)
  }

  const handleVideoUrl = (url) => {
    if (!url) return ''
    
    try {
      let videoId = ''
      if (url.includes('youtube.com/embed/')) {
        videoId = url.split('/embed/')[1].split('?')[0]
      } else if (url.includes('youtube.com')) {
        const urlParams = new URLSearchParams(url.split('?')[1])
        videoId = urlParams.get('v')
      } else if (url.includes('youtu.be')) {
        videoId = url.split('/').pop().split('?')[0]
      }
      
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?enablejsapi=1`
      }
    } catch (error) {
      console.error('Error processing video URL:', error)
    }
    
    return url || ''
  }

  const navigateToService = (service) => {
    navigate(`/services#${service.replace(/\s+/g, '-').toLowerCase()}`);
  };

  return (
    <Box sx={{ overflow: "hidden" }}>
      <AboutModal
        open={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
      <StyledHeroSection>
        {slides.length > 0 &&
          (slides[currentSlide].type === "image" ? (
            <Box
              component="img"
              src={slides[currentSlide].src || "/placeholder.svg"}
              alt={slides[currentSlide].alt}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                animation: "zoomEffect 7s ease-in-out infinite",
                "@keyframes zoomEffect": {
                  "0%": { transform: "scale(1)" },
                  "50%": { transform: "scale(1.1)" },
                  "100%": { transform: "scale(1)" },
                },
              }}
            />
          ) : (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                backgroundColor: "#000",
              }}
            >
              <Box
                id="youtube-player"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "100%",
                  height: "100%",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                }}
              />
            </Box>
          ))}

        <StyledDotContainer>
          {slides.map((_, index) => (
            <StyledDot
              key={index}
              active={index === currentSlide}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </StyledDotContainer>
      </StyledHeroSection>

      <StyledIntroSection>
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                fontSize: { xs: "2rem", sm: "2.25rem", md: "2.75rem" },
                textAlign: { xs: "center", md: "left" },
                mb: 4,
              }}
            >
              {homeData.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                maxWidth: "90%",
                fontSize: { xs: "1rem", sm: "1.15rem", md: "1.3rem" },
                textAlign: { xs: "center", md: "left" },
                lineHeight: 1.6,
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              {homeData.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
                mt: 4,
              }}
            >
              <LearnMoreButton onClick={() => setShowAboutModal(true)}>
                Learn More About Us
              </LearnMoreButton>
            </Box>
          </Box>
        </Container>
      </StyledIntroSection>

      <StyledServicesSection>
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: "linear-gradient(45deg, #0066FF 30%, #00A3FF 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              marginBottom: "60px",
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-15px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "4px",
                background: "linear-gradient(45deg, #0066FF, #00A3FF)",
                borderRadius: "2px",
              },
            }}
          >
            Our Services
          </Typography>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <img src={BF} alt="Building Icon" style={{ width: '80px', height: '80px' }} />
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: { xs: 3, md: 4 },
              px: { xs: 4, md: 8 },
            }}
          >
            {ourServices.map((service, index) => (
              <ServiceCard key={index} onClick={() => navigateToService(service)}>
                <ServiceTitle>{service}</ServiceTitle>
              </ServiceCard>
            ))}
          </Box>
        </Container>
      </StyledServicesSection>
    </Box>
  );
}

export default Home
