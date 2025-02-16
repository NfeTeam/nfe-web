import React, { useEffect, useState } from "react";
import { db, collection, getDocs, doc, getDoc } from "../components/firebase";
import Background from "../images/background-page-2.jpg";
import getMediaUrl from "../components/MediaUrl";

const Services = () => {
  const [chartImageUrl, setChartImageUrl] = useState(null);
  const [servicesData, setServicesData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(0);
  const [itemsPerRow, setItemsPerRow] = useState(3); // Default to large screen size
  const [bimData, setBimData] = useState(null);

  useEffect(() => {
    // Add styles to head
    const style = document.createElement('style');
    style.textContent = `
      .card-content {
        transition: all 0.7s ease-in-out;
        opacity: 0;
        max-height: 0;
        overflow: hidden;
      }
      
      .card-content.expanded {
        opacity: 1;
        max-height: 2000px; /* Adjust this value based on your maximum content height */
      }
      
      .card {
        transition: all 0.7s ease-in-out;
      }
      
      .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  // Function to determine items per row based on window width
  const updateItemsPerRow = () => {
    const width = window.innerWidth;
    if (width >= 992) { // lg breakpoint
      setItemsPerRow(3);
    } else if (width >= 768) { // md breakpoint
      setItemsPerRow(2);
    } else { // sm breakpoint
      setItemsPerRow(1);
    }
  };

  // Initial setup and window resize listener
  useEffect(() => {
    updateItemsPerRow();
    const handleResize = () => {
      updateItemsPerRow();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchChartImage = async () => {
      const chartDocRef = doc(db, "additionalImages", "chart");
      const chartDocSnap = await getDoc(chartDocRef);

      if (chartDocSnap.exists()) {
        const updatedURL = getMediaUrl(chartDocSnap.data().imageUrl, "image");
        setChartImageUrl(updatedURL);
      } else {
        console.warn("No chart image found in Firestore.");
        setChartImageUrl(null);
      }
    };

    const fetchServicesData = async () => {
      const servicesQuerySnapshot = await getDocs(collection(db, "services"));
      const services = servicesQuerySnapshot.docs.map((doc) => doc.data());
      setServicesData(services);
    };

    const fetchBIMData = async () => {
      try {
        const docRef = doc(db, "bimTechnology", "bimTechnologyData");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBimData(docSnap.data());
        } else {
          console.warn("No BIM Technology data found.");
        }
      } catch (error) {
        console.error("Error fetching BIM Technology data: ", error);
      } finally {

      }
    };

    fetchBIMData();
    fetchChartImage();
    fetchServicesData();

  }, []);

  // Function to determine if a service should show its content
  const shouldShowContent = (index) => {
    const rowIndex = Math.floor(index / itemsPerRow);
    return rowIndex === expandedRow;
  };

  // Function to handle row expansion
  const handleRowClick = (index) => {
    const rowIndex = Math.floor(index / itemsPerRow);
    setExpandedRow(rowIndex);
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
        <h1 className="text-center mb-5">Our BIM Services</h1>

        {/* Why Choose BIM Technology Card */}
        <div className="row my-5">
          {/* Why Choose BIM Technology Card */}
          <div className="col-md-4 d-flex">
            <div className="card rounded h-100">
              <h3 className="text-center card-title">Why Choose BIM Technology?</h3>
              <div className="card-body">
                <ul className="list-unstyled fs-6">
                  {bimData?.whyChoose.map((item, index) => (
                    <li key={index}>
                      <strong>{index + 1}. {item.split(":")[0]}:</strong> {item.split(":")[1]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Chart Image */}
          <div className="col-md-4 d-flex">
            <div className="card rounded h-100">
              {chartImageUrl ? (
                <img
                  src={chartImageUrl}
                  alt="BIM Chart"
                  className="img-fluid"
                />
              ) : (
                <p className="text-center">No chart image available.</p>
              )}
            </div>
          </div>

          {/* Advantages of BIM Technology Card */}
          <div className="col-md-4 d-flex">
            <div className="card rounded h-100">
              <h3 className="text-center card-title">Advantages of BIM Technology</h3>
              <div className="card-body">
                <ul className="list-unstyled fs-6">
                  {bimData?.advantages.map((item, index) => (
                    <li key={index}>
                      <strong>• {item.split(":")[0]}:</strong> {item.split(":")[1]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Services List */}
        {/* Services List */}
        <div className="row my-5">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6 col-sm-12 d-flex mb-4"
              onClick={() => handleRowClick(index)}
              style={{ cursor: 'pointer' }}
            >
              <div className="card rounded w-100 h-100">
                {/* Title Section */}
                <div
                  className="text-center card-title bg-primary text-white mb-0"
                  style={{ padding: "0px" }}
                >
                  {service.title}
                </div>

                {/* Content section with smooth transition */}
                <div className={`card-content ${shouldShowContent(index) ? 'expanded' : ''}`}>
                  {/* Media Section */}
                  {service.type === "video" ? (
                    <iframe
                      src={getMediaUrl(service.imageUrl, "video")}
                      title={service.title}
                      className="card-img-top"
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        width: "100%",
                        pointerEvents: 'auto'
                      }}
                      allowFullScreen
                    />
                  ) : (
                    <img
                      src={getMediaUrl(service.imageUrl, "image")}
                      alt={`${service.title}`}
                      className="card-img-top"
                      style={{
                        objectFit: "cover",
                        maxHeight: "200px",
                      }}
                    />
                  )}

                  {/* Text Content */}
                  <div className="card-body p-3">
                    <p>{service.description}</p>
                    <ul className="list-unstyled fs-6">
                      {service.items.map((item, i) => (
                        <li key={i}>🛠 {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;


