import React from "react";
import { Link } from "react-router-dom";
import BF from "../images/building-filled.png";
import BNF from "../images/building.png";
import HomeSlogan from "../images/HomeSlogan.jpg";
import Background from "../images/background-page-4.jpg";

const Home = () => {
  return (
    <div>
      <div className="slogan-container">
        <img src={HomeSlogan} className="home-slogan" alt="Home Slogan" />
        <div className="overlay-text">Engineering Tomorrow's Solutions, Today!!</div>
      </div>

      <section className="bg-flowing text-white py-5">
        <div className="container">
          <h1 className="display-4 heading-home-1">New Fact Engineering</h1>
          <p className="lead">
            Building Information Modeling (BIM) technology revolutionizes the
            architecture, engineering, and construction (AEC) industries by
            providing a comprehensive digital representation of a building's
            physical and functional characteristics. Utilizing 3D modeling
            software, BIM integrates multi-disciplinary data to create detailed,
            parametric models that encompass architectural, structural, and MEP
            (mechanical, electrical, plumbing) systems. This collaborative
            approach enhances project visualization, coordination, and
            decision-making, reducing errors and inefficiencies. Advanced
            capabilities such as 4D simulation (time scheduling), 5D cost
            estimation, and point cloud integration from laser scans further
            streamline construction workflows. BIM's ability to manage building
            assets throughout their lifecycle supports sustainable practices and
            improves facility management, making it an indispensable tool for
            modern construction projects.
          </p>
          <Link
            to="/services"
            className="btn btn-light btn-lg mt-3 button-home-1"
          >
            Explore Our Services
          </Link>
        </div>
      </section>
      <div style={{position:"relative"}}>
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
       <section className="py-5">
      
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="text-center">
              <img src={BF} alt="building"></img>
            </div>
            <div className="card text-center heading-home-2">
              ARCHITECTURE BIM SERVICES
            </div>
            <div className="card text-center heading-home-2 ">
              VDC / BIM COORDINATION / CSD
            </div>
            <div className="card text-center heading-home-2 ">
              POINT CLOUD SCAN TO BIM
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="text-center">
              <img src={BNF} alt="building"></img>
            </div>
            <div className="card text-center heading-home-2 ">
              STRUCTURAL BIM SERVICES
            </div>
            <div className="card text-center heading-home-2 ">
              4D SIMULATION / RENDERING
            </div>
            <div className="card text-center heading-home-2 ">
              VR / AR VDC
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="text-center">
              <img src={BF} alt="building"></img>
            </div>
            <div className="card text-center heading-home-2 ">
              MEP BIM SERVICES
            </div>
            <div className="card text-center heading-home-2 ">
              5D COST / QUANTITY TAKE-OFF
            </div>
            <div className="card text-center heading-home-2 ">
              BIM DOCUMENTATION
            </div>
          </div>
        </div>
      </div>
    </section>
      </div>
     
    </div>
  );
};

export default Home;
