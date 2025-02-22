import { useState } from "react";
import clsx from "clsx";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { addSlidingCard, updateSlidingCard } from "entities/SlidingData";
import { galleryCardSchema, GalleryCardType } from "shared/schema";

import {
  AdminButton,
  AdminImageUploader,
  AdminInput,
  AdminModal,
  AdminTextArea,
} from "admin-bundle/shared/ui";

import cls from "./add-sliding.module.scss";

interface Props {
  parent: string;
  onClose: VoidFunction;
  edit?: GalleryCardType;
}

const AddSliding = ({ parent, onClose, edit }: Props) => {
  const [gallery, setGallery] = useState<string[]>(edit?.gallery || []);
  const [title, setTitle] = useState({
    ro: edit?.title?.ro || "",
    ru: edit?.title?.ru || "",
    en: edit?.title?.en || "",
  });
  const [description, setDescription] = useState({
    ro: edit?.description?.ro || "",
    ru: edit?.description?.ru || "",
    en: edit?.description?.en || "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = async (file: File): Promise<string> => {
    setLoading(true);
    const storage = getStorage();
    const fileName = `${file.name}-${Date.now()}`;
    const storageRef = ref(storage, `export/${fileName}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    setGallery([url]);
    setLoading(false);
    return url;
  };

  const handleConfirm = async () => {
    const newCard: GalleryCardType = {
      title,
      description,
      gallery,
    };

    const parseResult = galleryCardSchema.safeParse(newCard);
    if (!parseResult.success) {
      console.error(parseResult.error);
      return;
    }

    setLoading(true);
    try {
      if (edit) {
        await updateSlidingCard(parent, edit, newCard);
      } else {
        await addSlidingCard(parent, newCard);
      }
      window.location.reload();
    } catch (err) {
      console.error("Error saving sliding card:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminModal onClose={onClose}>
      <p className={cls.title}>
        {edit ? "Editează Glisant" : "Adaugă Glisant"}
      </p>
      <div className={cls.contentWrapper}>
        <div className={clsx(cls.section, cls.imageWrapper)}>
          <AdminImageUploader
            onUpload={handleUpload}
            images={gallery}
            loading={loading}
            isMultiple={true}
          />
        </div>
        <div className={cls.section}>
          <p className={cls.sectionTitle}>Titlu</p>
          <AdminInput
            placeholder="Romană"
            value={title.ro}
            onChange={(e) =>
              setTitle((prev) => ({ ...prev, ro: e.target.value }))
            }
          />
          <AdminInput
            placeholder="Rusă"
            value={title.ru}
            onChange={(e) =>
              setTitle((prev) => ({ ...prev, ru: e.target.value }))
            }
          />
          <AdminInput
            placeholder="Engleză"
            value={title.en}
            onChange={(e) =>
              setTitle((prev) => ({ ...prev, en: e.target.value }))
            }
          />
        </div>
        <div className={cls.section}>
          <p className={cls.sectionTitle}>Descrierea</p>
          <AdminTextArea
            name="Romană"
            placeholder="Romană"
            value={description.ro}
            onChange={(e) =>
              setDescription((prev) => ({ ...prev, ro: e.target.value }))
            }
          />
          <AdminTextArea
            name="Rusă"
            placeholder="Rusă"
            value={description.ru}
            onChange={(e) =>
              setDescription((prev) => ({ ...prev, ru: e.target.value }))
            }
          />
          <AdminTextArea
            name="Engleză"
            placeholder="Engleză"
            value={description.en}
            onChange={(e) =>
              setDescription((prev) => ({ ...prev, en: e.target.value }))
            }
          />
        </div>
      </div>
      <div className={cls.buttons}>
        <AdminButton buttonType="secondary" onClick={onClose}>
          Anulează
        </AdminButton>
        <AdminButton onClick={handleConfirm} disabled={loading}>
          Confirmă
        </AdminButton>
      </div>
    </AdminModal>
  );
};

export default AddSliding;
