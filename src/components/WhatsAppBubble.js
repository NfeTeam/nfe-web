import { Box, styled, keyframes } from "@mui/material"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`

const WhatsAppBubble = styled(Box)(({ theme }) => ({
  position: "fixed",
  bottom: "10%",
  right: theme.spacing(2),
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: "#25D366",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
  zIndex: 1000,
  animation: `${floatAnimation} 3s ease-in-out infinite`,
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.05)",
    animation: "none",
    "& svg": {
      color: "#128C7E", // Darker green color for the icon on hover
    }
  },
  [theme.breakpoints.down("sm")]: {
    width: "50px",
    height: "50px",
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
      <WhatsAppIcon fontSize="large" />
    </WhatsAppBubble>
  )
}

export default WhatsAppBubbleComponent