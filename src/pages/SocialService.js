import React, { useEffect, useState,useRef } from "react";
import {
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { db, collection, getDocs } from "../components/firebase";
import getMediaUrl from "../components/MediaUrl";
import Background from "../images/background-page-3.jpg";
import * as d3 from "d3";
import cloud from "d3-cloud";

const words = [
  { text: "SOCIAL", size: 100 },
  { text: "WORKER", size: 80 },
  { text: "PEOPLE", size: 60 },
  { text: "HELP", size: 40 },
  { text: "COMMUNICATION", size: 30 },
  { text: "HEALTH", size: 20 },
  { text: "ASSISTANCE", size: 10 },
  { text: "COMMUNITY", size: 100 },
  { text: "DEVELOPMENT", size: 90 },
  { text: "HOUSING", size: 85 },
  { text: "INFRASTRUCTURE", size: 80 },
  { text: "SUSTAINABILITY", size: 75 },
  { text: "EMPOWERMENT", size: 70 },
  { text: "RENOVATION", size: 65 },
  { text: "REHABILITATION", size: 60 },
  { text: "URBAN", size: 55 },
  { text: "RURAL", size: 50 },
  { text: "RECONSTRUCTION", size: 45 },
  { text: "ACCESSIBILITY", size: 40 },
  { text: "AFFORDABLE", size: 35 },
  { text: "SAFETY", size: 30 },
  { text: "TRAINING", size: 25 },
  { text: "SKILLS", size: 20 },
  { text: "OUTREACH", size: 15 },
  { text: "PARTNERSHIP", size: 10 },
];

const D3WordCloud = () => {
  const ref = useRef();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const containerWidth = ref.current.parentElement.offsetWidth;
    // For mobile: use square shape with smaller width
    // For desktop: use original rectangular shape
    const width = isMobile ? Math.min(containerWidth, 350) : Math.min(containerWidth, 800);
    const height = isMobile ? width : width * 0.6; // Square for mobile, original ratio for desktop

    // Adjust font sizes for mobile
    const getResponsiveFontSize = (size) => {
      if (isMobile) {
        return size * 0.6; // Reduce font size by 40% on mobile
      }
      return size;
    };

    const layout = cloud()
      .size([width, height])
      .words(words)
      .padding(isMobile ? 3 : 5)
      .rotate(() => (Math.random() > 0.5 ? 0 : 90))
      .fontSize((d) => getResponsiveFontSize(d.size))
      .on("end", draw);

    layout.start();

    function draw(words) {
      // Clear any existing SVG
      d3.select(ref.current).selectAll("svg").remove();

      const svg = d3.select(ref.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

      // Add gradient definition
      const gradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "wordcloud-gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%");

      gradient.append("stop")
        .attr("offset", "0%")
        .attr("style", "stop-color:#0066FF;stop-opacity:1");

      gradient.append("stop")
        .attr("offset", "100%")
        .attr("style", "stop-color:#00A3FF;stop-opacity:1");

      // Add white background rectangle
      svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "white");

      const wordsGroup = svg.append("g")
        .attr("transform", `translate(${width/2},${height/2})`)
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style("font-family", "Arial, sans-serif")
        .style("font-weight", (d) => d.size > 40 ? "bold" : "normal")
        .style("fill", "url(#wordcloud-gradient)")
        .attr("text-anchor", "middle")
        .attr("transform", (d) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        .text((d) => d.text)
        .style("opacity", 0)
        .transition()
        .duration(1000)
        .style("opacity", 1);

      // Add hover effects
      d3.selectAll(wordsGroup)
        .style("cursor", "pointer")
        .on("mouseover", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .style("font-size", (d) => `${getResponsiveFontSize(d.size) * 1.1}px`)
            .style("fill", "#0066FF");
        })
        .on("mouseout", function() {
          d3.select(this)
            .transition()
            .duration(200)
            .style("font-size", (d) => `${getResponsiveFontSize(d.size)}px`)
            .style("fill", "url(#wordcloud-gradient)");
        });
    }
  }, [isMobile]);

  return (
    <div 
      ref={ref} 
      style={{ 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center',
        margin: '0 auto',
        maxWidth: isMobile ? '350px' : '900px'
      }}
    />
  );
};

