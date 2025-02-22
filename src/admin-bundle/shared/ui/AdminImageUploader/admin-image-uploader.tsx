import { useState, useRef } from "react";

import {
  AdminAddButton,
  AdminBinButton,
  AdminButton,
} from "admin-bundle/shared/ui";

import cls from "./admin-image-uploader.module.scss";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { PlusIcon } from "../../assets";

interface Props {
  onUpload?: (file: File) => Promise<string>;
  onUploadSuccess?: (downloadUrl: string) => void;
  images?: string[]; // Array of image URLs
  loading?: boolean;
  isMultiple?: boolean; // Determines if it's single or multiple upload
}

const AdminImageUploader = ({
  onUpload,
  onUploadSuccess,
  images = [],
  loading,
  isMultiple = false,
}: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(images);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      const newPreviewUrls = selectedFiles.map((file) =>
        URL.createObjectURL(file),
      );
      setPreviewUrls((prevUrls) =>
        isMultiple ? [...prevUrls, ...newPreviewUrls] : newPreviewUrls,
      );
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!files.length) {
      console.warn("No files selected.");
      return;
    }
    files.forEach((file) => {
      onUpload?.(file)
        .then((downloadUrl) => {
          if (onUploadSuccess) {
            onUploadSuccess(downloadUrl);
          }
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
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
        multiple={isMultiple}
        accept="image/*"
      />

      {/* Show file selection button if no preview exists */}
      {previewUrls.length === 0 ? (
        <div className={cls.inputFileContainer}>
          <AdminAddButton onClick={handleButtonClick} />
        </div>
      ) : isMultiple ? (
        // Multiple images - Show carousel
        <div className={cls.previewContainer}>
          <Carousel
            showThumbs={false}
            infiniteLoop
            className={cls.carousel}
            renderArrowPrev={(onClickHandler, hasPrev) =>
              hasPrev && (
                <AdminButton onClick={onClickHandler} className={cls.arrowLeft}>
                  {"←"}
                </AdminButton>
              )
            }
            renderArrowNext={(onClickHandler, hasNext) =>
              hasNext && (
                <AdminButton
                  onClick={onClickHandler}
                  className={cls.arrowRight}
                >
                  {"→"}
                </AdminButton>
              )
            }
          >
            {previewUrls.map((url, index) => (
              <div key={index} className={cls.carouselItem}>
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className={cls.previewImage}
                />
                <AdminBinButton
                  onClick={() => handleDelete(index)}
                  className={cls.deleteButton}
                />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        // Single image - Show image only
        <div className={cls.previewContainer}>
          <img
            src={previewUrls[0]}
            alt="Preview"
            className={cls.previewImage}
          />
          <AdminBinButton
            onClick={() => handleDelete(0)}
            className={cls.deleteButton}
          />
        </div>
      )}

      <div
        style={{ display: "flex", gap: 15, justifyContent: "space-between" }}
      >
        <AdminButton
          onClick={handleSave}
          disabled={loading}
          style={{ width: "100%" }}
        >
          Salvează pozele
        </AdminButton>

        {/* Show Plus Button only if it's multiple images mode */}
        {isMultiple && (
          <AdminButton
            onClick={handleButtonClick}
            disabled={loading}
            style={{ minWidth: 52, height: 52 }}
          >
            <PlusIcon width={16} height={16} fill={"#fff"} />
          </AdminButton>
        )}
      </div>
    </div>
  );
};

export default AdminImageUploader;
