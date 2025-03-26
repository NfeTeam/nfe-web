import React, { useEffect, useState } from "react";

const getMediaUrl = (url, type) => {
  if (!url) {
    console.warn("Invalid media URL", url);
    return "";
  }

  // Check if it's a YouTube URL
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&loop=1&playlist=${videoId}&mute=1`;
    }
  }

  // Handle Google Drive URL
  const match = url.match(/(?:id=|\/d\/)([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    if (type === "video") {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }

  return url;
};

export default getMediaUrl;