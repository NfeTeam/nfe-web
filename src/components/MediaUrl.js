import React, { useEffect, useState } from "react";

const getMediaUrl = (url, type) => {
  if (!url) {
    console.warn("Invalid media URL", url);
    return "";
  }

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