const BackgroundDiv = styled('div')({
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
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 24px rgba(0, 102, 255, 0.15)",
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: "bold",
  borderRadius: theme.spacing(2),
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  padding: {
    xs: "8px 16px",
    sm: "12px 24px",
    md: "16px 40px"
  },
  minWidth: "auto",
  flexGrow: 1,
  maxWidth: {
    xs: "110px",
    sm: "200px",
    md: "300px"
  },
  marginRight: {
    xs: theme.spacing(1),
    md: theme.spacing(3)
  },
  "&:last-child": {
    marginRight: 0,
  },
  "& .MuiTab-wrapper": {
    fontSize: "inherit",
  },
  [theme.breakpoints.up('xs')]: {
    fontSize: "0.9rem !important",
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: "1.1rem !important",
  },
  [theme.breakpoints.up('md')]: {
    fontSize: "1.4rem !important",
  },
  "&.Mui-selected": {
    background: "linear-gradient(45deg, #0066FF, #00A3FF)",
    color: "#fff !important",
    boxShadow: "0 4px 12px rgba(0, 102, 255, 0.2)",
  },
  "&:hover": {
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    color: "#0066FF",
  },
}));

const ServiceTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  background: "linear-gradient(45deg, #0066FF 30%, #00A3FF 90%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
}));

const ServiceDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 250,
  objectFit: "cover",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const WordCloudContainer = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.9)",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  boxShadow: "0 4px 12px rgba(0, 102, 255, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 8px 24px rgba(0, 102, 255, 0.15)",
  },
  "& svg": {
    maxWidth: "100%",
    height: "auto",
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
  }
}));

const SocialService = () => {
  const [serviceData, setServiceData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "socialServices"));
      const services = querySnapshot.docs.map((doc) => {
        const service = { id: doc.id, ...doc.data() };
        service.mediaUrl = getMediaUrl(service.imageUrl, service.type);
        return service;
      });
      setServiceData(services);
    };

    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const filterServices = (status) => serviceData.filter((service) => service.status === status);

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
              SOCIAL
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

        <WordCloudContainer>
          <D3WordCloud />
        </WordCloudContainer>

        <Box 
          sx={{ 
            width: "100%", 
            display: "flex", 
            justifyContent: "center",
            mb: 6,
            overflow: "hidden",
            px: { xs: 1, sm: 2, md: 4 },
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            scrollButtons={false}
            sx={{
              minHeight: { xs: 45, sm: 60, md: 80 },
              maxWidth: { md: "1200px" },
              width: "100%",
              "& .MuiTabs-indicator": {
                display: "none",
              },
              "& .MuiTabs-flexContainer": {
                gap: { xs: 1, sm: 2, md: 3 },
                justifyContent: "center",
              },
              "& .MuiTab-root": {
                fontSize: {
                  xs: "0.9rem",
                  sm: "1.1rem",
                  md: "1.4rem"
                }
              }
            }}
          >
            {["Completed", "Ongoing", "Upcoming"].map((label, index) => (
              <StyledTab key={label} label={label} />
            ))}
          </Tabs>
        </Box>

        <Box>
          {["completed", "ongoing", "upcoming"].map((status, tabIndex) => (
            activeTab === tabIndex && (
              <Box
                key={tabIndex}
                display="grid"
                gridTemplateColumns={{
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)"
                }}
                gap={4}
                sx={{
                  opacity: 1,
                  transform: "translateY(0)",
                  transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {filterServices(status).map((service) => (
                  <StyledCard key={service.id}>
                    {service.type === "video" ? (
                      <StyledCardMedia
                        component="iframe"
                        src={service.mediaUrl}
                        title={service.title}
                        sx={{ border: "none" }}
                        allowFullScreen
                      />
                    ) : (
                      <StyledCardMedia
                        component="img"
                        image={service.mediaUrl}
                        alt={service.title}
                      />
                    )}
                    <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                      <ServiceTitle variant="h6">
                        {service.title}
                      </ServiceTitle>
                      <ServiceDescription variant="body2">
                        {service.description}
                      </ServiceDescription>
                    </CardContent>
                  </StyledCard>
                ))}
              </Box>
            )
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default SocialService;
