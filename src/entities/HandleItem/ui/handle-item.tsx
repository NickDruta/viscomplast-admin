import { useState } from "react";

import { deleteHandleInSection } from "entities/HandlesData";
import { HandleType } from "shared/schema";

import { ConfirmationModal } from "admin-bundle/entities/ConfirmationModal";
import { AdminBinButton, AdminEditButton } from "admin-bundle/shared/ui";

import cls from "./handle-item.module.scss";

interface Props {
  parent: string;
  handle: HandleType;
  onEdit: (data: HandleType) => void;
}

const HandleItem = ({ parent, handle, onEdit }: Props) => {
  const [loading, setLoading] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteHandleInSection(parent, handle.id);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting handle:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cls.wrapper}>
      <img className={cls.image} src={handle.src} alt="" />
      <p>{handle.name.ro}</p>
      <AdminEditButton className={cls.edit} onClick={() => onEdit(handle)} />
      <AdminBinButton className={cls.bin} onClick={() => setDeleteOpen(true)} />

      <ConfirmationModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title={"Șterge Mâner"}
        handleClick={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default HandleItem;
