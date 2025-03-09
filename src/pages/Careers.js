import { useState, useCallback, useEffect } from "react"
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  useTheme,
  Button,
  Box,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { db, collection, getDocs } from "../components/firebase"
import { ApplyModal } from "./ApplyModal"
import { JobDetailsModal } from "./JobDetailsModal"
import axios from "axios"
import Background from "../images/background-page.jpg"

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
})

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  borderRadius: theme.spacing(2),
  border: "1px solid rgba(0, 102, 255, 0.1)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0, 102, 255, 0.1)",
  "&:hover": {
    boxShadow: "0 8px 24px rgba(0, 102, 255, 0.15)",
  },
}))

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  background: "linear-gradient(135deg, rgba(0, 102, 255, 0.05), rgba(0, 163, 255, 0.05))",
  borderBottom: "1px solid rgba(0, 102, 255, 0.1)",
  "& .MuiTypography-root": {
    background: "linear-gradient(45deg, #0066FF 30%, #00A3FF 90%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    color: "transparent",
    fontWeight: 600,
  },
}))

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  padding: "24px",
})

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  transition: "all 0.3s ease",
  border: "1px solid transparent",
  "&:hover": {
    backgroundColor: "rgba(0, 102, 255, 0.05)",
    transform: "translateX(8px)",
    border: "1px solid rgba(0, 102, 255, 0.1)",
  },
  "&.Mui-selected": {
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    borderColor: "rgba(0, 102, 255, 0.2)",
    "&:hover": {
      backgroundColor: "rgba(0, 102, 255, 0.15)",
    },
  },
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(1.5),
    transition: "all 0.3s ease",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 1)",
      boxShadow: "0 4px 12px rgba(0, 102, 255, 0.1)",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 102, 255, 0.1)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 102, 255, 0.3)",
  },
}))

const Careers = () => {
  const [jobPostings, setJobPostings] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    resume: null,
    cv: null,
  })
  const [showJobModal, setShowJobModal] = useState(false)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const fetchJobPostings = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "jobPostings"))
      const postings = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setJobPostings(postings)
    } catch (error) {
      console.error("Error fetching job postings: ", error)
    }
  }, [])

  useEffect(() => {
    fetchJobPostings()
  }, [fetchJobPostings])

  const filteredJobs = jobPostings.filter((job) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(searchTerm) ||
      job.description.toLowerCase().includes(searchTerm)
    );
  });

  const handleJobSelect = (job) => {
    setSelectedJob(job)
    if (isMobile) {
      setShowJobModal(true)
    }
  }

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleFileUpload = useCallback((e) => {
    const { name, files } = e.target
    setFormData((prev) => ({ ...prev, [name]: files[0] }))
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Form submission to backend for email sending
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("resume", formData.resume);
      formDataToSubmit.append("cv", formData.cv);
      formDataToSubmit.append("jobId", selectedJob?.id);
      formDataToSubmit.append("jobTitle", selectedJob?.title);

      try {
        setIsSubmitting(true);
        const response = await axios.post("http://localhost:5000/send-email", formDataToSubmit, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Form submitted:", response.data);
        alert("Application submitted successfully!");
        setShowApplyModal(false);
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit application. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, selectedJob, setShowApplyModal]
  );

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
              CAREER
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
              OPPORTUNITIES
            </Typography>
          </Box>
        </Box>

        <Box 
          display="grid" 
          gridTemplateColumns={{
            xs: "1fr",
            md: "1fr 1fr 1fr"
          }}
          gap={4}
          sx={{ 
            width: '100%',
            opacity: 0,
            animation: "fadeIn 0.6s ease-out forwards",
            "@keyframes fadeIn": {
              from: { opacity: 0, transform: "translateY(20px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <StyledCard>
            <StyledCardHeader title="Job Postings" />
            <StyledCardContent>
              <StyledTextField
                fullWidth
                variant="outlined"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 2 }}
              />
              <List sx={{ 
                maxHeight: "70vh", 
                overflowY: "auto",
                "&::-webkit-scrollbar": {
                  width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "rgba(0, 0, 0, 0.05)",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(0, 102, 255, 0.3)",
                  borderRadius: "4px",
                  "&:hover": {
                    background: "rgba(0, 102, 255, 0.5)",
                  },
                },
              }}>
                {filteredJobs.map((job) => (
                  <StyledListItem
                    key={job.id}
                    button
                    onClick={() => handleJobSelect(job)}
                    selected={selectedJob?.id === job.id}
                  >
                    <ListItemText 
                      primary={
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "primary.main" }}>
                          {job.title}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {job.shortDesc}
                        </Typography>
                      }
                    />
                  </StyledListItem>
                ))}
              </List>
            </StyledCardContent>
          </StyledCard>

          {!isMobile && (
            <>
              <StyledCard>
                <StyledCardHeader title="Job Details" />
                <StyledCardContent>
                  {selectedJob ? (
                    <>
                      <Typography 
                        variant="h6" 
                        gutterBottom
                        sx={{
                          background: "linear-gradient(45deg, #0066FF 30%, #00A3FF 90%)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          color: "transparent",
                          fontWeight: 600,
                          mb: 3,
                        }}
                      >
                        {selectedJob.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.7,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: selectedJob.description,
                        }}
                      />
                    </>
                  ) : (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "text.secondary",
                        textAlign: "center",
                        py: 4,
                      }}
                    >
                      Select a job to view details.
                    </Typography>
                  )}
                </StyledCardContent>
              </StyledCard>

              <StyledCard>
                <StyledCardHeader title="Apply for the Job" />
                <StyledCardContent>
                  <ApplyModal
                    selectedJob={selectedJob}
                    formData={formData}
                    onInputChange={handleInputChange}
                    onFileUpload={handleFileUpload}
                    onSubmit={handleSubmit}
                    fullWidth
                    isSubmitting={isSubmitting}
                  />
                </StyledCardContent>
              </StyledCard>
            </>
          )}
        </Box>

        {isMobile && (
          <>
            <JobDetailsModal
              open={showJobModal}
              onClose={() => setShowJobModal(false)}
              selectedJob={selectedJob}
              onApply={() => {
                setShowJobModal(false)
                setShowApplyModal(true)
              }}
            />

            <Dialog 
              open={showApplyModal} 
              onClose={() => setShowApplyModal(false)} 
              fullScreen
              PaperProps={{
                sx: {
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.98))",
                }
              }}
            >
              <DialogTitle sx={{
                background: "linear-gradient(45deg, rgba(0, 102, 255, 0.9), rgba(0, 163, 255, 0.9))",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <Typography variant="h6">
                  Apply for {selectedJob?.title}
                </Typography>
                <Button 
                  onClick={() => setShowApplyModal(false)} 
                  sx={{ 
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    }
                  }}
                >
                  Close
                </Button>
              </DialogTitle>
              <DialogContent sx={{ p: 3 }}>
                <ApplyModal
                  selectedJob={selectedJob}
                  formData={formData}
                  onInputChange={handleInputChange}
                  onFileUpload={handleFileUpload}
                  onSubmit={handleSubmit}
                  fullWidth
                  isSubmitting={isSubmitting}
                />
              </DialogContent>
            </Dialog>
          </>
        )}
      </Container>
    </Box>
  )
}

export default Careers

