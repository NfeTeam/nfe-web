import { Box, styled, Typography } from "@mui/material"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"

const WhatsAppBubble = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: "10%",
  right: theme.spacing(2),
  width: "300px",
  borderRadius: "20px",
  backgroundColor: "#25D366",
  color: "white",
  padding: theme.spacing(2),
  boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  transition: "transform 0.3s",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "200px",
    padding: theme.spacing(1.5),
    right: theme.spacing(1),
    bottom: "10%",
  }
}))

const WhatsAppBubbleComponent = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+6584048528" 
    const message = "Hello, I would like to know more about New Fact Engineering services."
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <WhatsAppBubble onClick={handleWhatsAppClick}>
      <WhatsAppIcon fontSize="large" sx={{ mr: 2 }} />
      <Box>
        <Typography variant="h6" sx={{ m: 0, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Chat with us!
        </Typography>
        <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
          Tap to start a chat
        </Typography>
      </Box>
    </WhatsAppBubble>
  )
}

export default WhatsAppBubbleComponent