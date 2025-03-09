import { useState, useEffect, useRef } from "react"
import { Link as RouterLink } from "react-router-dom"
import { Box, Typography, Button, Container, Card, CardContent, CardMedia, styled } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import BF from "../images/building-filled.png"
import BNF from "../images/building.png"
import Background from "../images/background-page-4.jpg"
import { db, collection, getDoc, doc } from "../components/firebase"
import getMediaUrl from "../components/MediaUrl"
import AboutModal from "../components/AboutModal"

const ourServices = [
  {
    icon: BF,
    mainService: "ARCHITECTURE BIM SERVICES",
    subServices: ["VDC / BIM COORDINATION / CSD", "POINT CLOUD SCAN TO BIM"],
  },
  {
    icon: BNF,
    mainService: "STRUCTURAL BIM SERVICES",
    subServices: ["4D SIMULATION / RENDERING", "VR / AR VDC"],
  },
  {
    icon: BF,
    mainService: "MEP BIM SERVICES",
    subServices: ["5D COST / QUANTITY TAKE-OFF", "BIM DOCUMENTATION"],
  },
]
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
  background: "linear-gradient(45deg, rgba(0, 102, 255, 0.9), rgba(0, 163, 255, 0.9))",
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
    background: "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)",
    backgroundSize: "100px 100px",
    animation: "moveBackground 20s linear infinite",
  },
  "@keyframes moveBackground": {
    "0%": { backgroundPosition: "0 0" },
    "100%": { backgroundPosition: "100px 100px" },
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
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  border: "1px solid rgba(0, 102, 255, 0.1)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 24px rgba(0, 102, 255, 0.15)",
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
  fontSize: "1.5rem",
  fontWeight: "bold",
  background: "linear-gradient(45deg, #0066FF 30%, #00A3FF 90%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
  textAlign: "center",
  marginBottom: theme.spacing(3),
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-10px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "40px",
    height: "3px",
    background: "linear-gradient(45deg, #0066FF, #00A3FF)",
    borderRadius: "2px",
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
  fontSize: "1.1rem",
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
                position: 'relative',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                backgroundColor: '#000',
              }}
            >
              <Box
                id="youtube-player"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100%',
                  height: '100%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
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
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
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
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                textAlign: { xs: "center", md: "left" },
                lineHeight: 1.6,
                textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              {homeData.description}
            </Typography>
            <Box sx={{ 
              display: "flex", 
              justifyContent: { xs: "center", md: "flex-start" },
              mt: 4 
            }}>
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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: { xs: 3, md: 4 },
              px: { xs: 2, md: 0 },
            }}
          >
            {
  ourServices.map((service, index) => (
    <ServiceCard
      key={index}
      sx={{
        opacity: 0,
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(0, 102, 255, 0.1)",
        boxShadow: "0 10px 30px -5px rgba(0, 102, 255, 0.1)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: `fadeInUp 0.6s ease-out ${index * 0.2}s forwards`,
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "0 20px 40px -5px rgba(0, 102, 255, 0.2)",
          "& .service-icon": {
            transform: "scale(1.1) rotate(5deg)",
            filter: "drop-shadow(0 10px 15px rgba(0, 102, 255, 0.3))",
          },
          "& .service-title::after": {
            width: "80px",
            background: "linear-gradient(90deg, #0066FF, #00A3FF)",
          },
        },
        "@keyframes fadeInUp": {
          from: {
            opacity: 0,
            transform: "translateY(20px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      <ServiceIcon className="service-icon">
        <Box
          sx={{
            background: "linear-gradient(135deg, #0066FF, #00A3FF)",
            borderRadius: "20px",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
        >
          <img
            src={service.icon || "/placeholder.svg"}
            alt={service.mainService}
            style={{
              width: "50px",
              height: "50px",
              filter: "brightness(0) invert(1)",
            }}
          />
        </Box>
      </ServiceIcon>
      <ServiceTitle
        variant="h5"
        className="service-title"
        sx={{
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "40px",
            height: "3px",
            background: "linear-gradient(90deg, #0066FF, #00A3FF)",
            borderRadius: "2px",
            transition: "all 0.3s ease",
          },
        }}
      >
        {service.mainService}
      </ServiceTitle>
      <CardContent
        sx={{
          width: "100%",
          padding: "24px 16px !important",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {service.subServices.map((subService, idx) => (
          <SubServiceButton
            key={idx}
            sx={{
              opacity: 0,
              position: "relative",
              padding: "16px",
              background: "linear-gradient(135deg, rgba(0, 102, 255, 0.05), rgba(0, 163, 255, 0.05))",
              borderRadius: "12px",
              border: "1px solid rgba(0, 102, 255, 0.1)",
              fontSize: "0.95rem",
              fontWeight: "800",
              color: "#0066FF",
              transition: "all 0.3s ease",
              animation: `fadeIn 0.5s ease-out ${index * 0.2 + idx * 0.1}s forwards`,
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #0066FF, #00A3FF)",
                opacity: 0,
                transition: "opacity 0.3s ease",
                zIndex: 0,
              },
              "&:hover": {
                transform: "translateY(-3px)",
                color: "#fff",
                boxShadow: "0 8px 20px -5px rgba(0, 102, 255, 0.3)",
                "&::before": {
                  opacity: 1,
                },
                "& .sub-service-text": {
                  position: "relative",
                  zIndex: 1,
                },
              },
              "@keyframes fadeIn": {
                from: {
                  opacity: 0,
                  transform: "translateY(10px)",
                },
                to: {
                  opacity: 1,
                  transform: "translateY(0)",
                },
              },
            }}
          >
            <span className="sub-service-text">{subService}</span>
          </SubServiceButton>
        ))}
      </CardContent>
    </ServiceCard>
  ))
}
          </Box>
        </Container>
      </StyledServicesSection>
    </Box>
  )
}

export default Home
