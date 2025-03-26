import { useEffect, useState, useRef } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { db, collection, getDocs, doc, getDoc } from "../components/firebase";
import getMediaUrl from "../components/MediaUrl";
// import Background from "../images/background-page-2.jpg";
import Background from "../images/background-page.jpg";
const BackgroundDiv = styled("div")({
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
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: theme.spacing(2),
  border: "1px solid rgba(0, 102, 255, 0.1)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 24px rgba(0, 102, 255, 0.15)",
  },
}));

const CardContentTransition = styled(CardContent)(({ expanded }) => ({
  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  opacity: expanded ? 1 : 0,
  maxHeight: expanded ? "2000px" : 0,
  overflow: "hidden",
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: "linear-gradient(45deg, #0066FF 30%, #00A3FF 90%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
  marginBottom: theme.spacing(2),
  textAlign: "center",
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(0.25),
  "&:hover": {
    backgroundColor: "rgba(0, 102, 255, 0.05)",
    borderRadius: theme.spacing(1),
  },
  marginTop: theme.spacing(0),
  marginBottom:theme.spacing(0)
}));

const Services = () => {
  const [chartImageUrl, setChartImageUrl] = useState(null);
  const [servicesData, setServicesData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(0);
  const [bimData, setBimData] = useState(null);
  const serviceRefs = useRef([]);
  const [isHovered, setIsHovered] = useState(false);

  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const itemsPerRow = isLg ? 3 : isMd ? 2 : 1;

  useEffect(() => {
    const fetchChartImage = async () => {
      const chartDocRef = doc(db, "additionalImages", "chart");
      const chartDocSnap = await getDoc(chartDocRef);

      if (chartDocSnap.exists()) {
        const updatedURL = getMediaUrl(chartDocSnap.data().imageUrl, "image");
        setChartImageUrl(updatedURL);
      } else {
        console.warn("No chart image found in Firestore.");
        setChartImageUrl(null);
      }
    };

    const fetchServicesData = async () => {
      const servicesQuerySnapshot = await getDocs(collection(db, "services"));
      const services = servicesQuerySnapshot.docs.map((doc) => doc.data());
      setServicesData(services);
    };

    const fetchBIMData = async () => {
      try {
        const docRef = doc(db, "bimTechnology", "bimTechnologyData");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBimData(docSnap.data());
        } else {
          console.warn("No BIM Technology data found.");
        }
      } catch (error) {
        console.error("Error fetching BIM Technology data: ", error);
      }
    };

    fetchBIMData();
    fetchChartImage();
    fetchServicesData();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const index = servicesData.findIndex(
        (service) => service.title.replace(/\s+/g, '-').toLowerCase() === hash
      );
      if (index !== -1) {
        setExpandedRow(Math.floor(index / itemsPerRow));
        setTimeout(() => {
          serviceRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 1000);
      }
    }
  }, [servicesData, itemsPerRow]);

  const shouldShowContent = (index) => {
    const rowIndex = Math.floor(index / itemsPerRow);
    return rowIndex === expandedRow;
  };

  const handleRowClick = (index) => {
    const rowIndex = Math.floor(index / itemsPerRow);
    setExpandedRow(rowIndex === expandedRow ? -1 : rowIndex);
  };

  return (
    <Box position="relative" sx={{ minHeight: "100vh" }}>
      <BackgroundDiv />
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, mb: 0, mt: 0 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            py: 0,
            mt: 0,
            pt: 0,
            top: 0,
            animation: "fadeInSlide 1.5s ease-out",
            "@keyframes fadeInSlide": {
              "0%": { opacity: 0, transform: "translateY(-30px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
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
              textAlign: "center",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            OUR BIM SERVICES
          </Typography>
        </Box>

        <Box
          sx={{
            width: isHovered ? "40%" : "120px",
            height: "4px",
            background: "linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)",
            transition: "width 0.5s ease",
            marginTop: 0,
            paddingTop:0,
            marginBottom:1,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={4}
          mb={6}
        >
          <StyledCard>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <TitleTypography variant="h6" gutterBottom sx={{mb:1}}>
                Why Choose BIM Technology?
              </TitleTypography>
              <List sx={{ p: 0 }}>
                {bimData?.whyChoose.map((item, index) => (
                  <ListItemStyled key={index}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle2"
                          fontWeight="600"
                          color="primary.main"
                        >
                          {`${index + 1}. ${item.split(":")[0]}`}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="caption"
                          sx={{ mt: 0, color: "text.secondary" }}
                        >
                          {item.split(":")[1]}
                        </Typography>
                      }
                      sx={{mt:0, mb:0}}
                    />
                  </ListItemStyled>
                ))}
              </List>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardMedia
              component="img"
              image={chartImageUrl || "/placeholder.svg"}
              alt="BIM Chart"
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                p: 2,
                backgroundColor: "rgba(0, 102, 255, 0.02)",
                position: "relative",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
            {!chartImageUrl && (
              <CardContent>
                <Typography align="center" color="text.secondary">
                  No chart image available.
                </Typography>
              </CardContent>
            )}
          </StyledCard>

          <StyledCard>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <TitleTypography variant="h6" gutterBottom sx={{mb:1}}> 
                Advantages of BIM Technology
              </TitleTypography>
              <List sx={{ p: 0}}>
                {bimData?.advantages.map((item, index) => (
                  <ListItemStyled key={index}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle2"
                          fontWeight="600"
                          color="primary.main"
                        >
                          {item.split(":")[0]}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="caption"
                          sx={{ mt: 0, color: "text.secondary" }}
                        >
                          {item.split(":")[1]}
                        </Typography>
                      }
                      sx={{mt:0, mb:0}}
                    />
                  </ListItemStyled>
                ))}
              </List>
            </CardContent>
          </StyledCard>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap={4}
          my={5}
        >
          {servicesData.map((service, index) => (
            <StyledCard
              key={index}
              ref={(el) => (serviceRefs.current[index] = el)}
              className={`service-card ${service.title.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => handleRowClick(index)}
            >
              <CardContent
                sx={{
                  background: "linear-gradient(45deg, #0066FF, #00A3FF)",
                  color: "white",
                  textAlign: "center",
                  py: 3,
                  px: { xs: 2, md: 3 },
                  borderTopLeftRadius: theme.spacing(2),
                  borderTopRightRadius: theme.spacing(2),
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: "0.5px",
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                  }}
                >
                  {service.title}
                </Typography>
              </CardContent>
              <CardContentTransition expanded={shouldShowContent(index)}>
                {service.type === "video" ? (
                  <CardMedia
                    component="iframe"
                    src={getMediaUrl(service.imageUrl, "video")}
                    title={service.title}
                    sx={{ height: 250, border: "none" }}
                  />
                ) : (
                  <CardMedia
                    component="img"
                    image={getMediaUrl(service.imageUrl, "image")}
                    alt={service.title}
                    sx={{ height: 250, objectFit: "cover" }}
                  />
                )}
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography
                    variant="body1"
                    sx={{ mb: 2, color: "text.secondary" }}
                  >
                    {service.description}
                  </Typography>
                  <List sx={{ p: 0 }}>
                    {service.items.map((item, i) => (
                      <ListItemStyled key={i}>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <span style={{ color: "#0066FF" }}>⚡</span>{" "}
                              {item}
                            </Typography>
                          }
                        />
                      </ListItemStyled>
                    ))}
                  </List>
                </CardContent>
              </CardContentTransition>
            </StyledCard>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Services;
