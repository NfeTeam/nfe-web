import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../components/firebase";
import Background from "../images/background-page-3.jpg";
import getMediaUrl from "../components/MediaUrl";

const SocialService = () => {
  const [serviceData, setServiceData] = useState([]);
  const [activeTab, setActiveTab] = useState("completed"); // Default tab

  // Fetch social service data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "socialServices"));
      const services = querySnapshot.docs.map((doc) => {
        const service = { id: doc.id, ...doc.data() };
        service.mediaUrl = getMediaUrl(service.imageUrl, service.type);
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

  const renderMedia = (service) => {
    if (service.type === "video") {
      return (
        <iframe
          src={service.mediaUrl}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover", pointerEvents: "auto" }}
          allowFullScreen
          allow="autoplay; encrypted-media"
          title={service.title}
        ></iframe>
      );
    }
    return (
      <img
        src={service.mediaUrl}
        className="card-img-top"
        alt={service.title}
        style={{ height: "200px", objectFit: "cover" }}
      />
    );
  };


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
          backgroundAttachment: "fixed",
          opacity: 0.3,
          zIndex: -1,
          animation: "moveBackground 20s ease-in-out infinite",
        }}
      ></div>

      <div className="custom-container py-5">
        <h1 className="text-center mb-5">Our Social Services</h1>

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
          {[completedServices, ongoingServices, upcomingServices].map((services, index) => (
            <div
              className={`tab-pane fade ${activeTab === ["completed", "ongoing", "upcoming"][index] ? "show active" : ""}`}
              key={["completed", "ongoing", "upcoming"][index]}
            >
              <div className="row">
                {services.map((service) => (
                  <div className="col-md-4 mb-4" key={service.id}>
                    <div className="card h-100">
                      {renderMedia(service)}
                      <div className="card-body">
                        <h5 className="card-title">{service.title}</h5>
                        <p className="card-text">{service.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialService;



