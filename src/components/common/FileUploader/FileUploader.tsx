import React, { useRef, useState, useCallback } from "react";
import Modal from "react-modal";
import { Camera, File, Trash2, Eye, X, Upload } from "lucide-react";

// Set the app element for accessibility
if (typeof document !== "undefined") {
  Modal.setAppElement(document.body);
}

// Custom styles for ReactModal
const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  content: {
    position: "relative",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    background: "white",
    borderRadius: "12px",
    border: "none",
    padding: "0",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "90vh",
    overflow: "hidden",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
};

// File Preview Component
const FilePreview = ({ file, onRemove }) => {
  const [preview, setPreview] = useState(null);

  React.useEffect(() => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  }, [file]);

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const isImage = file.type.startsWith("image/");

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 transition-colors">
      <div className="flex items-start space-x-3">
        {/* File Icon/Preview */}
        <div className="flex-shrink-0">
          {isImage && preview ? (
            <img
              src={preview}
              alt={file.name}
              className="w-12 h-12 object-cover rounded-lg border"
            />
          ) : (
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <File className="text-blue-600" size={20} />
            </div>
          )}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <p className="text-md font-medium text-gray-900 truncate">
            {file.name}
          </p>
          <p className="text-xs text-gray-500">
            {formatBytes(file.size)} • {file.type || "Unknown type"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {isImage && preview && (
            <button
              onClick={() => window.open(preview, "_blank")}
              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Preview"
            >
              <Eye size={14} />
            </button>
          )}
          <button
            onClick={() => onRemove(file)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Remove"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Upload Progress Component
const UploadProgress = ({ file, progress, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "uploading":
        return "bg-blue-500";
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "uploading":
        return `Uploading... ${progress}%`;
      case "success":
        return "Upload complete";
      case "error":
        return "Upload failed";
      default:
        return "Ready to upload";
    }
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>{file.name}</span>
        <span>{getStatusText()}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getStatusColor()}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Main FileUploader Component
export const FileUploader = ({
  children,
  onUpload,
  multiple = true,
  accept = "*/*",
}) => {
  const [files, setFiles] = useState([]);
  const [uploadStatuses, setUploadStatuses] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      setShowModal(true);

      // Initialize upload statuses
      const newStatuses = {};
      selectedFiles.forEach((file) => {
        newStatuses[file.name] = { progress: 0, status: "idle" };
      });
      setUploadStatuses((prev) => ({ ...prev, ...newStatuses }));
    }
    event.target.value = "";
  };

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setIsDragOver(false);

    const droppedFiles = Array.from(event.dataTransfer.files);
    if (droppedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
      setShowModal(true);

      // Initialize upload statuses
      const newStatuses = {};
      droppedFiles.forEach((file) => {
        newStatuses[file.name] = { progress: 0, status: "idle" };
      });
      setUploadStatuses((prev) => ({ ...prev, ...newStatuses }));
    }
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
    setUploadStatuses((prev) => {
      const newStatuses = { ...prev };
      delete newStatuses[fileToRemove.name];
      return newStatuses;
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    // Simulate upload process for each file
    for (const file of files) {
      try {
        setUploadStatuses((prev) => ({
          ...prev,
          [file.name]: { progress: 0, status: "uploading" },
        }));

        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          setUploadStatuses((prev) => ({
            ...prev,
            [file.name]: { progress, status: "uploading" },
          }));
        }

        // Simulate successful upload
        setUploadStatuses((prev) => ({
          ...prev,
          [file.name]: { progress: 100, status: "success" },
        }));

        // Call the onUpload callback if provided
        if (onUpload) {
          onUpload(file);
        }
      } catch (error) {
        setUploadStatuses((prev) => ({
          ...prev,
          [file.name]: { progress: 0, status: "error" },
        }));
      }
    }

    // Close modal after a short delay
    setTimeout(() => {
      setShowModal(false);
      setFiles([]);
      setUploadStatuses({});
    }, 1500);
  };

  const closeModal = () => {
    setShowModal(false);
    setFiles([]);
    setUploadStatuses({});
  };

  return (
    <>
      <div
        className="file-uploader-trigger cursor-pointer"
        onClick={handleIconClick}
      >
        {children || (
          <Camera
            size={20}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          />
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        multiple={multiple}
        accept={accept}
      />

      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Upload Files"
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Upload Files</h3>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragOver
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700 mb-2">
              Drop files here or click to browse
            </p>
            <p className="text-md text-gray-500">
              Support for multiple files. Max file size: 10MB
            </p>
            <button
              onClick={handleIconClick}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Choose Files
            </button>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-700 mb-3">
                Selected Files ({files.length})
              </h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={`${file.name}-${index}`}>
                    <FilePreview file={file} onRemove={removeFile} />
                    {uploadStatuses[file.name] && (
                      <UploadProgress
                        file={file}
                        progress={uploadStatuses[file.name].progress}
                        status={uploadStatuses[file.name].status}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={files.length === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Upload {files.length > 0 && `(${files.length})`}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
