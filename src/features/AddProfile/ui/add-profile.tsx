import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  editProfileInSection,
  updateProfileInSection,
} from "entities/PagesData";
import { profileSchema, ProfileType } from "shared/schema";

import {
  AdminButton,
  AdminImageUploader,
  AdminInput,
  AdminModal,
} from "admin-bundle/shared/ui";

import cls from "./add-profile.module.scss";

interface Props {
  parent: string;
  onClose: VoidFunction;
  data?: ProfileType;
}

const AddProfile = ({ parent, onClose, data }: Props) => {
  const [image, setImage] = useState(data?.image ?? "");
  const [title, setTitle] = useState(data?.title ?? { ro: "", ru: "", en: "" });
  const [description, setDescription] = useState(
    data?.description ?? { ro: "", ru: "", en: "" },
  );
  const [characteristics, setCharacteristics] = useState(
    data?.characteristics ?? {
      ro: [],
      ru: [],
      en: [],
    },
  );

  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File): Promise<string> => {
    setLoading(true);
    const storage = getStorage();
    const fileName = `${file.name}-${Date.now()}`;
    const storageRef = ref(storage, `profiles/${fileName}`);

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setImage(url);
    setLoading(false);
    return url;
  };

  const handleAdd = async () => {
    setLoading(true);
    const newProfile: ProfileType = {
      id: Date.now(),
      seq: 1,
      title,
      description,
      characteristics,
      image,
    };

    try {
      profileSchema.parse(newProfile);

      await updateProfileInSection(parent, newProfile);

      console.log(
        "Profile updated successfully in the parent's profiles array!",
      );
      window.location.reload();
    } catch (err) {
      console.error("Validation or update failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!data) return;

    setLoading(true);
    const updatedProfile: ProfileType = {
      ...data,
      title,
      description,
      characteristics,
      image,
    };

    try {
      profileSchema.parse(updatedProfile);
      await editProfileInSection(parent, updatedProfile);

      console.log("Profile updated successfully!");
      window.location.reload();
    } catch (err) {
      console.error("Validation or update failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (data) {
      handleEdit();
    } else {
      handleAdd();
    }
  };

  return (
    <AdminModal isOpen={true} onClose={onClose}>
      <p className={cls.title}>Adauga Profil</p>
      <div className={cls.content}>
        <div className={cls.section}>
          <div className={cls.inputWrapper}>
            <p>Adauga poza</p>
            <div className={cls.imageWrapper}>
              <AdminImageUploader
                onUpload={handleUpload}
                image={data ? image : undefined}
                loading={loading}
              />
            </div>
          </div>
        </div>
        <div className={cls.section}>
          <div className={cls.inputWrapper}>
            <p>Titlu</p>
            <AdminInput
              value={title.ro}
              onChange={(e) => setTitle({ ...title, ro: e.target.value })}
              placeholder="Romana"
            />
            <AdminInput
              value={title.ru}
              onChange={(e) => setTitle({ ...title, ru: e.target.value })}
              placeholder="Rusa"
            />
            <AdminInput
              value={title.en}
              onChange={(e) => setTitle({ ...title, en: e.target.value })}
              placeholder="Engleza"
            />
          </div>
          <div className={cls.inputWrapper}>
            <p>Descriere</p>
            <AdminInput
              value={description.ro}
              onChange={(e) =>
                setDescription({ ...description, ro: e.target.value })
              }
              placeholder="Romana"
            />
            <AdminInput
              value={description.ru}
              onChange={(e) =>
                setDescription({ ...description, ru: e.target.value })
              }
              placeholder="Rusa"
            />
            <AdminInput
              value={description.en}
              onChange={(e) =>
                setDescription({ ...description, en: e.target.value })
              }
              placeholder="Engleza"
            />
          </div>
        </div>
        <div className={cls.section}>
          <div className={cls.inputWrapper}>
            <p>Caracteristici</p>
            <AdminInput
              placeholder="Romana"
              onPlusClick={(value) =>
                setCharacteristics({
                  ...characteristics,
                  ro: [...characteristics.ro, value],
                })
              }
              withPlus
            />
            {characteristics.ro.map(
              (item, key) =>
                item && (
                  <div key={key} className={cls.charateristics}>
                    <p>{item}</p>
                    <p
                      onClick={() =>
                        setCharacteristics((prev) => ({
                          ...prev,
                          ro: prev.ro.map((value, idx) =>
                            idx === key ? "" : value,
                          ),
                        }))
                      }
                      style={{ cursor: "pointer" }}
                    >
                      X
                    </p>
                  </div>
                ),
            )}
            <AdminInput
              placeholder="Rusa"
              onPlusClick={(value) =>
                setCharacteristics({
                  ...characteristics,
                  ru: [...characteristics.ru, value],
                })
              }
              withPlus
            />
            {characteristics.ru.map(
              (item, key) =>
                item && (
                  <div key={key} className={cls.charateristics}>
                    <p>{item}</p>
                    <p
                      onClick={() =>
                        setCharacteristics((prev) => ({
                          ...prev,
                          ru: prev.ru.map((value, idx) =>
                            idx === key ? "" : value,
                          ),
                        }))
                      }
                      style={{ cursor: "pointer" }}
                    >
                      X
                    </p>
                  </div>
                ),
            )}
            <AdminInput
              placeholder="Engleza"
              onPlusClick={(value) =>
                setCharacteristics({
                  ...characteristics,
                  en: [...characteristics.en, value],
                })
              }
              withPlus
            />
            {characteristics.en.map(
              (item, key) =>
                item && (
                  <div key={key} className={cls.charateristics}>
                    <p>{item}</p>
                    <p
                      onClick={() =>
                        setCharacteristics((prev) => ({
                          ...prev,
                          en: prev.en.map((value, idx) =>
                            idx === key ? "" : value,
                          ),
                        }))
                      }
                      style={{ cursor: "pointer" }}
                    >
                      X
                    </p>
                  </div>
                ),
            )}
          </div>
        </div>
      </div>
      <div className={cls.buttonsWrapper}>
        <AdminButton buttonType="secondary" onClick={onClose}>
          Anulează
        </AdminButton>
        <AdminButton onClick={handleSubmit} disabled={loading}>
          Confirmă
        </AdminButton>
      </div>
    </AdminModal>
  );
};

export default AddProfile;
