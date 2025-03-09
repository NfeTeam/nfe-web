import { useState, useRef, useEffect } from "react"
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  Typography,
  createTheme,
  Container,
  styled,
  useTheme,
  useMediaQuery
} from "@mui/material"
import { PlayCircleOutline } from "@mui/icons-material"
import { db, collection, getDocs } from "../components/firebase"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000",
    },
  },
})

const StyledPageContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(180deg, #ffffff 0%, #f5f9ff 100%)",
  minHeight: "100vh",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
}))

const StyledHeader = styled(Box)(({ theme }) => ({
  background: "linear-gradient(45deg, rgba(0, 102, 255, 0.9), rgba(0, 163, 255, 0.9))",
  borderRadius: { xs: 2, md: 4 },
  boxShadow: "0 8px 32px rgba(0, 102, 255, 0.15)",
  display: "inline-block",
  px: { xs: 2, md: 4 },
  py: { xs: 2, md: 3 },
  mt: 3,
  mb: 5,
  ml: { xs: 0, md: 2 },
  width: { xs: "100%", md: "auto" },
}))

const StyledVideoCard = styled(Card)(({ theme }) => ({
  height: "100%",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: theme.spacing(2),
  boxShadow: "0 8px 32px rgba(0, 102, 255, 0.1)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "hidden",
  border: "1px solid rgba(0, 102, 255, 0.1)",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 48px rgba(0, 102, 255, 0.2)",
  },
}))

const StyledPreviewContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(to right, rgba(255,255,255,0.95), rgba(245,249,255,0.95))",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
}))

const StyledVideoList = styled(List)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.95)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  boxShadow: "0 4px 24px rgba(0, 102, 255, 0.08)",
}))

const StyledVideoListItem = styled(ListItem)(({ theme, active }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  transition: "all 0.3s ease",
  background: active ? "linear-gradient(45deg, rgba(0, 102, 255, 0.08), rgba(0, 163, 255, 0.08))" : "transparent",
  "&:hover": {
    background: active 
      ? "linear-gradient(45deg, rgba(0, 102, 255, 0.12), rgba(0, 163, 255, 0.12))"
      : "linear-gradient(45deg, rgba(0, 102, 255, 0.05), rgba(0, 163, 255, 0.05))",
  },
}))

