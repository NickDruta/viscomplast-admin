import { useState } from "react";

import { uploadPartnerFile } from "entities/PartnersData";

import { AdminImageUploader, AdminModal } from "admin-bundle/shared/ui";

import cls from "./add-partner.module.scss";

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
}

const AddPartner = ({ isOpen, onClose }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = (file: File) => {
    setLoading(true);
    return uploadPartnerFile(file);
  };

  const handleUploadSuccess = (downloadUrl: string) => {
    console.log("File available at", downloadUrl);
    onClose();
  };

  return (
    <AdminModal isOpen={isOpen} onClose={onClose}>
      <p className={cls.title}>Adaugă partener</p>
      <AdminImageUploader
        onUpload={handleUpload}
        onUploadSuccess={handleUploadSuccess}
        loading={loading}
      />
    </AdminModal>
  );
};

export default AddPartner;
