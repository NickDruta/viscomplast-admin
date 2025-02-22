import { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import {
  editHandleInSection,
  updateHandleInSection,
} from "entities/HandlesData";
import { HandleType } from "shared/schema";

import {
  AdminButton,
  AdminImageUploader,
  AdminInput,
  AdminModal,
} from "admin-bundle/shared/ui";

import cls from "./add-handle.module.scss";

interface Props {
  parent: string;
  onClose: VoidFunction;
  data?: HandleType;
}

const AddHandle = ({ parent, onClose, data }: Props) => {
  const [image, setImage] = useState<string | null>(data?.src ?? null);
  const [names, setNames] = useState(
    data?.name ?? {
      ro: "",
      ru: "",
      en: "",
    },
  );
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File): Promise<string> => {
    setLoading(true);
    const storage = getStorage();
    const fileName = `${file.name}-${Date.now()}`;
    const storageRef = ref(storage, `handles/${fileName}`);

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setImage(url);
    setLoading(false);
    return url;
  };

  const handleAdd = async () => {
    setLoading(true);
    const newHandle = {
      id: Date.now(),
      src: image,
      name: names,
    };

    try {
      await updateHandleInSection(parent, newHandle);
      console.log("Handle added successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Error adding handle:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!data) return;

    setLoading(true);
    const updatedHandle = {
      ...data,
      src: image,
      name: names,
    };

    try {
      await editHandleInSection(parent, updatedHandle);
      console.log("Handle updated successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Error editing handle:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (data) {
        await handleEdit();
      } else {
        await handleAdd();
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <AdminModal onClose={onClose}>
      <p className={cls.title}>Adauga Mâner</p>
      <div className={cls.wrapper}>
        <div className={cls.imageWrapper}>
          <AdminImageUploader
            onUpload={handleUpload}
            images={data && image ? [image] : undefined}
            loading={loading}
          />
        </div>
        <div className={cls.inputWrapper}>
          <p>Nume</p>
          <AdminInput
            placeholder="Română"
            value={names.ro}
            onChange={(e) => setNames({ ...names, ro: e.target.value })}
          />
          <AdminInput
            placeholder="Rusă"
            value={names.ru}
            onChange={(e) => setNames({ ...names, ru: e.target.value })}
          />
          <AdminInput
            placeholder="Engleză"
            value={names.en}
            onChange={(e) => setNames({ ...names, en: e.target.value })}
          />
        </div>
      </div>
      <div className={cls.buttons}>
        <AdminButton buttonType="secondary" onClick={onClose}>
          Anuleaza
        </AdminButton>
        <AdminButton disabled={loading} onClick={handleSubmit}>
          Confirma
        </AdminButton>
      </div>
    </AdminModal>
  );
};

export default AddHandle;
