import React, { useEffect, useState, useRef } from "react";
import { useMediaPreview } from "../../context/MediaPreviewContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiZoomIn, FiZoomOut, FiArrowLeft } from "react-icons/fi";

const MediaPreview: React.FC = () => {
  const { imageUrl, closePreview } = useMediaPreview();
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closePreview]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY;
    if (delta < 0) {
      setZoom((prev) => Math.min(prev + 0.1, 3));
    } else {
      setZoom((prev) => Math.max(prev - 0.1, 0.5));
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "image.jpg";
    link.click();
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));

  if (!imageUrl) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-grey-900 bg-opacity-80 backdrop-blur-md flex flex-col"
        onClick={closePreview}
      >
        {/* Top Menu Bar */}
        <div
          className="w-full max-w-7xl mx-auto flex justify-between items-center p-3 text-[var(--text-primary)] z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closePreview}
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <FiArrowLeft size={20} />
            Back
          </button>
          <div className="flex items-center gap-4">
            <button onClick={handleZoomOut} className="hover:text-gray-300">
              <FiZoomOut size={20} />
            </button>
            <button onClick={handleZoomIn} className="hover:text-gray-300">
              <FiZoomIn size={20} />
            </button>
            <button onClick={handleDownload} className="hover:text-gray-300">
              <FiDownload size={20} />
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div
          ref={containerRef}
          onClick={(e) => e.stopPropagation()}
          onWheel={handleWheel}
          className="flex-1 flex items-center justify-center overflow-auto p-4"
        >
          <motion.img
            src={imageUrl}
            style={{ transform: `scale(${zoom})` }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: zoom, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MediaPreview;
