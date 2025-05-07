import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "../Button/Button";
import { FaRegImage } from "react-icons/fa6";
import "./FileUploader.css";
import { FaFileAlt } from "react-icons/fa";
import axios from "axios";
import { ChatMessageType, useChatContext } from "../../../context/ChatContext";
import { formatBytes } from "../../../services/helper";
import api from "../../../services/api";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export const FileUploader = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);

  const { chatPartner, setChatMessages } = useChatContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      console.log("File selected:", selectedFile?.name);
      setShowModal(true);
      setUploadStatus("idle");
      setUploadProgress(0);
    } else {
      setFile(null);
      console.log("No file selected");
      setShowModal(false);
      setUploadStatus("idle");
      setUploadProgress(0);
    }
    event.target.value = "";
  };

  const handleUpload = async (file: File | null) => {
    if (!file) return;

    try {
      setUploadStatus("uploading");
      setUploadProgress(0);

      const userId = sessionStorage.getItem("userId");

      const formData = new FormData();
      formData.append("senderId", userId);
      formData.append("content", "");
      formData.append("receiverId", chatPartner?.userId);
      formData.append("file", file);
      formData.append("type", "IMAGE");
      formData.append("status", "PENDING");
      formData.append("timestamp", new Date().toISOString().replace("Z", ""));

      const response = await api.post("/messages/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100,
          );
          setUploadProgress(progress);
        },
      });

      if (response.status === 200) {
        const newMessage = response.data;
        setChatMessages((prevMessages: ChatMessageType) => [
          ...prevMessages,
          newMessage,
        ]);
        setUploadStatus("success");
        setShowModal(false);
      } else {
        setUploadStatus("error");
      }
    } catch (error) {
      console.log(error);
      setUploadStatus("error");
    }
  };

  return (
    <>
      <div
        className="file-uploader-trigger"
        onClick={handleIconClick}
        style={{ cursor: "pointer" }}
      >
        {children || <FaRegImage size={20} />}
      </div>
      <div className="file-uploader">
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
        className="file-uploader-modal"
      >
        <Modal.Header closeButton className="file-uploader-header">
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body className="file-uploader-body">
          <div className="file-items-container">
            {file && (
              <div className="file-item">
                <div className="file-item-icon">
                  <FaFileAlt size={18} />
                </div>
                <div className="file-item-info">
                  <div className="file-item-name">{file.name}</div>
                  <div className="file-item-size">{formatBytes(file.size)}</div>
                </div>
                <div className="upload-progress">{`${uploadProgress}%`}</div>
                {/* <div className="upload-progress">{`${uploadStatus}`}</div> */}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="file-uploaded-footer">
          <button
            className="button-primary btn-upload"
            onClick={() => handleUpload(file)}
          >
            Send
          </button>
          <button
            className="button-secondary btn-cancel"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
