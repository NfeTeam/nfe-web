import React, { useState, useRef, useEffect } from "react";
import "../styles/media.css";

const videos = [
  {
    id: 1,
    url: "https://www.youtube.com/embed/uySn1BZiWWs?enablejsapi=1",
    title: "Video 1",
    thumbnail: "https://img.youtube.com/vi/uySn1BZiWWs/mqdefault.jpg",
    previews: [
      { time: 10, thumbnail: "https://via.placeholder.com/150?text=Preview+1" },
      { time: 15, thumbnail: "https://via.placeholder.com/150?text=Preview+2" },
      { time: 30, thumbnail: "https://via.placeholder.com/150?text=Preview+3" },
      { time: 40, thumbnail: "https://via.placeholder.com/150?text=Preview+4" },
      { time: 50, thumbnail: "https://via.placeholder.com/150?text=Preview+5" },
      { time: 60, thumbnail: "https://via.placeholder.com/150?text=Preview+6" },
      { time: 70, thumbnail: "https://via.placeholder.com/150?text=Preview+7" },
    ],
  },
  {
    id: 2,
    url: "https://www.youtube.com/embed/59CJ3g1n_6Y?enablejsapi=1",
    title: "Video 2",
    thumbnail: "https://img.youtube.com/vi/59CJ3g1n_6Y/mqdefault.jpg",
    previews: [
      { time: 5, thumbnail: "https://via.placeholder.com/150?text=Preview+1" },
      { time: 15, thumbnail: "https://via.placeholder.com/150?text=Preview+2" },
      { time: 25, thumbnail: "https://via.placeholder.com/150?text=Preview+3" },
      { time: 35, thumbnail: "https://via.placeholder.com/150?text=Preview+4" },
      { time: 45, thumbnail: "https://via.placeholder.com/150?text=Preview+5" },
      { time: 55, thumbnail: "https://via.placeholder.com/150?text=Preview+6" },
    ],
  },
  {
    id: 3,
    url: "https://drive.google.com/file/d/1GyVLSL5EMCPYs4j-aPG-hxlHrt7rC2Zi/preview",
    title: "Video 3",
    thumbnail: "https://img.youtube.com/vi/59CJ3g1n_6Y/mqdefault.jpg",
    previews: [
      { time: 5, thumbnail: "https://via.placeholder.com/150?text=Preview+1" },
      { time: 15, thumbnail: "https://via.placeholder.com/150?text=Preview+2" },
      { time: 25, thumbnail: "https://via.placeholder.com/150?text=Preview+3" },
      { time: 35, thumbnail: "https://via.placeholder.com/150?text=Preview+4" },
      { time: 45, thumbnail: "https://via.placeholder.com/150?text=Preview+5" },
      { time: 55, thumbnail: "https://via.placeholder.com/150?text=Preview+6" },
    ],
  },
];

const Media = () => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);
  const iframeRef = useRef(null); // Reference to the iframe
  const player = useRef(null); // Store player instance

  useEffect(() => {
    // Initialize the player when the video is selected
    if (iframeRef.current) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        player.current = new window.YT.Player(iframeRef.current, {
          events: {
            onReady: () => {
              player.current.playVideo();
            },
          },
        });
      };
    }
  }, [selectedVideo]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handlePreviewClick = (time) => {
    if (player.current) {
      player.current.seekTo(time, true); // Seek to the timestamp
      player.current.playVideo(); // Play the video from the new timestamp
    }
  };

  return (
    <div className="media-container">
      <div className="main-content">
        <div className="expanded-video">
          <iframe
            ref={iframeRef}
            width="100%"
            height="60vh"
            src={selectedVideo.url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={selectedVideo.title}
          />
          <h2 className="video-title">{selectedVideo.title}</h2>
          <div className="previews-container">
            <div className="previews">
              {selectedVideo.previews.map((preview, index) => (
                <div key={index} className="preview-item">
                  <img
                    src={preview.thumbnail}
                    alt={`Preview ${index + 1}`}
                    className="preview-thumbnail"
                    onClick={() => handlePreviewClick(preview.time)}
                  />
                  <span className="preview-time">{preview.time}s</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="video-list">
          {videos.map((video) => (
            <div
              key={video.id}
              className={`video-item ${selectedVideo.id === video.id ? 'selected' : ''}`}
              onClick={() => handleVideoClick(video)}
            >
              <div className="video-thumbnail">
                <img src={video.thumbnail} alt={video.title} />
              </div>
              <p>{video.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media;

