"use client"
import { FaFacebookF, FaYoutube, FaTwitter, FaInstagram, FaTelegram, FaLinkedinIn } from "react-icons/fa"
import { Container, Typography, Divider, Box, IconButton } from "@mui/material"
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md"

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, url: "", label: "Facebook" },
    { icon: FaYoutube, url: "https://www.youtube.com/@nfe_officialz", label: "YouTube" },
    { icon: FaTwitter, url: "https://x.com/NFE_Official24", label: "Twitter" },
    { icon: FaInstagram, url: "https://www.instagram.com/nfe_official24/", label: "Instagram" },
    { icon: FaLinkedinIn, url: "https://www.linkedin.com/in/nfeofficial24/", label: "LinkedIn" },
  ]

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: "black",
        color: "white",
        pt: 6,
        pb: 4,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(3, 207, 253, 0.5), transparent)",
        },
      }}
    >
      <Container maxWidth="lg">
        <Box 
          display="flex" 
          flexDirection={{ xs: "column", md: "row" }} 
          gap={4}
          sx={{ mb: 4 }}
        >
          <Box flex={1.5} sx={{ mb: { xs: 3, md: 0 } }}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 2,
                color: "#03cffd",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
            >
              NEW FACT ENGINEERING LTD
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                opacity: 0.9,
                lineHeight: 1.8,
                maxWidth: "400px",
              }}
            >
              We are committed to delivering innovative engineering solutions with a focus on quality, sustainability, and client satisfaction.
            </Typography>
          </Box>

          <Box flex={1}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                color: "#03cffd",
                fontWeight: "bold",
              }}
            >
              Contact Info
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MdLocationOn style={{ color: "#03cffd", fontSize: "2rem" }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  3/123B, South Street,
                  Kuruvady and Post, Ariyalur District,
                  Tamil Nadu, PIN: 621715
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MdPhone style={{ color: "#03cffd" }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                +65 84048528
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MdEmail style={{ color: "#03cffd" }} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  nfeteam24@gmail.com
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box flex={1}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2,
                color: "#03cffd",
                fontWeight: "bold",
              }}
            >
              Connect with us
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={social.label}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "white",
                    bgcolor: "rgba(3, 207, 253, 0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(3, 207, 253, 0.2)",
                      transform: "translateY(-3px)",
                      "& svg": {
                        color: "#03cffd",
                      },
                    },
                  }}
                  title={social.label}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider 
          sx={{ 
            my: 4,
            borderColor: "rgba(255, 255, 255, 0.1)",
            "&::before, &::after": {
              borderColor: "rgba(255, 255, 255, 0.1)",
            },
          }} 
        />

        <Typography 
          align="center" 
          sx={{ 
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "0.875rem",
          }}
        >
          &copy; {new Date().getFullYear()} NEW FACT ENGINEERING. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer

