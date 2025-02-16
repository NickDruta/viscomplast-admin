import React, { useState } from "react";

import { updateHardwareSection } from "entities/PagesData";
import { hardwareSectionSchema, HardwareSectionType } from "shared/schema";

import { AdminButton, AdminModal, AdminTextArea } from "admin-bundle/shared/ui";

import cls from "./edit-hardware.module.scss";

interface Props {
  parent: string;
  hardware: HardwareSectionType;
  onClose: VoidFunction;
}

const EditHardware = ({ parent, hardware, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(hardware.description);

  const handleConfirm = async () => {
    setLoading(true);
    const updatedHardware: HardwareSectionType = {
      ...hardware,
      description,
    };

    try {
      hardwareSectionSchema.parse(updatedHardware);

      await updateHardwareSection(parent, updatedHardware);

      console.log("Hardware updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminModal onClose={onClose}>
      <p className={cls.title}>Editeaza Feronerie</p>
      <AdminTextArea
        name="hardware-ro"
        className={cls.textArea}
        value={description.ro}
        onChange={(e) =>
          setDescription((prev) => ({ ...prev, ro: e.target.value }))
        }
      />
      <AdminTextArea
        name="hardware-ru"
        className={cls.textArea}
        value={description.ru}
        onChange={(e) =>
          setDescription((prev) => ({ ...prev, ru: e.target.value }))
        }
      />
      <AdminTextArea
        name="hardware-en"
        className={cls.textArea}
        value={description.en}
        onChange={(e) =>
          setDescription((prev) => ({ ...prev, en: e.target.value }))
        }
      />
      <div className={cls.buttons}>
        <AdminButton buttonType="secondary" onClick={onClose}>
          Anuleaza
        </AdminButton>
        <AdminButton onClick={handleConfirm} disabled={loading}>
          Confirma
        </AdminButton>
      </div>
    </AdminModal>
  );
};

export default EditHardware;
