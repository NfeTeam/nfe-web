import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.98))",
    borderRadius: theme.spacing(2),
    overflow: "hidden",
  },
}))

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: "linear-gradient(45deg, rgba(0, 102, 255, 0.9), rgba(0, 163, 255, 0.9))",
  color: "white",
  padding: theme.spacing(3),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(4),
  "& p, & ul, & li": {
    color: theme.palette.text.secondary,
    lineHeight: 1.7,
  },
}))

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  background: "rgba(0, 102, 255, 0.02)",
  borderTop: "1px solid rgba(0, 102, 255, 0.1)",
}))

const ActionButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(1, 3),
  textTransform: "none",
  fontWeight: 600,
  ...(variant === "contained" ? {
    background: "linear-gradient(45deg, #0066FF, #00A3FF)",
    color: "white",
    "&:hover": {
      background: "linear-gradient(45deg, #0052CC, #0088FF)",
      boxShadow: "0 4px 12px rgba(0, 102, 255, 0.2)",
    },
  } : {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "rgba(0, 102, 255, 0.1)",
    },
  }),
}))

const JobDetailsModal = ({ open, onClose, selectedJob, onApply }) => {
  return (
    <StyledDialog 
      open={open} 
      onClose={onClose} 
      fullScreen
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      <StyledDialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {selectedJob?.title}
        </Typography>
        <ActionButton onClick={onClose}>
          Close
        </ActionButton>
      </StyledDialogTitle>

      <StyledDialogContent>
        <Box sx={{
          opacity: 0,
          animation: "fadeIn 0.5s ease-out forwards",
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(10px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}>
          <Typography 
            variant="body1" 
            component="div"
            sx={{
              "& h1, & h2, & h3, & h4, & h5, & h6": {
                color: "primary.main",
                marginBottom: 2,
                marginTop: 3,
                fontWeight: 600,
                "&:first-child": {
                  marginTop: 0,
                },
              },
              "& ul": {
                paddingLeft: 3,
                marginBottom: 2,
              },
              "& li": {
                marginBottom: 1,
              },
            }}
            dangerouslySetInnerHTML={{ __html: selectedJob?.description }} 
          />
        </Box>
      </StyledDialogContent>

      <StyledDialogActions>
        <ActionButton onClick={onClose}>
          Cancel
        </ActionButton>
        <ActionButton onClick={onApply} variant="contained">
          Apply Now
        </ActionButton>
      </StyledDialogActions>
    </StyledDialog>
  )
}

export { JobDetailsModal }

