import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../components/firebase"; // Import Firebase methods
import Background from "../images/background-page-3.jpg";

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
//"https://drive.google.com/uc?id=1CayYTwVcwSeXdrPomE8iNeIeEcEXysWy"

  return url; // Return original URL if it doesn't match
};

const SocialService = () => {
  const [serviceData, setServiceData] = useState([]);

  // Fetch social service data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "socialServices"));
      const services = querySnapshot.docs.map((doc) => {
        const service = { id: doc.id, ...doc.data() };
        // Update the image URL for each service
        service.imageUrl = getImageUrl(service.imageUrl);
        return service;
      });
      setServiceData(services);
    };

    fetchData();
  }, []);

  // Filter services by status
  const completedServices = serviceData.filter((service) => service.status === "completed");
  const ongoingServices = serviceData.filter((service) => service.status === "ongoing");
  const upcomingServices = serviceData.filter((service) => service.status === "upcoming");

  return (
    <div style={{ position: "relative" }}>
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

      <div className="custom-container py-5">
        <h1 className="text-center mb-5">Our Social Services</h1>

        {/* Completed Section */}
        <div className="row mb-5">
        <div className="col-md-4 mb-4"> 
        <h2>Completed</h2>
          <div className="scrollable-section" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <div className="scroll-container">
              {completedServices.map((service) => (
                <div className="card mb-3" key={service.id}>
                  <img 
                    src={service.imageUrl} // Use service.imgSrc or fallback image
                    className="card-img-top" 
                    alt={service.title} 
                  />
                  <div className="card-body">
                    <h5 className="card-title">{service.title}</h5>
                    <p className="card-text">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
          
        

        {/* Ongoing Section */}
        <div className="col-md-4 mb-4"> 
        <h2>Ongoing</h2>
          <div className="scrollable-section" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <div className="scroll-container">
              {ongoingServices.map((service) => (
                <div className="card mb-3" key={service.id}>
                  <img 
                    src={service.imageUrl } // Use service.imgSrc or fallback image
                    className="card-img-top" 
                    alt={service.title} 
                  />
                  <div className="card-body">
                    <h5 className="card-title">{service.title}</h5>
                    <p className="card-text">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
         
        

        {/* Upcoming Section */}
        
        <div className="col-md-4 mb-4"> 
        <h2>Upcoming</h2>
          <div className="scrollable-section" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <div className="scroll-container">
              {upcomingServices.map((service) => (
                <div className="card mb-3" key={service.id}>
                  <img 
                    src={service.imageUrl} // Use service.imgSrc or fallback image
                    className="card-img-top" 
                    alt={service.title} 
                  />
                  <div className="card-body">
                    <h5 className="card-title">{service.title}</h5>
                    <p className="card-text">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SocialService;

















// import React from 'react';
// import Background from "../images/background-page-3.jpg";
// const BACKUPIMG = require("../images/socialService.jpg");
// const servicesData = {
//   history: [
//     {
//       title: "Blood Donation",
//       description: "Description of our blood donation initiatives...",
//       imgSrc: require("../images/socialService.jpg"),
//       alt: "Blood Donation",
//     },
//     {
//       title: "Senior Care",
//       description: "Description of our senior care programs...",
//       imgSrc: require("../images/socialService.jpg"),
//       alt: "Senior Care",
//     },
//     {
//       title: "Blood Donation",
//       description: "Description of our blood donation initiatives...",
//       imgSrc: require("../images/socialService.jpg"),
//       alt: "Blood Donation",
//     },
//     {
//       title: "Senior Care",
//       description: "Description of our senior care programs...",
//       imgSrc: require("../images/socialService.jpg"),
//       alt: require("../images/socialService.jpg"),
//     },
//   ],
//   live: [
//     {
//       title: "Community Outreach",
//       description: "Description of our community outreach programs...",
//       imgSrc: require("../images/socialService.jpg"),
//       alt: "Community Outreach",
//     },
//     {
//       title: "Education Support",
//       description: "Description of our education support initiatives...",
//       imgSrc: require("../images/socialService.jpg"),
//       alt: "Education Support",
//     },
//     {
//       title: "Community Outreach",
//       description: "Description of our community outreach programs...",
//       imgSrc: require("../images/socialService.jpg"),
//       alt: "Community Outreach",
//     },
//   ],
//   upcoming: [
//     {
//       title: "Mentorship Program",
//       description: "Description of our upcoming mentorship program...",
      
//       alt: "Mentorship Program",
//     },
//     {
//       title: "Disaster Relief",
//       description: "Description of our upcoming disaster relief efforts...",
//       imgSrc: require("../images/socialService.jpg"),
//       alt: "Disaster Relief",
//     },
//   ],
// };

// const SocialService = () => {
//   return (
//     <div style={{position:"relative"}}>
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

// <div className="container py-5">
//       <h1 className="text-center mb-5">Our Social Services</h1>

//       <div className="row">
//         {/* History Section */}
//         <div className="col-md-4 mb-4">
//           <h2>History</h2>
//           <div className="scrollable-section" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
//             <div className="scroll-container">
//               {servicesData.history.map((service, index) => (
//                 <div className="card mb-3" key={index}>
//                 <img src={service.imgSrc ? service.imgSrc : BACKUPIMG} className="card-img-top" alt={service.alt} />                  <div className="card-body">
//                     <h5 className="card-title">{service.title}</h5>
//                     <p className="card-text">{service.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Live Section */}
//         <div className="col-md-4 mb-4">
//           <h2>Ongoing</h2>
//           <div className="scrollable-section" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
//             <div className="scroll-container">
//               {servicesData.live.map((service, index) => (
//                 <div className="card mb-3" key={index}>
//                 <img src={service.imgSrc ? service.imgSrc : BACKUPIMG} className="card-img-top" alt={service.alt} />                  <div className="card-body">
//                     <h5 className="card-title">{service.title}</h5>
//                     <p className="card-text">{service.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Upcoming Section */}
//         <div className="col-md-4 mb-4">
//           <h2>Upcoming</h2>
//           <div className="scrollable-section" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
//             <div className="scroll-container">
//               {servicesData.upcoming.map((service, index) => (
//                 <div className="card mb-3" key={index}>
//                 <img src={service.imgSrc ? service.imgSrc : BACKUPIMG} className="card-img-top" alt={service.alt} />                  <div className="card-body">
//                     <h5 className="card-title">{service.title}</h5>
//                     <p className="card-text">{service.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </div>
    
//   );
// };

// export default SocialService;






// import React from 'react';

// const servicesData = {
//   history: [
//     {
//       title: "Blood Donation",
//       description: "Description of our blood donation initiatives...",
//       imgSrc: require("./socialService.jpg?height=200&width=300"),
//       alt: "Blood Donation",
//     },
//     {
//       title: "Senior Care",
//       description: "Description of our senior care programs...",
//       imgSrc: require("./socialService.jpg?height=200&width=300"),
//       alt: "Senior Care",
//     },
//     {
//       title: "Blood Donation",
//       description: "Description of our blood donation initiatives...",
//       imgSrc: require("./socialService.jpg?height=200&width=300"),
//       alt: "Blood Donation",
//     },
//     {
//       title: "Senior Care",
//       description: "Description of our senior care programs...",
//       imgSrc: require("./socialService.jpg?height=200&width=300"),
//       alt: require("./socialService.jpg?height=200&width=300"),
//     },
//   ],
//   live: [
//     {
//       title: "Community Outreach",
//       description: "Description of our community outreach programs...",
//       imgSrc: require("./socialService.jpg?height=200&width=300"),
//       alt: "Community Outreach",
//     },
//     {
//       title: "Education Support",
//       description: "Description of our education support initiatives...",
//       imgSrc: require("./socialService.jpg?height=200&width=300"),
//       alt: "Education Support",
//     },
//     {
//       title: "Community Outreach",
//       description: "Description of our community outreach programs...",
//       imgSrc: require("./socialService.jpg?height=200&width=300"),
//       alt: "Community Outreach",
//     },
    
//   ],
//   upcoming: [
//     {
//       title: "Mentorship Program",
//       description: "Description of our upcoming mentorship program...",
//       imgSrc: require("./socialService.jpg?height=200&width=300"),
//       alt: "Mentorship Program",
//     },
//     {
//       title: "Disaster Relief",
//       description: "Description of our upcoming disaster relief efforts...",
//       imgSrc: require("./socialService.jpg?height=200&width=300"),
//       alt: "Disaster Relief",
//     },
//   ],
// };

// const SocialService = () => {
//   return (
//     <div className="container py-5">
//       <h1 className="text-center mb-5">Our Social Services</h1>

//       <div className="row">
//         {/* History Section */}
//         <div className="col-md-4 mb-4">
//           <h2>History</h2>
//           {servicesData.history.map((service, index) => (
//             <div className="card mb-3" key={index}>
//               <img src={service.imgSrc} className="card-img-top" alt={service.alt} />
//               <div className="card-body">
//                 <h5 className="card-title">{service.title}</h5>
//                 <p className="card-text">{service.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Live Section */}
//         <div className="col-md-4 mb-4">
//           <h2>Live</h2>
//           {servicesData.live.map((service, index) => (
//             <div className="card mb-3" key={index}>
//               <img src={service.imgSrc} className="card-img-top" alt={service.alt} />
//               <div className="card-body">
//                 <h5 className="card-title">{service.title}</h5>
//                 <p className="card-text">{service.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Upcoming Section */}
//         <div className="col-md-4 mb-4">
//           <h2>Upcoming</h2>
//           {servicesData.upcoming.map((service, index) => (
//             <div className="card mb-3" key={index}>
//               <img src={service.imgSrc} className="card-img-top" alt={service.alt} />
//               <div className="card-body">
//                 <h5 className="card-title">{service.title}</h5>
//                 <p className="card-text">{service.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SocialService;