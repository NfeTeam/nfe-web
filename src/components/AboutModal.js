import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useState, useEffect } from "react"
import { db, collection, doc, getDoc } from "./firebase"
import CircularProgress from "@mui/material/CircularProgress"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.98))",
    borderRadius: theme.spacing(2),
    overflow: "hidden",
    maxWidth: "800px",
    margin: theme.spacing(2),
  },
}))

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: "linear-gradient(45deg, rgba(0, 102, 255, 0.9), rgba(0, 163, 255, 0.9))",
  color: "white",
  padding: theme.spacing(3),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(4),
  "& p": {
    color: theme.palette.text.secondary,
    lineHeight: 1.7,
    marginBottom: theme.spacing(2),
  },
}))

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  background: "rgba(0, 102, 255, 0.02)",
  borderTop: "1px solid rgba(0, 102, 255, 0.1)",
}))

const ActionButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1, 3),
  textTransform: "none",
  fontWeight: 600,
  ...(variant === "contained" ? {
    background: "linear-gradient(45deg, #0066FF, #00A3FF)",
    color: "white",
    "&:hover": {
      background: "linear-gradient(45deg, #0052CC, #0088FF)",
      boxShadow: "0 4px 12px rgba(0, 102, 255, 0.2)",
    },
  } : {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "rgba(0, 102, 255, 0.1)",
    },
  }),
}))

const AboutModal = ({ open, onClose }) => {
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const aboutRef = doc(collection(db, "about"), "aboutData")
        const aboutSnap = await getDoc(aboutRef)
        
        if (aboutSnap.exists()) {
          setAboutData(aboutSnap.data())
        } else {
          console.error("No about data found!")
        }
      } catch (error) {
        console.error("Error fetching about data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (open) {
      fetchAboutData()
    }
  }, [open])

  if (!open) return null

  return (
    <StyledDialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      <StyledDialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          About {aboutData?.company?.name || "Loading..."}
        </Typography>
        <ActionButton onClick={onClose}>
          Close
        </ActionButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{
            opacity: 0,
            animation: "fadeIn 0.5s ease-out forwards",
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(10px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}>
            <Typography variant="body1" paragraph>
              Founded on {aboutData?.company?.foundedDate}, {aboutData?.company?.name} is {aboutData?.company?.description}
            </Typography>

            <Typography variant="h6" sx={{ color: 'primary.main', mt: 3, mb: 2 }}>
              Our Leadership
            </Typography>
            
            {aboutData?.leadership?.map((leader, index) => (
              <Typography key={index} variant="body1" paragraph>
                <strong>{leader.role} - {leader.name}</strong>
                <br />
                {leader.qualification}
              </Typography>
            ))}

            <Typography variant="h6" sx={{ color: 'primary.main', mt: 3, mb: 2 }}>
              Our Location
            </Typography>
            
            <Typography variant="body1">
              Headquartered in {aboutData?.location?.city}, {aboutData?.location?.state}, {aboutData?.company?.name} {aboutData?.location?.description}.
            </Typography>
          </Box>
        )}
      </StyledDialogContent>

      <StyledDialogActions>
        <ActionButton onClick={onClose} variant="contained">
          Close
        </ActionButton>
      </StyledDialogActions>
    </StyledDialog>
  )
}

export default AboutModal 