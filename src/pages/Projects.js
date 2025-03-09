import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  styled,
  Card,
  CardMedia,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { db, collection, getDocs } from "../components/firebase";
import Background from "../images/background-page.jpg";
import getMediaUrl from "../components/MediaUrl";

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

const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
  background: "linear-gradient(45deg, #0066FF 30%, #00A3FF 90%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  color: "transparent",
}));

const ProjectDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
}));

const renderMedia = (project) => {
  if (project.type === "video") {
    return (
      <CardMedia
        component="iframe"
        src={project.mediaUrl}
        sx={{ height: 200, objectFit: "cover", pointerEvents: "auto" }}
        allowFullScreen
        allow="autoplay; encrypted-media"
        title={project.title}
      />
    );
  }
  return (
    <CardMedia
      component="img"
      height="200"
      image={project.mediaUrl}
      alt={project.title}
      sx={{ objectFit: "cover" }}
    />
  );
};

const Projects = () => {
  const [projectData, setProjectData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projects = querySnapshot.docs.map((doc) => {
        const project = { id: doc.id, ...doc.data() };
        project.mediaUrl = getMediaUrl(project.imageUrl, project.type);
        return project;
      });
      setProjectData(projects);
    };

    fetchData();
  }, []);

  const completedProjects = projectData.filter(
    (project) => project.status === "completed"
  );
  const ongoingProjects = projectData.filter(
    (project) => project.status === "ongoing"
  );
  const upcomingProjects = projectData.filter(
    (project) => project.status === "upcoming"
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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
              PROJECTS
            </Typography>
          </Box>
        </Box>

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
          {[completedProjects, ongoingProjects, upcomingProjects].map((projects, tabIndex) => (
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
                {projects.map((project) => (
                  <StyledCard key={project.id}>
                    {renderMedia(project)}
                    <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                      <ProjectTitle variant="h6">
                        {project.title}
                      </ProjectTitle>
                      <ProjectDescription variant="body2">
                        {project.description}
                      </ProjectDescription>
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

export default Projects;
