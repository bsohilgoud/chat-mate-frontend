import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import Modal from "react-modal";
import {
  FaFile,
  FaFileAudio,
  FaFileCode,
  FaFileExcel,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileVideo,
  FaFileWord,
  FaRegTrashCan,
} from "react-icons/fa6";
import { formatBytes } from "../../services/helper";
import { FaFileAlt, FaFileArchive, FaFileImage } from "react-icons/fa";
import { CircularProgress } from "./CircularProgress";
import api from "../../services/api";
import { AxiosProgressEvent } from "axios";
import { useAuthContext } from "../../context/AuthContext";
import { useChat } from "../../hooks/useChat";
import { useParams } from "react-router-dom";

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
    borderRadius: "12px",
    border: "none",
    padding: "0",
    maxWidth: "600px",
    width: "90%",
    maxHeight: "90vh",
    overflow: "hidden",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    color: "var(--text-primary)",
  },
};

type MediaUploadProps = {
  children: ReactNode;
  onUpload?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;
};

type UploadProgress = {
  [fileName: string]: number;
};

export const MediaUpload = ({
  children,
  onUpload,
  multiple = true,
  accept = "*/*",
}: MediaUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { reloadSummaryAndMessages } = useChat();

  const { user } = useAuthContext();
  const { partnerId } = useParams();

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  const closeModal = () => {
    setShowModal(false);
    setFiles([]);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      setShowModal(true);
      event.target.value = "";
    }
  };

  function getFileTypeByMime(file) {
    const mime = file.type;
    if (mime.startsWith("image/")) return "IMAGE";
    if (mime.startsWith("video/")) return "VIDEO";
    if (mime.startsWith("audio/")) return "AUDIO";
    return "FILE";
  }

  const handleUpload = async () => {
    const uploadPromises = files.map((file, index) => {
      const formData = new FormData();
      formData.append("senderId", user?.id);
      formData.append("content", "");
      formData.append("receiverId", partnerId);
      formData.append("file", file);
      formData.append("type", getFileTypeByMime(file));
      formData.append("status", "DELIVERED");
      formData.append("timestamp", new Date().toISOString().replace("Z", ""));

      return api.post("/messages/media", formData, {
        // api.post("/post", formData, {
        // baseURL: "https://httpbin.org",
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const { loaded, total } = progressEvent;
          if (total) {
            const progress = Math.floor((loaded * 100) / total);
            setUploadProgress((prev) => {
              return { ...prev, [`${file.name}-${index}`]: progress };
            });
          }
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    });

    try {
      const uploadResponses = await Promise.all(uploadPromises);
      uploadResponses.forEach((response, index) => {
        const res = response.data;
        console.log(`Upload response for file ${files[index].name}:`, res);
        reloadSummaryAndMessages(res.payload);
      });
      closeModal();
    } catch (error) {
      console.error("One or more uploads failed", error);
      closeModal();
    }
  };

  return (
    <>
      <div className="cursor-pointer" onClick={handleIconClick}>
        {children}
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
        <div className="bg-[var(--secondary-color)] text-[var(--text-secondary)] w-full h-full">
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <h3 className="text-xl font-semibold">Upload Files</h3>
            <button
              onClick={closeModal}
              className="p-2 hover:text-gray-100 rounded-lg transition-colors"
            >
              {"x"}
            </button>
          </div>
          <div className="py-2 px-4 overflow-y-auto max-h-[70vh]">
            {files.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium mb-3">
                  Selected Files ({files.length})
                </h4>
                <div className="space-y-3 max-h-100 overflow-y-auto">
                  {files.map((file, index) => (
                    <div key={`${file.name}-${index}`}>
                      <FilePreview
                        file={file}
                        onRemove={removeFile}
                        progress={uploadProgress[`${file.name}-${index}`]}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex p-4 w-full border-t border-gray-200 mt-3 justify-end gap-3">
            <div
              className="flex justify-center items-center px-4 py-3 gap-3 text-[var(--accent-color)] rounded-xl border-[0.5px] border-[var(--accent-color)] font-bold cursor-pointer"
              onClick={closeModal}
            >
              Cancel
            </div>
            <div
              className="flex bg-gradient-to-br from-[#6a40ff] to-[#9d7bff] p-3 gap-3 text-white rounded-xl justify-center items-center cursor-pointer"
              onClick={handleUpload}
            >
              <span>Upload</span>
              <span className="w-8 h-8 flex justify-center items-center rounded-full font-bold right-0 botttom-0 bg-red-400">
                {files.length}
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

const FilePreview = ({
  file,
  onRemove,
  progress,
}: {
  file: File;
  onRemove: (file: File) => void;
  progress: number;
}) => {
  const [preview, setPreview] = useState(null);
  const isImage = file.type.startsWith("image/");

  useEffect(() => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result);
      reader.readAsDataURL(file);
    }
  }, [file]);

  const fileIcon = {
    "application/pdf": <FaFilePdf size={36} />,
    "image/jpeg": <FaFileImage size={36} />,
    "image/png": <FaFileImage size={36} />,
    "image/gif": <FaFileImage size={36} />,
    "application/msword": <FaFileWord size={36} />,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": (
      <FaFileWord size={36} />
    ),
    "application/vnd.ms-excel": <FaFileExcel size={36} />,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": (
      <FaFileExcel size={36} />
    ),
    "application/vnd.ms-powerpoint": <FaFilePowerpoint size={36} />,
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      <FaFilePowerpoint size={36} />,
    "application/zip": <FaFileArchive size={36} />,
    "application/x-rar-compressed": <FaFileArchive size={36} />,
    "application/x-zip-compressed": <FaFileArchive size={36} />,
    "video/mp4": <FaFileVideo size={36} />,
    "audio/mpeg": <FaFileAudio size={36} />,
    "text/plain": <FaFileAlt size={36} />,
    "text/html": <FaFileCode size={36} />,
  };

  const getFileIcon = (type: string) => fileIcon[type] || <FaFile size={36} />;

  return (
    <>
      <div className="flex gap-4 max-w-full px-4 py-3 bg-[var(--primary-color)] rounded-lg border-[0.5px] border-[var(--border-color)]">
        <div className="uploaded-icon w-20 h-20 rounded flex items-center justify-center text-[var(--accent-color)]">
          {isImage && preview ? (
            <img
              src={preview}
              className="h-full w-full object-cover rounded-lg border"
            />
          ) : (
            getFileIcon(file.type)
          )}
        </div>
        <div className="flex flex-col gap-2 flex-1 self-center min-w-0">
          <div className="truncate text-[1.35rem]">{file.name}</div>
          <div className="metadata text-[1rem]">
            {formatBytes(file.size)} • {file.type || "Unknown type"}
          </div>
        </div>
        <div className="">
          {progress !== undefined ? (
            <CircularProgress progress={progress} />
          ) : (
            <div onClick={() => onRemove(file)}>
              <FaRegTrashCan className="hover:text-red-400" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
