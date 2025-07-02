import React, { createContext, useContext, useState } from "react";

interface MediaPreviewContextType {
  imageUrl: string | null;
  showPreview: (url: string) => void;
  closePreview: () => void;
}

const MediaPreviewContext = createContext<MediaPreviewContextType | undefined>(
  undefined,
);

export const MediaPreviewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const showPreview = (url: string) => setImageUrl(url);
  const closePreview = () => setImageUrl(null);

  return (
    <MediaPreviewContext.Provider
      value={{ imageUrl, showPreview, closePreview }}
    >
      {children}
    </MediaPreviewContext.Provider>
  );
};

export const useMediaPreview = (): MediaPreviewContextType => {
  const context = useContext(MediaPreviewContext);
  if (!context) {
    throw new Error("useMediaPreview must be used within MediaPreviewProvider");
  }
  return context;
};
