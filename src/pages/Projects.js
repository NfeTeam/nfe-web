import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../components/firebase"; // Import Firebase methods
import PJBG from "../images/Project-background.jpg";
import Background from "../images/background-page.jpg";

// Helper function to format Google Drive image URLs
const getImageUrl = (url) => {
  if (!url) {
    console.warn("Invalid image URL", url);  // Log invalid URLs
    return ""; // Return empty string or a fallback URL
  }

  const match = url.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }
  //"https://drive.google.com/uc?id=1eKEwRQyALwEg4TCrJxqGxecQJvzkLiFF"


  return url; // Return original URL if it doesn't match
};


const Projects = () => {
  const [projectData, setProjectData] = useState([]);
  
  // Fetch project data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projects = querySnapshot.docs.map((doc) => {
        const project = { id: doc.id, ...doc.data() };
        // Update the image URL for each project
        project.imageUrl = getImageUrl(project.imageUrl);
        return project;
      });
      setProjectData(projects);
    };

    fetchData();
  }, []);

  // Filter projects by status
  const completedProjects = projectData.filter((project) => project.status === "completed");
  const ongoingProjects = projectData.filter((project) => project.status === "ongoing");
  const upcomingProjects = projectData.filter((project) => project.status === "upcoming");

  return (
    <div className="projects" style={{ position: "relative" }}>
      {/* Background Image with Reduced Opacity */}
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
          backgroundAttachment: "fixed", // This makes the background fixed
          opacity: 0.3, // Adjust opacity as needed
          zIndex: -1, // Ensure the background is behind content
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

      {/* Container Section */}
      <div className="custom-container py-5">
        {/* Completed Projects */}
        <h2 className="mb-4">Completed Projects</h2>
        <div className="row mb-5">
          {completedProjects.map((project) => (
            <div className="col-md-4 mb-4" key={project.id}>
              <div className="card">
                <img 
                  src={project.imageUrl}  // The updated image URL is already in project.imageUrl
                  className="card-img-top" 
                  alt={project.title} 
                  
                />
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ongoing Projects */}
        <h2 className="mb-4">Ongoing Projects</h2>
        <div className="row mb-5">
          {ongoingProjects.map((project) => (
            <div className="col-md-4 mb-4" key={project.id}>
              <div className="card">
                <img 
                  src={project.imageUrl}  // The updated image URL is already in project.imageUrl
                  className="card-img-top" 
                  alt={project.title} 
                  
                />
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Projects */}
        <h2 className="mb-4">Upcoming Projects</h2>
        <div className="row">
          {upcomingProjects.map((project) => (
            <div className="col-md-4 mb-4" key={project.id}>
              <div className="card">
                <img 
                  src={project.imageUrl}  // The updated image URL is already in project.imageUrl
                  className="card-img-top" 
                  alt={project.title} 
                  
                />
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
  );
};

export default Projects;

































// import React from "react";
// import PJBG from "../images/Project-background.jpg";
// import Background from "../images/background-page.jpg"
// const projectData = [
//   {
//     id: 1,
//     title: "Auckland Airport Project",
//     description: "Brief description of the Auckland Airport Project...",
//     tag: true,
//     status: "completed",
//     image: require("../images/building-image.jpg"),
//   },
//   {
//     id: 2,
//     title: "Auckland Theater Project",
//     description: "Brief description of the Auckland Theater Project...",
//     tag: true,
//     status: "completed",
//     image: require("../images/building-image.jpg"),
//   },
//   {
//     id: 3,
//     title: "Bridge Construction Project",
//     description: "Brief description of the Bridge Construction Project...",
//     tag: true,
//     status: "ongoing",
//     image: require("../images/building-image.jpg"),
//   },
//   {
//     id: 4,
//     title: "Upcoming Project 1",
//     description: "Brief description of an upcoming project...",
//     tag: false,
//     status: "upcoming",
//     image: require("../images/upcoming-project.jpg"),
//   },
//   {
//     id: 5,
//     title: "Upcoming Project 2",
//     description: "Brief description of an upcoming project...",
//     tag: false,
//     status: "upcoming",
//     image: require("../images/upcoming-project.jpg"),
//   },
//   {
//     id: 6,
//     title: "Upcoming Project 3",
//     description: "Brief description of an upcoming project...",
//     tag: false,
//     status: "upcoming",
//     image: require("../images/upcoming-project.jpg"),
//   },{
//     id: 7,
//     title: "Auckland Airport Project",
//     description: "Brief description of the Auckland Airport Project...",
//     tag: true,
//     status: "completed",
//     image: require("../images/building-image.jpg"),
//   },{
//     id: 8,
//     title: "Auckland Airport Project",
//     description: "Brief description of the Auckland Airport Project...",
//     tag: true,
//     status: "completed",
//     image: require("../images/building-image.jpg"),
//   },{
//     id: 9,
//     title: "Auckland Airport Project",
//     description: "Brief description of the Auckland Airport Project...",
//     tag: true,
//     status: "completed",
//     image: require("../images/building-image.jpg"),
//   },
// ];

// const Projects = () => {
//   // Filter projects by status
//   const completedProjects = projectData.filter((project) => project.status === "completed");
//   const ongoingProjects = projectData.filter((project) => project.status === "ongoing");
//   const upcomingProjects = projectData.filter((project) => project.status === "upcoming");

//   return (
//     <div className="projects" style={{ position: "relative" }}>
//       {/* Background Image with Reduced Opacity */}
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundImage: `url(${Background})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundAttachment: "fixed", // This makes the background fixed
//           opacity: 0.3, // Adjust opacity as needed
//           zIndex: -1, // Ensure the background is behind content
//           animation: "moveBackground 20s ease-in-out infinite",
//         }}
//       ></div>

//       {/* Banner Section */}
//       <div style={{ position: "relative", height: "30vh", overflow: "hidden" }}>
//         <img
//           src={PJBG}
//           alt="building"
//           style={{ width: "100%", height: "100%", objectFit: "cover" }}
//         />
//         <h1
//           className="text-center mb-5"
//           style={{
//             position: "absolute",
//             top: "30%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             color: "white",
//             textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
//           }}
//         >
//           Our Projects
//         </h1>
//       </div>

//       {/* Container Section */}
//       <div className="container py-5">
//         {/* Completed Projects */}
//         <h2 className="mb-4">Completed Projects</h2>
//         <div className="row mb-5">
//           {completedProjects.map((project) => (
//             <div className="col-md-4 mb-4" key={project.id}>
//               <div className="card">
//                 <img src={project.image} className="card-img-top" alt={project.title} />
//                 <div className="card-body">
//                   <h5 className="card-title">{project.title}</h5>
//                   <p className="card-text">{project.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Ongoing Projects */}
//         <h2 className="mb-4">Ongoing Projects</h2>
//         <div className="row mb-5">
//           {ongoingProjects.map((project) => (
//             <div className="col-md-4 mb-4" key={project.id}>
//               <div className="card">
//                 <img src={project.image} className="card-img-top" alt={project.title} />
//                 <div className="card-body">
//                   <h5 className="card-title">{project.title}</h5>
//                   <p className="card-text">{project.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Upcoming Projects */}
//         <h2 className="mb-4">Upcoming Projects</h2>
//         <div className="row">
//           {upcomingProjects.map((project) => (
//             <div className="col-md-4 mb-4" key={project.id}>
//               <div className="card">
//                 <img src={project.image} className="card-img-top" alt={project.title} />
//                 <div className="card-body">
//                   <h5 className="card-title">{project.title}</h5>
//                   <p className="card-text">{project.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Projects;





/*

import React from "react";
import PJBG from "./Project-background.jpg";
import upcoming from "./upcoming-project.jpg";

const projectData = [
  {
    id: 1,
    title: "Auckland Airport Project",
    description: "Brief description of the Auckland Airport Project...",
    tag: true,
    image: require("./building-image.jpg"),
  },
  {
    id: 2,
    title: "Auckland Theater Project",
    description: "Brief description of the Auckland Theater Project...",
    tag: true,
    image: require("./building-image.jpg"),
  },
  {
    id: 3,
    title: "Upcoming Project",
    description: "Brief description of an upcoming project...",
    tag: false,
    image:require("./upcoming-project.jpg")
  },
  {
    id: 4,
    title: "Upcoming Project",
    description: "Brief description of an upcoming project...",
    tag: false,
    image:require("./upcoming-project.jpg")
  },
  {
    id: 5,
    title: "Upcoming Project",
    description: "Brief description of an upcoming project...",
    tag: false,
    image:require("./upcoming-project.jpg")
  },
  {
    id: 6,
    title: "Upcoming Project",
    description: "Brief description of an upcoming project...",
    tag: false,
    image:require("./upcoming-project.jpg")
  },
];
const Projects = () => {
  return (
    <div className="projects">
      <div style={{ position: "relative", height: "30vh", overflow: "hidden" }}>
        <img
          src={PJBG}
          alt="building"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <h1
          className="text-center mb-5 "
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
      <div className="container py-5">
        <div className="row">
          {projectData.map((project) => (
            <div className="col-md-4 mb-4" key={project.id}>
              <div className="card">
                <img
                  src={project.image || project.tag ? project.image : upcoming}
                  className="card-img-top"
                  alt={project.title}
                />{" "}
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
  );
};

export default Projects;


I wanna split the projects into Completed, ongoing, upcoming 

*/