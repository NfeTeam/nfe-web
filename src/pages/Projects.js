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
import { db, collection, getDocs, doc, getDoc } from "../components/firebase";
import Background from "../images/background-page.jpg";
import getMediaUrl from "../components/MediaUrl";
import VideoBanner from "../components/VideoBanner";

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
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 24px rgba(0, 102, 255, 0.15)",
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontWeight: 600,
  borderRadius: theme.spacing(2),
  transition: "all 0.3s ease-in-out",
  padding: {
    xs: "6px 12px",
    sm: "10px 20px",
    md: "14px 30px",
  },
  minWidth: "auto",
  flexGrow: 1,
  maxWidth: {
    xs: "90px",
    sm: "180px",
    md: "270px",
  },
  marginRight: {
    xs: theme.spacing(1),
    md: theme.spacing(3),
  },
  "&:last-child": {
    marginRight: 0,
  },
  "& .MuiTab-wrapper": {
    fontSize: "inherit",
    fontWeight: 700,
  },
  [theme.breakpoints.up("xs")]: {
    fontSize: "0.9rem !important",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.1rem !important",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.4rem !important",
  },
  backgroundColor: "rgba(0, 102, 255, 0.1)",
  color: "#004080",
  "&.Mui-selected": {
    background: "linear-gradient(45deg, #0066FF, #00A3FF)",
    color: "#fff !important",
    boxShadow: "0 4px 12px rgba(0, 102, 255, 0.4)",
    transform: "scale(1)",
  },
  "&:hover": {
    backgroundColor: "rgba(0, 102, 255, 0.2)",
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
  const [videoUrl, setVideoUrl] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [description,setDescription] = useState("This section provides an overview of the projects, highlighting key features and objectives. This section provides an overview of the projects, highlighting key features and objectives. This section provides an overview of the projects, highlighting key features and objectives. This section provides an overview of the projects, highlighting key features and objectives. This section provides an overview of the projects, highlighting key features and objectives.")
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  useEffect(() => {
    const fetchVideoUrl = async () => {
      const videoDocRef = doc(db, "additionalVideos", "projectsVideo");
      const videoDoc = await getDoc(videoDocRef);
      if (videoDoc.exists()) {
        const videoId = videoDoc
          .data()
          .videoUrl.split("/embed/")[1]
          .split("?")[0];
        setVideoUrl(
          `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=1`
        );
      } else {
        console.log("No such document!");
      }
    };

    fetchVideoUrl();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
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
      <VideoBanner videoUrl={videoUrl} title="OUR PROJECTS" description={description} />
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 }, mb: 0 }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mb: 0,
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
            }}
          >
            {["Completed", "Ongoing", "Upcoming"].map((label, index) => (
              <StyledTab key={label} label={label} />
            ))}
          </Tabs>
        </Box>

        <Box>
          {[completedProjects, ongoingProjects, upcomingProjects].map(
            (projects, tabIndex) =>
              activeTab === tabIndex && (
                <Box
                  key={tabIndex}
                  display="grid"
                  gridTemplateColumns={{
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
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
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;
