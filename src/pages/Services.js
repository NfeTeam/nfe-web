import { useEffect, useState } from "react";
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
  }
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
  padding: theme.spacing(1.5),
  "&:hover": {
    backgroundColor: "rgba(0, 102, 255, 0.05)",
    borderRadius: theme.spacing(1),
  },
}));

const Services = () => {
  const [chartImageUrl, setChartImageUrl] = useState(null);
  const [servicesData, setServicesData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(0);
  const [bimData, setBimData] = useState(null);

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
              gap: 2,
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
              ".filled": {
                transition:
                  "color 0.3s ease, text-stroke 0.3s ease, -webkit-text-stroke 0.3s ease",
              },
              ".outlined": {
                transition:
                  "color 0.3s ease, text-stroke 0.3s ease, -webkit-text-stroke 0.3s ease",
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
              BIM
            </Typography>
            <Typography
              variant={isMobile ? "h4" : "h2"}
              className="filled"
              sx={{
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              SERVICES
            </Typography>
          </Box>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)"
          }}
          gap={4}
          mb={6}
        >
          <StyledCard>
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
              <TitleTypography variant="h5" gutterBottom>
                Why Choose BIM Technology?
              </TitleTypography>
              <List sx={{ p: 0 }}>
                {bimData?.whyChoose.map((item, index) => (
                  <ListItemStyled key={index}>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="600" color="primary.main">
                          {`${index + 1}. ${item.split(":")[0]}`}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                          {item.split(":")[1]}
                        </Typography>
                      }
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
                height: 300,
                objectFit: "contain",
                p: 2,
                backgroundColor: "rgba(0, 102, 255, 0.02)"
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
            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
              <TitleTypography variant="h5" gutterBottom>
                Advantages of BIM Technology
              </TitleTypography>
              <List sx={{ p: 0 }}>
                {bimData?.advantages.map((item, index) => (
                  <ListItemStyled key={index}>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" fontWeight="600" color="primary.main">
                          {item.split(":")[0]}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                          {item.split(":")[1]}
                        </Typography>
                      }
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
            md: "repeat(3, 1fr)"
          }}
          gap={4}
          my={5}
        >
          {servicesData.map((service, index) => (
            <StyledCard key={index} onClick={() => handleRowClick(index)}>
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
                  <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
                    {service.description}
                  </Typography>
                  <List sx={{ p: 0 }}>
                    {service.items.map((item, i) => (
                      <ListItemStyled key={i}>
                        <ListItemText 
                          primary={
                            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <span style={{ color: "#0066FF" }}>⚡</span> {item}
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
