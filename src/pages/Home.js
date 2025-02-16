import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BF from "../images/building-filled.png";
import BNF from "../images/building.png";
import Background from "../images/background-page-4.jpg";
import "../styles/Home.css";
import { db, collection, getDoc, doc } from "../components/firebase";
import getMediaUrl from "../components/MediaUrl";

const ourServices = [
  {
    icon: BF,
    mainService: "ARCHITECTURE BIM SERVICES",
    subServices: [
      "VDC / BIM COORDINATION / CSD",
      "POINT CLOUD SCAN TO BIM",
    ],
  },
  {
    icon: BNF,
    mainService: "STRUCTURAL BIM SERVICES",
    subServices: ["4D SIMULATION / RENDERING", "VR / AR VDC"],
  },
  {
    icon: BF,
    mainService: "MEP BIM SERVICES",
    subServices: [
      "5D COST / QUANTITY TAKE-OFF",
      "BIM DOCUMENTATION",
    ],
  },
];
const Home = () => {
  const [slides, setSlides] = useState([]); // Initialize slides state
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);
  const [homeData, setHomeData] = useState([])
  useEffect(() => {

    const fetchSlidesData = async () => {
      try {
        const homeDataRef = doc(collection(db, "homeContent"), "homeData");
        const homeDataDoc = await getDoc(homeDataRef);
        const homeData = homeDataDoc.data();

        const homeMediaRef = doc(collection(db, "homeContent"), "homeMedia");
        const homeMediaDoc = await getDoc(homeMediaRef);
        const homeMedia = homeMediaDoc.data().media;

        // Combine homeData and homeMedia into slides
        const combinedSlides = homeMedia.map((media, index) => ({
          type: media.type,
          src: getMediaUrl(media.url, media.type),
          alt: homeData.title + " Slide " + (index + 1),
        }));

        setSlides(combinedSlides); // Update slides state
        setHomeData(homeData)
      } catch (error) {
        console.error("Error fetching slides data: ", error);
      }
    };

    fetchSlidesData();

    let timer;

    const startTimer = (delay) => {
      timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, delay);
    };

    const handleSlideChange_2 = () => {
      clearInterval(timer);
      if (slides.length === 0) {
        return
      }
      if (slides[currentSlide].type === "video") {
        const video = videoRef.current;
        if (video) {
          video.onended = () => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
          };
          video.play();
        }
      } else {
        startTimer(5000);
      }
    };

    const handleSlideChange = () => {
      clearInterval(timer);
      if (slides.length === 0) {
        return;
      }
      if (slides[currentSlide].type === "video") {
        const video = videoRef.current;
        if (video) {
          video.onloadeddata = () => {
            video.play();
          };
          video.onerror = () => {
            // Skip to the next slide if video fails to load
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
          };
          video.load(); // Attempt to load the video
        }
      } else {
        startTimer(5000);
      }
    };

    handleSlideChange();

    return () => clearInterval(timer);
  }, [currentSlide, slides.length]); // Added slides.length to dependencies

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };
  if (slides.length === 0) {
    return <div>Loading...</div>; // Show a loading message or spinner
  } else {
    console.log(slides)

    return (
      <div className="home-container">
        <section className="hero-section">
          <div className="slogan-container">
            {slides[currentSlide].type === "image" ? (
              <img
                src={slides[currentSlide].src || "/placeholder.svg"}
                className="home-slogan"
                alt={slides[currentSlide].alt}
              />
            ) : (
              <video
                ref={videoRef}
                src={slides[currentSlide].src}
                className="home-slogan"
                alt={slides[currentSlide].alt}
                muted
                playsInline
              />
            )}
            <div className="overlay-text">
              Engineering Tomorrow's Solutions, Today!
            </div>
            <div className="dot-container">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => handleDotClick(index)}
                ></span>
              ))}
            </div>
          </div>
        </section>

        <section className="intro-section bg-flowing text-white py-5 my-3">
          <div className="container">
            <h1 className="heading-home-1">
              <strong>{homeData.title}</strong>
            </h1>
            <p className="lead">
              {homeData.description}
            </p>
            <Link
              to="/services"
              className="btn btn-light btn-lg mt-3 button-home-1"
            >
              Explore Our Services
            </Link>
          </div>
        </section>

        <section className="services-section">
          <div className="services-background" style={{ backgroundImage: `url(${Background})` }}></div>
          <div className="services-content">
            <h2 className="services-title">Our Services</h2>
            <div className="services-grid">
              {ourServices.map((service, index) => (
                <div className="service-card" key={index}>
                  <div className="service-icon">
                    <img
                      src={service.icon || "/placeholder.svg"}
                      alt="service icon"
                      className="service-img"
                    />
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">{service.mainService}</h3>
                    {service.subServices.map((subService, idx) => (
                      <div className="sub-service" key={idx}>
                        {subService}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }
};

export default Home;
