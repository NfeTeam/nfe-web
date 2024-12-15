import React, { useEffect, useState } from "react";
import { db, collection, getDocs, doc, getDoc } from "../components/firebase"; // Firebase methods
import Background from "../images/background-page-2.jpg";
const getImageUrl = (url) => {
  if (!url) {
    console.warn("Invalid image URL", url);
    return "";
  }

  const match = url.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000&random=${Math.random()}`;
  }

  return url;
};

const Services = () => {
  const [chartImageUrl, setChartImageUrl] = useState(null); // Set as null to trigger re-render only after data is loaded
  const [servicesData, setServicesData] = useState([]); // State to hold service data



  // Fetch chart image URL from Firebase
  useEffect(() => {
    const fetchChartImage = async () => {
      const chartDocRef = doc(db, "additionalImages", "chart"); // Document reference for chart image
      const chartDocSnap = await getDoc(chartDocRef);
      
      if (chartDocSnap.exists()) {
        const updatedURL = getImageUrl(chartDocSnap.data().imageUrl);
        setChartImageUrl(updatedURL); // Set chart image URL from Firestore
      } else {
        console.warn("No chart image found in Firestore.");
        setChartImageUrl(null); // Set null if no image is found
      }
    };

    // Fetch service data from Firebase
    const fetchServicesData = async () => {
      const servicesQuerySnapshot = await getDocs(collection(db, "services"));
      const services = servicesQuerySnapshot.docs.map(doc => doc.data()); // Extract data from Firestore
      setServicesData(services);
    };

    fetchChartImage();
    fetchServicesData();
  }, []); // Empty dependency array ensures this runs only once on mount

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
        <h1 className="text-center mb-5">Our BIM Services</h1>
        
        {/* Why Choose BIM Technology Card */}
        <div className="row my-5">
          <div className="col-md-4">
            <div className="card rounded">
              <h3 className="text-center card-title">Why Choose BIM Technology?</h3>
              <div className="card-body">
                <ul className="list-unstyled fs-6">
                  <li><strong>1. Enhanced Collaboration:</strong> BIM facilitates real-time collaboration among architects, engineers, and contractors, improving coordination and reducing errors.</li>
                  <li><strong>2. Improved Visualization:</strong> 3D models created with BIM allow stakeholders to visualize the project more accurately, aiding in better decision-making.</li>
                  <li><strong>3. Efficient Design and Planning:</strong> BIM enables efficient design iterations and planning, optimizing construction processes and reducing project timelines.</li>
                  <li><strong>4. Cost Savings:</strong> By detecting clashes and inconsistencies early, BIM helps in minimizing costly changes during construction.</li>
                  <li><strong>5. Lifecycle Management:</strong> BIM supports the entire lifecycle of a building, from design and construction to operation and maintenance, improving facility management.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Chart Image */}
          <div className="col-md-4">
            {chartImageUrl ? (
              <img src={chartImageUrl} alt="BIM Chart" className="img-fluid" />
            ) : (
              <p>No chart image available.</p> // Display a fallback message if the image is not available
            )}
          </div>

          {/* Advantages of BIM Technology Card */}
          <div className="col-md-4">
            <div className="card rounded">
              <h3 className="text-center card-title">Advantages of BIM Technology</h3>
              <div className="card-body">
                <ul className="list-unstyled fs-6">
                  <li><strong>• Accuracy and Precision:</strong> BIM models provide detailed, accurate representations of building components and systems, reducing errors in construction.</li>
                  <li><strong>• Clash Detection:</strong> BIM enables clash detection among various building systems, such as mechanical, electrical, and plumbing (MEP), early in the design phase, avoiding conflicts during construction.</li>
                  <li><strong>• Quantification and Cost Estimation:</strong> BIM facilitates automated quantity takeoffs and cost estimations, enhancing budgeting accuracy.</li>
                  <li><strong>• Sustainability:</strong> BIM allows for better analysis of energy efficiency and environmental impact, promoting sustainable building practices.</li>
                  <li><strong>• Improved Communication:</strong> BIM fosters clearer communication through visualizations, improving understanding among project teams and stakeholders.</li>
                  <li>In summary, adopting BIM technology offers multiple benefits, from enhanced collaboration and visualization to cost savings and sustainability, making it a valuable choice for modern construction projects.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="row my-5">
          {servicesData.map((service, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card rounded">
                <h2 className="card-title bg-primary text-white text-center rounded">{service.title}</h2>
                <div className="card-body bg-light">
                  <p>{service.description}</p>
                  <ul className="list-unstyled fs-5 px-3">
                    {service.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <i className="fas fa-wrench"></i> {item}
                      </li>
                    ))}
                  </ul>
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





/* import React from "react";
import chartImage from "../images/chart.jpg";
import Background from "../images/background-page-2.jpg";

const servicesData = [
  {
    title: "Architecture BIM Services",
    description:
      "We specialize in delivering high-standard architectural BIM modeling and shop drawing services that adhere to industry-leading standards.",
    items: [
      "All Architectural 3D BIM Modelling",
      "Architectural Family Creation",
      "All Architectural Shop Drawing",
      "Precast Details Drawing",
      "Fabrication Shop Drawing",
    ],
  },
  {
    title: "Structural BIM Services",
    description:
      "We specialize in delivering high-standard Structural BIM modeling and shop drawing services that adhere to industry-leading standards.",
    items: [
      "All Structural 3D BIM Modelling",
      "Structural Family Creation",
      "All Structural Shop Drawing",
      "Steel Structure Shop Drawing",
      "Precast Details Drawing",
    ],
  },
  {
    title: "MEP BIM Services",
    description:
      "We specialize in delivering high-standard MEP BIM modeling and shop drawing services that adhere to industry-leading standards.",
    items: [
      "All MEP 3D BIM Modelling",
      "MEP Family Creation",
      "All MEP Shop Drawing",
      "Fabrication Shop Drawing",
      "MEP Construction Drawing",
    ],
  },
  {
    title: "VDC / BIM Coordination / CSD",
    description:
      "We specialize in providing top-tier CSD (Combined Service Drawing), BIM Coordination, and VDC (Virtual Design and Construction) services, meticulously adhering to industry-leading standards.",
    items: [
      "VDC BIM Meeting",
      "BIM Coordination",
      "Clash Detection & Report",
      "RFI Preparation",
      "CSD [Combined Services Drawing]",
    ],
  },
  {
    title: "NEW",
    description: "NEW",
    items: ["1", "2", "3", "4", "5"],
  },
];
const Services = () => {
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
    <div className="container py-5">
      
      <h1 className="text-center mb-5">Our BIM Services</h1>
      <div className="row my-5">
        <div className="col-md-4">
          <div className="card rounded">
          <h3 className="text-center card-title">Why Choose BIM Technology?</h3>
            <div className="card-body">
              <ul className="list-unstyled fs-6">
                <li>
                  <strong> 1.Enhanced Collaboration: </strong> BIM facilitates
                  real-time collaboration among architects, engineers, and
                  contractors, improving coordination and reducing errors.
                </li>
                <li>
                  <strong> 2.Improved Visualization: </strong> 3D models created
                  with BIM allow stakeholders to visualize the project more
                  accurately, aiding in better decision-making.
                </li>
                <li>
                  <strong> 3.Efficient Design and Planning: </strong> BIM
                  enables efficient design iterations and planning, optimizing
                  construction processes and reducing project timelines.
                </li>
                <li>
                  <strong> 4.Cost Savings: </strong> By detecting clashes and
                  inconsistencies early, BIM helps in minimizing costly changes
                  during construction.
                </li>
                <li>
                  <strong> 5.Lifecycle Management: </strong> BIM supports the
                  entire lifecycle of a building, from design and construction
                  to operation and maintenance, improving facility management.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <img src={chartImage} alt="nil" className="img-fluid"></img>
        </div>
        <div className="col-md-5">
        <div className="card rounded">
          <h3 className="text-center card-title">Advantages of BIM Technology</h3>
            <div className="card-body">
            <ul className="list-unstyled fs-6">
            <li>
              <strong>•Accuracy and Precision: </strong>BIM models provide
              detailed, accurate representations of building components and
              systems, reducing errors in construction.
            </li>
            <li>
              <strong> •Clash Detection: </strong> BIM enables clash detection
              among various building systems, such as mechanical, electrical,
              and plumbing (MEP), early in the design phase, avoiding conflicts
              during construction.
            </li>
            <li>
              <strong> •Quantification and Cost Estimation:</strong> BIM
              facilitates automated quantity takeoffs and cost estimations,
              enhancing budgeting accuracy.
            </li>
            <li>
              <strong> •Sustainability: </strong> BIM allows for better analysis
              of energy efficiency and environmental impact, promoting
              sustainable building practices.
            </li>
            <li>
              <strong> •Improved Communication: </strong> BIM fosters clearer
              communication through visualizations, improving understanding
              among project teams and stakeholders.
            </li>
            <li>
              In summary, adopting BIM technology offers multiple benefits, from
              enhanced collaboration and visualization to cost savings and
              sustainability, making it a valuable choice for modern
              construction projects.
            </li>
          </ul>
            </div>
          </div>
          
        </div>
      </div>
      <div className="row my-5">
        {servicesData.map((service, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card rounded">
              <h2 className="card-title bg-primary text-white text-center rounded">
                {service.title}
              </h2>
              <div className="card-body bg-light">
                <p>{service.description}</p>
                <ul className="list-unstyled fs-5 px-3">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <i className="fas fa-wrench"></i> {item}
                    </li>
                  ))}
                </ul>
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
*/