"use client"

import { useState, useEffect } from "react"
import { Box, Typography, CardMedia, useMediaQuery, useTheme } from "@mui/material"

const VideoBanner = ({ videoUrl, title, description }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(!isMobile)

  useEffect(() => {
    // Set visible after a short delay for animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const modifiedVideoUrl = videoUrl?.replace("?", "?rel=0&")

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        width: "100%",
        padding: { xs: "24px 16px", sm: "32px 24px", md: "40px 32px" },
        background: "transparent",
        minHeight: isMobile ? "auto" : "500px",
        gap: { xs: 3, md: 6 },
      }}
    >
      {/* Title Section - Left Side */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: isMobile ? "100%" : "50%",
          padding: { xs: "16px 0", md: "24px 0" },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            opacity: 0.1,
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            opacity: isVisible ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          <Typography
            variant={isMobile ? "h3" : "h1"}
            sx={{
              fontWeight: 700,
              letterSpacing: "0.02em",
              color: "rgb(59, 130, 246)",
              background: "linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textTransform: "uppercase",
              lineHeight: 1.1,
              marginBottom: 2,
              fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem", lg: "3rem" },
              transition: "transform 0.3s ease",
              transform: isHovered ? "scale(1.02)" : "scale(1)",
            }}
          >
            {title}
          </Typography>

          <Box
            sx={{
              width: isHovered ? "100%" : "120px",
              height: "4px",
              background: "linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)",
              transition: "width 0.5s ease",
              marginTop: 1,
            }}
          />
        </Box>

        <Box
          sx={{
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            opacity: isVisible ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
            marginTop: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "rgba(0, 0, 0, 0.7)",
              lineHeight: 1.5,
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
              display: "-webkit-box",
              WebkitLineClamp: showFullDescription ? "none" : 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {description}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#3b82f6",
              cursor: "pointer",
              marginTop: 1,
            }}
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Read Less" : "Read More"}
          </Typography>
        </Box>
      </Box>

      {/* Video Section - Right Side */}
      <Box
        sx={{
          width: isMobile ? "100%" : "50%",
          height: isMobile ? "300px" : "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: isVisible ? "translateX(0)" : "translateX(40px)",
          opacity: isVisible ? 1 : 0,
          transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s",
        }}
      >
        {videoUrl ? (
          <CardMedia
            component="iframe"
            src={modifiedVideoUrl}
            allowFullScreen
            sx={{
              width: "100%",
              height: "100%",
              minHeight: "300px",
              objectFit: "cover",
              borderRadius: "8px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            }}
            allow="autoplay; encrypted-media"
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              minHeight: "300px",
              backgroundColor: "#000",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            <Typography variant="body1">No video available</Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default VideoBanner