export default function Media() {
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [failedVideoThumbnails, setFailedVideoThumbnails] = useState(new Set())
  const playerRef = useRef(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const mediaContentRef = collection(db, "mediaContent")
        const querySnapshot = await getDocs(mediaContentRef)
        const fetchedVideos = []
        
        querySnapshot.forEach((doc) => {
          fetchedVideos.push({
            id: doc.id,
            ...doc.data()
          })
        })

        setVideos(fetchedVideos)
        if (fetchedVideos.length > 0) {
          setSelectedVideo(fetchedVideos[0])
        }
      } catch (error) {
        console.error("Error fetching videos:", error)
      }
    }

    fetchVideos()
  }, [])
  console.log(videos)
  useEffect(() => {
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    return () => {
      tag.remove()
    }
  }, [])

  const handleVideoClick = (video) => {
    setSelectedVideo(video)
  }

  const handlePreviewClick = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, true)
      playerRef.current.playVideo()
    }
  }

  const handleThumbnailError = (videoId) => {
    setFailedVideoThumbnails(prev => new Set([...prev, videoId]))
  }

  if (!selectedVideo) {
    return (
      <Container maxWidth="xl">
        <Typography variant="h5" sx={{ textAlign: 'center', my: 4 }}>
          Loading videos...
        </Typography>
      </Container>
    )
  }

  return (
    <StyledPageContainer>
      
        <Container maxWidth="xl">
        <Box
          sx={{
            background: "linear-gradient(45deg, rgba(0, 102, 255, 0.9), rgba(0, 163, 255, 0.9))",
            borderRadius: { xs: 2, md: 4 },
            boxShadow: "0 8px 32px rgba(0, 102, 255, 0.15)",
            display: "inline-block",
            px: { xs: 2, md: 4 },
            py: { xs: 2, md: 3 },
            mt: 3,
            mb: 5,
            ml: { xs: 0, md: 2 },
            width: { xs: "100%", md: "auto" },
          }}
        >
<Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: isMobile ? 2 : 4,
              py: 2,
              flexWrap: "wrap",
              "&:hover .filled": {
                color: "transparent",
                textStroke: "1px #fff",
                WebkitTextStroke: "1px #fff",
              },
              "&:hover .outlined": {
                color: "#fff",
                textStroke: "none",
                WebkitTextStroke: "none",
              },
              ".filled, .outlined": {
                transition: "all 0.3s ease",
              },
            }}
          >
            <Typography
              variant={isMobile ? "h4" : "h2"}
              className="filled"
              sx={{
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              OUR
            </Typography>
            <Typography
              variant={isMobile ? "h4" : "h2"}
              className="outlined"
              sx={{
                color: "transparent",
                fontWeight: "bold",
                textStroke: "1px #fff",
                WebkitTextStroke: "1px #fff",
              }}
            >
              MEDIA
            </Typography>
            <Typography
              variant={isMobile ? "h4" : "h2"}
              className="filled"
              sx={{
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              GALLERY
            </Typography>
          </Box>
        </Box>
          
        </Container>
      

      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
          }}
        >
          <Box sx={{ flex: 2 }}>
            <StyledVideoCard elevation={0}>
              <CardContent sx={{ p: 0 }}>
                <VideoPlayer video={selectedVideo} playerRef={playerRef} />
              </CardContent>
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    background: "linear-gradient(45deg, #0066FF 30%, #00A3FF 90%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {selectedVideo.title}
                </Typography>
                <StyledPreviewContainer>
                  <PreviewBar previews={selectedVideo.previews} onPreviewClick={handlePreviewClick} />
                </StyledPreviewContainer>
              </CardContent>
            </StyledVideoCard>
          </Box>
          <Box sx={{ flex: 1 }}>
            <StyledVideoList>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  pb: 2,
                  borderBottom: "2px solid rgba(0, 102, 255, 0.1)",
                  fontWeight: 600,
                }}
              >
                Video Library
              </Typography>
              {videos.map((video) => (
                <StyledVideoListItem
                  key={video.id}
                  button
                  active={selectedVideo.id === video.id}
                  onClick={() => handleVideoClick(video)}
                >
                  <ListItemAvatar>
                    {video.thumbnail && !failedVideoThumbnails.has(video.id) ? (
                      <Avatar
                        variant="rounded"
                        src={video.thumbnail}
                        alt={video.title}
                        onError={() => handleThumbnailError(video.id)}
                        sx={{
                          width: 120,
                          height: 68,
                          mr: 2,
                          borderRadius: 1,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                      >
                        <PlayCircleOutline />
                      </Avatar>
                    ) : (
                      <Box
                        sx={{
                          width: 120,
                          height: 68,
                          mr: 2,
                          borderRadius: 1,
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          background: "linear-gradient(45deg, rgba(0,102,255,0.05), rgba(0,163,255,0.05))",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <PlayCircleOutline sx={{ color: "rgba(0,102,255,0.5)", fontSize: 32 }} />
                      </Box>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={video.title}
                    primaryTypographyProps={{
                      noWrap: true,
                      fontWeight: selectedVideo.id === video.id ? 600 : 400,
                    }}
                  />
                </StyledVideoListItem>
              ))}
            </StyledVideoList>
          </Box>
        </Box>
      </Container>
    </StyledPageContainer>
  )
}

function PreviewBar({ previews, onPreviewClick }) {
  const [failedThumbnails, setFailedThumbnails] = useState(new Set())

  const handleImageError = (index) => {
    setFailedThumbnails(prev => new Set([...prev, index]))
  }

  return (
    <Box sx={{ overflowX: "auto", whiteSpace: "nowrap", py: 1 }}>
      {previews.map((preview, index) => (
        <Box
          key={index}
          component="span"
          sx={{
            display: "inline-block",
            position: "relative",
            mr: 1,
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 4px 12px rgba(0,102,255,0.2)",
            },
          }}
          onClick={() => onPreviewClick(preview.time)}
        >
          {preview.thumbnail && !failedThumbnails.has(index) ? (
            <Box
              component="img"
              src={preview.thumbnail}
              alt={`Preview ${index + 1}`}
              onError={() => handleImageError(index)}
              sx={{
                width: 100,
                height: 60,
                objectFit: "cover",
                borderRadius: "8px",
                border: "2px solid rgba(0,102,255,0.1)",
              }}
            />
          ) : (
            <Box
              sx={{
                width: 100,
                height: 60,
                borderRadius: "8px",
                border: "2px solid rgba(0,102,255,0.1)",
                background: "linear-gradient(45deg, rgba(0,102,255,0.05), rgba(0,163,255,0.05))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(0,102,255,0.5)",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              {Math.floor(preview.time / 60)}:{(preview.time % 60).toString().padStart(2, '0')}
            </Box>
          )}
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              bottom: 4,
              right: 4,
              bgcolor: "rgba(0,0,0,0.7)",
              color: "white",
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontSize: "0.7rem",
              zIndex: 1,
            }}
          >
            {preview.time}s
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

function VideoPlayer({ video, playerRef }) {
  const iframeRef = useRef(null)

  useEffect(() => {
    const initializePlayer = () => {
      if (iframeRef.current && window.YT) {
        if (playerRef.current) {
          playerRef.current.destroy()
        }

        const videoId = video.url.includes('embed/') 
          ? video.url.split('embed/')[1].split('?')[0]
          : video.url.split('v=')[1]?.split('&')[0]

        if (videoId) {
          playerRef.current = new window.YT.Player(iframeRef.current, {
            videoId: videoId,
            playerVars: {
              autoplay: 1,
              controls: 1,
              rel: 0,
              showinfo: 0,
              modestbranding: 1,
              enablejsapi: 1
            },
            events: {
              onReady: (event) => {
                playerRef.current = event.target
              }
            }
          })
        }
      }
    }

    // Wait for YouTube API to be ready
    if (window.YT && window.YT.Player) {
      initializePlayer()
    } else {
      // If YouTube API is not ready yet, wait for it
      window.onYouTubeIframeAPIReady = initializePlayer
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [video.url, playerRef])

  return (
    <Box sx={{ position: "relative", paddingTop: "56.25%", overflow: "hidden" }}>
      <Box
        component="div"
        ref={iframeRef}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: 0,
          borderRadius: "16px 16px 0 0",
        }}
      />
    </Box>
  )
}
