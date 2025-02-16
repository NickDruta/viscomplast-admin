import { useState, useRef } from "react";

import {
  AdminAddButton,
  AdminBinButton,
  AdminButton,
} from "admin-bundle/shared/ui";

import cls from "./admin-image-uploader.module.scss";

interface Props {
  onUpload?: (file: File) => Promise<string>;
  onUploadSuccess?: (downloadUrl: string) => (file: File) => Promise<string>;
  image?: string;
  loading?: boolean;
}

const AdminImageUploader = ({
  onUpload,
  onUploadSuccess,
  image,
  loading,
}: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(image ?? "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = () => {
    setFile(null);
    setPreviewUrl("");
  };

  const handleSave = () => {
    if (!file) {
      console.warn("No file selected.");
      return;
    }
    onUpload?.(file)
      .then((downloadUrl) => {
        if (onUploadSuccess) {
          onUploadSuccess(downloadUrl);
        }
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    <div className={cls.wrapper}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Show file selection button if no preview exists */}
      {!previewUrl ? (
        <div className={cls.inputFileContainer}>
          <AdminAddButton onClick={handleButtonClick} />
        </div>
      ) : (
        // Show preview and delete button if a file has been selected
        <div className={cls.previewContainer}>
          <img src={previewUrl} alt="Preview" className={cls.previewImage} />
          <AdminBinButton onClick={handleDelete} className={cls.deleteButton} />
        </div>
      )}

      <AdminButton onClick={handleSave} disabled={loading}>
        Salvează poza
      </AdminButton>
    </div>
  );
};

export default AdminImageUploader;
