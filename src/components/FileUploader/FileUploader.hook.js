import { useState } from "react";

export const useFileUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [uploadItems, setUploadItems] = useState([]);

  return {
    isUploading,
    setIsUploading,
    uploadItems,
    setUploadItems,
    isError,
    setIsError,
  };
};
