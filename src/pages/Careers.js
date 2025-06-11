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
  DialogActions,
  IconButton,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { db, collection, getDocs } from "../components/firebase"
import { ApplyModal } from "./ApplyModal"
import { JobDetailsModal } from "./JobDetailsModal"
import axios from "axios"
import Background from "../images/background-page.jpg"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'

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

const AlertDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2),
    minWidth: '300px',
    maxWidth: '400px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.98))',
    boxShadow: '0 8px 32px rgba(0, 102, 255, 0.12)',
  },
}))

const AlertIcon = styled(Box)(({ theme, type }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: '48px',
    color: type === 'success' ? '#4CAF50' : '#f44336',
  },
}))

const AlertTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
}))

const AlertMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}))

const AlertButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  fontWeight: 600,
  background: 'linear-gradient(45deg, #0066FF, #00A3FF)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(45deg, #0052CC, #0088FF)',
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
  const [isHovered, setIsHovered] = useState(false)
  const [alertDialog, setAlertDialog] = useState({
    open: false,
    type: 'success',
    title: '',
    message: '',
  })

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
        const response = await axios.post("https://nfe-back-git-master-nfe-teams-projects.vercel.app/api/send-email", formDataToSubmit, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Form submitted:", response.data);
        setAlertDialog({
          open: true,
          type: 'success',
          title: 'Success!',
          message: 'Application submitted successfully!',
        });
        setShowApplyModal(false);
      } catch (error) {
        console.error("Error submitting form:", error);
        setAlertDialog({
          open: true,
          type: 'error',
          title: 'Error',
          message: 'Failed to submit application. Please try again later.',
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, selectedJob, setShowApplyModal]
  );

  const handleCloseAlert = () => {
    setAlertDialog(prev => ({ ...prev, open: false }));
  };

  return (
    <Box position="relative" sx={{ minHeight: "100vh" }}>
      <BackgroundDiv />
      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, mb: 0,}}>
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
            CAREER OPPORTUNITIES
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

      <AlertDialog
        open={alertDialog.open}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <AlertIcon type={alertDialog.type}>
            {alertDialog.type === 'success' ? <CheckCircleIcon /> : <ErrorIcon />}
          </AlertIcon>
          <AlertTitle variant="h6" id="alert-dialog-title">
            {alertDialog.title}
          </AlertTitle>
          <AlertMessage variant="body1" id="alert-dialog-description">
            {alertDialog.message}
          </AlertMessage>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <AlertButton onClick={handleCloseAlert} autoFocus>
            OK
          </AlertButton>
        </DialogActions>
      </AlertDialog>
    </Box>
  )
}

export default Careers

