import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material"
import { styled } from "@mui/material/styles"

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

const FileUploadButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1.5, 3),
  textTransform: "none",
  fontWeight: 500,
  border: "1px dashed rgba(0, 102, 255, 0.3)",
  backgroundColor: "rgba(0, 102, 255, 0.05)",
  color: theme.palette.primary.main,
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(0, 102, 255, 0.1)",
    borderColor: theme.palette.primary.main,
  },
}))

const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1.5, 4),
  textTransform: "none",
  fontWeight: 600,
  background: "linear-gradient(45deg, #0066FF, #00A3FF)",
  color: "white",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(45deg, #0052CC, #0088FF)",
    boxShadow: "0 4px 12px rgba(0, 102, 255, 0.2)",
  },
  "&:disabled": {
    background: "linear-gradient(45deg, #999, #BBB)",
  },
}))

const FileNameTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.875rem",
  marginTop: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  "&::before": {
    content: '"📎"',
    fontSize: "1rem",
  },
}))

const ApplyModal = ({ selectedJob, formData, onInputChange, onFileUpload, onSubmit, fullWidth = false, isSubmitting }) => {
  const isFormValid = () => {
    return (
      formData.email !== "" &&
      formData.name !== "" &&
      formData.resume !== null &&
      formData.cv !== null &&
      selectedJob !== null &&
      (formData.resume?.type === 'application/pdf' || formData.resume?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') &&
      (formData.cv?.type === 'application/pdf' || formData.cv?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ 
        display: "flex", 
        flexDirection: "column", 
        mt:3,
        gap: 3,
        animation: "fadeIn 0.5s ease-out",
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}>
        <StyledTextField
          fullWidth={fullWidth}
          label="Selected Job"
          value={selectedJob ? selectedJob.title : "None selected"}
          InputProps={{ readOnly: true }}
        />
        <StyledTextField
          fullWidth={fullWidth}
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
          required
        />
        <StyledTextField
          fullWidth={fullWidth}
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          required
        />
        
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <input
            type="file"
            name="resume"
            onChange={onFileUpload}
            required
            style={{ display: "none" }}
            id="resume-upload"
            accept=".pdf,.doc,.docx"
          />
          <label htmlFor="resume-upload">
            <FileUploadButton component="span" fullWidth>
              Upload Resume
            </FileUploadButton>
          </label>
          {formData.resume && (
            <FileNameTypography>
              {formData.resume.name}
            </FileNameTypography>
          )}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <input 
            type="file" 
            name="cv" 
            onChange={onFileUpload} 
            required 
            style={{ display: "none" }} 
            id="cv-upload"
            accept=".pdf,.doc,.docx"
          />
          <label htmlFor="cv-upload">
            <FileUploadButton component="span" fullWidth>
              Upload CV
            </FileUploadButton>
          </label>
          {formData.cv && (
            <FileNameTypography>
              {formData.cv.name}
            </FileNameTypography>
          )}
        </Box>

        <Typography 
          variant="caption" 
          sx={{ 
            color: "text.secondary",
            backgroundColor: "rgba(0, 102, 255, 0.05)",
            p: 1.5,
            borderRadius: 1,
            border: "1px solid rgba(0, 102, 255, 0.1)",
          }}
        >
          Only PDF or Word documents are allowed
        </Typography>

        <Typography 
          variant="caption" 
          sx={{ 
            color: "text.secondary",
            fontFamily: "monospace",
          }}
        >
          Job ID: {selectedJob ? selectedJob.id : "None selected"}
        </Typography>

        <SubmitButton
          type="submit"
          fullWidth
          disabled={isSubmitting || !isFormValid()}
        >
          {isSubmitting ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CircularProgress size={20} color="inherit" />
              <span>Submitting...</span>
            </Box>
          ) : (
            "Submit Application"
          )}
        </SubmitButton>
      </Box>
    </form>
  )
}

export { ApplyModal }

