import React, { useState } from "react";
import { IoMdDownload } from "react-icons/io";

import "./MediaMessageContent.css";
import { formatBytes } from "../../../services/helper";
import { getMediaFile } from "../../../services/api";

export const MediaMessageContent = ({ mediaMeta }) => {
  const [mediaFile, setMediaFile] = useState(null);
  const fileSize = formatBytes(mediaMeta.size);
  const fileUrl = mediaMeta.name;

  const handleMediaDownload = async (url) => {
    const responseData = await getMediaFile(url);
    const blob = new Blob([responseData]);
    const objectURL = window.URL.createObjectURL(blob); // 2
    setMediaFile(objectURL);
  };

  return (
    <div className="media-bubble">
      {mediaFile ? (
        <img src={mediaFile} alt="Image" className="media-image" />
      ) : (
        <div
          className="download-overlay"
          onClick={() => handleMediaDownload(fileUrl)}
        >
          <IoMdDownload size={36} color="white" />
          <label>{fileSize}</label>
        </div>
      )}
    </div>
  );
};
