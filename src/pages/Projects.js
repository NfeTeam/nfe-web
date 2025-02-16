import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../components/firebase";
import PJBG from "../images/Project-background.jpg";
import Background from "../images/background-page.jpg";
import getMediaUrl from "../components/MediaUrl";

const renderMedia = (project) => {
  if (project.type === "video") {
    return (
      <iframe
        src={project.mediaUrl}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover", pointerEvents: 'auto' }}
        allowFullScreen
        allow="autoplay; encrypted-media"
        title={project.title}
      ></iframe>
    );
  }
  return (
    <img
      src={project.mediaUrl}
      className="card-img-top"
      alt={project.title}
      style={{ height: "200px", objectFit: "cover" }}
    />
  );
};

const Projects = () => {
  const [projectData, setProjectData] = useState([]);
  const [activeTab, setActiveTab] = useState("completed"); // Default to completed tab

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

  const completedProjects = projectData.filter((project) => project.status === "completed");
  const ongoingProjects = projectData.filter((project) => project.status === "ongoing");
  const upcomingProjects = projectData.filter((project) => project.status === "upcoming");

  return (
    <div className="projects" style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${Background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: 0.3,
          zIndex: -1,
          animation: "moveBackground 20s ease-in-out infinite",
        }}
      ></div>

      {/* Banner Section */}
      <div style={{ position: "relative", height: "30vh", overflow: "hidden" }}>
        <img
          src={PJBG}
          alt="building"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <h1
          className="text-center mb-5"
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          }}
        >
          Our Projects
        </h1>
      </div>

      {/* Container Section with Tabs */}
      <div className="custom-container py-5">
        {/* Tab Navigation */}
        <ul className="nav nav-tabs mb-4 justify-content-center">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "completed" ? "active" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "ongoing" ? "active" : ""}`}
              onClick={() => setActiveTab("ongoing")}
            >
              Ongoing
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "upcoming" ? "active" : ""}`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Completed Projects Tab */}
          <div className={`tab-pane fade ${activeTab === "completed" ? "show active" : ""}`}>
            <div className="row">
              {completedProjects.map((project) => (
                <div className="col-md-4 mb-4" key={project.id}>
                  <div className="card h-100">
                    {renderMedia(project)}
                    <div className="card-body">
                      <h5 className="card-title">{project.title}</h5>
                      <p className="card-text">{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ongoing Projects Tab */}
          <div className={`tab-pane fade ${activeTab === "ongoing" ? "show active" : ""}`}>
            <div className="row">
              {ongoingProjects.map((project) => (
                <div className="col-md-4 mb-4" key={project.id}>
                  <div className="card h-100">
                    {renderMedia(project)}
                    <div className="card-body">
                      <h5 className="card-title">{project.title}</h5>
                      <p className="card-text">{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Projects Tab */}
          <div className={`tab-pane fade ${activeTab === "upcoming" ? "show active" : ""}`}>
            <div className="row">
              {upcomingProjects.map((project) => (
                <div className="col-md-4 mb-4" key={project.id}>
                  <div className="card h-100">
                    {renderMedia(project)}
                    <div className="card-body">
                      <h5 className="card-title">{project.title}</h5>
                      <p className="card-text">{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

