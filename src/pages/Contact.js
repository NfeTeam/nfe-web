import { useState } from "react"
import Background from "../images/background-page-4.jpg"
import WorldMap from "../components/WorldMap"
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  styled,
  alpha,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  AccessTime as ClockIcon,
  Person as PersonIcon,
  Subject as SubjectIcon,
  Message as MessageIcon,
  Send as SendIcon,
} from "@mui/icons-material"

const StyledBackground = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `url(${Background})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  opacity: 0.15,
  zIndex: -1,
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  }
});

// Styled components for enhanced animations
const AnimatedTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
    borderRadius: "8px",
    overflow: "hidden",
    background: alpha(theme.palette.background.paper, 0.8),
    backdropFilter: "blur(8px)",
    "&:hover": {
      boxShadow: `0 4px 20px 0 ${alpha(theme.palette.primary.main, 0.2)}`,
    },
    "&.Mui-focused": {
      transform: "translateY(-2px)",
      boxShadow: `0 6px 20px 0 ${alpha(theme.palette.primary.main, 0.3)}`,
    },
  },
  "& .MuiInputLabel-root": {
    transition: "all 0.3s ease-out",
    "&.Mui-focused": {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    transition: "border-color 0.3s ease-out",
    borderWidth: "1px",
    borderColor: alpha(theme.palette.text.primary, 0.2),
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderWidth: "2px",
    borderColor: theme.palette.primary.main,
  },
  "& .MuiInputBase-input": {
    padding: "16px 14px",
    transition: "background 0.3s ease-out",
  },
  "& .MuiInputAdornment-root": {
    color: alpha(theme.palette.text.primary, 0.5),
  },
  "& .Mui-focused .MuiInputAdornment-root": {
    color: theme.palette.primary.main,
  },
  marginBottom: theme.spacing(3),
}))

const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  padding: "12px 30px",
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  background: "linear-gradient(45deg, #0066FF, #00A3FF)",
  boxShadow: `0 4px 14px 0 ${alpha(theme.palette.primary.main, 0.4)}`,
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: `0 6px 20px 0 ${alpha(theme.palette.primary.main, 0.6)}`,
    background: "linear-gradient(45deg, #0066FF, #00A3FF)",
  },
  "&:after": {
    content: '""',
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    pointerEvents: "none",
    backgroundImage: `radial-gradient(circle, ${alpha(theme.palette.common.white, 0.3)} 10%, transparent 10.01%)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50%",
    transform: "scale(10, 10)",
    opacity: 0,
    transition: "transform .5s, opacity 1s",
  },
  "&:active:after": {
    transform: "scale(0, 0)",
    opacity: 0.3,
    transition: "0s",
  },
}))

const ContactCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px rgba(0, 102, 255, 0.12)",
  height: "100%",
  transition: "transform 0.3s ease-in-out",
  border: "1px solid rgba(0, 102, 255, 0.1)",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 48px rgba(0, 102, 255, 0.2)",
  },
  overflow: "hidden",
  position: "relative",
  "&:before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "4px",
    background: "linear-gradient(45deg, #0066FF, #00A3FF)",
  },
}))

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: theme.spacing(3),
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateX(5px)",
  },
}))

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  borderRadius: "50%",
  padding: theme.spacing(1.5),
  marginRight: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    transform: "scale(1.1)",
  },
}))

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [focused, setFocused] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  })

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const handleFocus = (field) => {
    setFocused((prev) => ({ ...prev, [field]: true }))
  }

  const handleBlur = (field) => {
    setFocused((prev) => ({ ...prev, [field]: false }))
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, subject, message } = formData
    const emailBody = `Hello NFE Team,\n\n${message}\n\nRegards,\n${name}`
    const mailtoLink = `mailto:nfeteam24@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(emailBody)}`
    window.location.href = mailtoLink
  }

  return (
    <Box position="relative" sx={{ minHeight: "100vh" }}>
      <StyledBackground />
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 }, mb: 0 }}>
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
              GET
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
              IN
            </Typography>
            <Typography
              variant={isMobile ? "h4" : "h2"}
              className="filled"
              sx={{
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              TOUCH
            </Typography>
          </Box>
        </Box>

        <Box display="flex" flexWrap="wrap" gap={4} sx={{ mt: 4 }}>
          <Box flex={1} minWidth={300}>
            <ContactCard>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    mb: 4,
                    fontWeight: 600,
                    background: "linear-gradient(45deg, #0066FF 30%, #00A3FF 90%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    position: "relative",
                    display: "inline-block",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      bottom: -8,
                      left: 0,
                      width: "40px",
                      height: "3px",
                      background: "linear-gradient(45deg, #0066FF, #00A3FF)",
                      borderRadius: "2px",
                    },
                  }}
                >
                  Send us a Message
                </Typography>

                <form onSubmit={handleSubmit}>
                  <AnimatedTextField
                    fullWidth
                    label="Your Name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus("name")}
                    onBlur={() => handleBlur("name")}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color={focused.name ? "primary" : "action"} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <AnimatedTextField
                    fullWidth
                    label="Your Email"
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color={focused.email ? "primary" : "action"} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <AnimatedTextField
                    fullWidth
                    label="Subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus("subject")}
                    onBlur={() => handleBlur("subject")}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SubjectIcon color={focused.subject ? "primary" : "action"} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <AnimatedTextField
                    fullWidth
                    label="Message"
                    id="message"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus("message")}
                    onBlur={() => handleBlur("message")}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}>
                          <MessageIcon color={focused.message ? "primary" : "action"} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <SubmitButton type="submit" variant="contained" endIcon={<SendIcon />}>
                      Send Message
                    </SubmitButton>
                  </Box>
                </form>
              </CardContent>
            </ContactCard>
          </Box>

          <Box flex={1} minWidth={300}>
            <ContactCard>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    mb: 4,
                    fontWeight: 600,
                    background: "linear-gradient(45deg, #0066FF 30%, #00A3FF 90%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    position: "relative",
                    display: "inline-block",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      bottom: -8,
                      left: 0,
                      width: "40px",
                      height: "3px",
                      background: "linear-gradient(45deg, #0066FF, #00A3FF)",
                      borderRadius: "2px",
                    },
                  }}
                >
                  Contact Information
                </Typography>

                <InfoItem>
                  <IconWrapper>
                    <LocationIcon />
                  </IconWrapper>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: "#0066FF" }}>
                      Our Location
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=3/123B+South+Street+Kuruvady+Ariyalur+District+Tamil+Nadu+PIN+621715"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        NEW FACT ENGINEERING LTD <br />
                        3/123B, South Street,<br />
                        Kuruvady and Post, Ariyalur District,<br />
                        Tamil Nadu, PIN 621715
                      </a>
                    </Typography>
                  </Box>
                </InfoItem>

                <InfoItem>
                  <IconWrapper>
                    <PhoneIcon />
                  </IconWrapper>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: "#0066FF" }}>
                      Phone Number
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <a
                        href="tel:+6584048528"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        +65 84048528
                      </a>
                    </Typography>
                  </Box>
                </InfoItem>

                <InfoItem>
                  <IconWrapper>
                    <EmailIcon />
                  </IconWrapper>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: "#0066FF" }}>
                      Email Address
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <a
                        href="mailto:nfeteam24@gmail.com"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        nfeteam24@gmail.com
                      </a>
                    </Typography>
                  </Box>
                </InfoItem>

                <InfoItem>
                  <IconWrapper>
                    <ClockIcon />
                  </IconWrapper>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: "#0066FF" }}>
                      Working Hours
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 9:00 AM - 1:00 PM
                      <br />
                      Sunday: Closed
                    </Typography>
                  </Box>
                </InfoItem>
              </CardContent>
            </ContactCard>
          </Box>
        </Box>
      </Container>

      <WorldMap />
    </Box>
  )
}

export default Contact

