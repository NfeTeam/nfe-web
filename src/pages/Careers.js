import React, { useState, useCallback, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Card,
  Modal,
} from "react-bootstrap";
import axios from "axios"; // Import axios for API requests
import "bootstrap/dist/css/bootstrap.min.css";
import { db, collection, getDocs } from "../components/firebase";

// Move these components outside and above the Careers component
const JobDetailsModal = ({ show, onHide, selectedJob, onApply }) => (
  <Modal show={show} onHide={onHide} className="d-md-none">
    <Modal.Header closeButton>
      <Modal.Title>{selectedJob?.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div dangerouslySetInnerHTML={{ __html: selectedJob?.description }} />
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
      <Button variant="primary" onClick={onApply}>
        Apply
      </Button>
    </Modal.Footer>
  </Modal>
);

const ApplyModal = ({
  show,
  onHide,
  selectedJob,
  formData,
  onInputChange,
  onFileUpload,
  onSubmit,
}) => (
  <Modal show={show} onHide={onHide} className="d-md-none">
    <Modal.Header closeButton>
      <Modal.Title>Apply for {selectedJob?.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Upload Resume</Form.Label>
          <Form.Control
            type="file"
            name="resume"
            onChange={onFileUpload}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Upload CV</Form.Label>
          <Form.Control
            type="file"
            name="cv"
            onChange={onFileUpload}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Job ID: {selectedJob ? selectedJob.id : "None selected"}
          </Form.Label>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Application
        </Button>
      </Form>
    </Modal.Body>
  </Modal>
);

const Careers = () => {
  const [jobPostings, setJobPostings] = useState([]); // Initialize state for job postings
  const fetchJobPostings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "jobPostings"));
      const postings = [];
      querySnapshot.forEach((doc) => {
        postings.push({ id: doc.id, ...doc.data() }); // Add document ID and data to postings array
      });
      setJobPostings(postings); // Update state with fetched job postings
    } catch (error) {
      console.error("Error fetching job postings: ", error);
    }
  };

  // Call fetchJobPostings when the component mounts
  useEffect(() => {
    fetchJobPostings();
  }, []);

  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    resume: null,
    cv: null,
  });
  const [showJobModal, setShowJobModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const filteredJobs = jobPostings.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    // Only show modal on mobile devices
    if (window.innerWidth < 768) {
      setShowJobModal(true);
    }
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFileUpload = useCallback((e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  }, []);

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
      }
    },
    [formData, selectedJob]
  );

  return (
    <Container fluid className="mt-4">
      <Row>
        {/* Left Column: Job Postings */}
        <Col md={4} className="mb-4">
          <Card className="border-light shadow-sm">
            <Card.Header className="bg-white border-bottom-0">
              <h4 className="mb-3">Job Postings</h4>
              <Form.Control
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-light"
              />
            </Card.Header>
            <ListGroup variant="flush">
              {filteredJobs.map((job) => (
                <ListGroup.Item
                  key={job.id}
                  action
                  onClick={() => handleJobSelect(job)}
                  active={selectedJob?.id === job.id}
                  className="border-0"
                >
                  <h5 className="mb-1">{job.title}</h5>
                  <p className="mb-0 text-muted">{job.shortDesc}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* Middle Column: Job Details (visible only on larger screens) */}
        <Col md={4} className="mb-4 d-none d-md-block">
          <Card className="border-light shadow-sm h-100">
            <Card.Header className="bg-white border-bottom-0">
              <h4>Job Details</h4>
            </Card.Header>
            <Card.Body>
              {selectedJob ? (
                <>
                  <h5 className="mb-3">{selectedJob.title}</h5>
                  <div
                    className="text-muted"
                    dangerouslySetInnerHTML={{
                      __html: selectedJob.description,
                    }}
                  />
                </>
              ) : (
                <p className="text-muted">Select a job to view details.</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column: Application Form (visible only on larger screens) */}
        <Col md={4} className="d-none d-md-block">
          <Card className="border-light shadow-sm">
            <Card.Header className="bg-white border-bottom-0">
              <h4>Apply for the Job</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Selected Job</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedJob ? selectedJob.title : "None selected"}
                    readOnly
                    className="bg-light"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Resume</Form.Label>
                  <Form.Control
                    type="file"
                    name="resume"
                    onChange={handleFileUpload}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Upload CV</Form.Label>
                  <Form.Control
                    type="file"
                    name="cv"
                    onChange={handleFileUpload}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Job ID: {selectedJob ? selectedJob.id : "None selected"}
                  </Form.Label>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!selectedJob}
                  className="w-100"
                >
                  Submit Application
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modals for mobile view only */}
      <JobDetailsModal
        show={showJobModal}
        onHide={() => setShowJobModal(false)}
        selectedJob={selectedJob}
        onApply={() => {
          setShowJobModal(false);
          setShowApplyModal(true);
        }}
      />
      <ApplyModal
        show={showApplyModal}
        onHide={() => setShowApplyModal(false)}
        selectedJob={selectedJob}
        formData={formData}
        onInputChange={handleInputChange}
        onFileUpload={handleFileUpload}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default Careers;


