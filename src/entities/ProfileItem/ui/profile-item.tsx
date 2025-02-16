import { useState } from "react";

import { deleteProfileInSection } from "entities/PagesData";
import { ProfileType } from "shared/schema";

import { ConfirmationModal } from "admin-bundle/entities/ConfirmationModal";
import { AdminBinButton, AdminEditButton } from "admin-bundle/shared/ui";

import cls from "./profile-item.module.scss";

interface Props {
  parent: string;
  profile: ProfileType;
  onEdit: (data: ProfileType) => void;
}

const ProfileItem = ({ parent, profile, onEdit }: Props) => {
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteProfile = async () => {
    setLoading(true);
    try {
      await deleteProfileInSection(parent, profile.id);

      window.location.reload();
      console.log("Profile deleted successfully!");
    } catch (error) {
      console.error("Failed to delete profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cls.profile}>
      <img className={cls.image} src={profile.image} alt="" />
      <div className={cls.about}>
        <p className={cls.profileTitle}>{profile.title.ro}</p>
        <p className={cls.profileDescription}>{profile.description.ro}</p>
      </div>
      <AdminBinButton className={cls.bin} onClick={() => setConfirm(true)} />
      <AdminEditButton className={cls.edit} onClick={() => onEdit(profile)} />

      <ConfirmationModal
        isOpen={confirm}
        onClose={() => setConfirm(false)}
        title={"Sterge Profil?"}
        handleClick={handleDeleteProfile}
        loading={loading}
      />
    </div>
  );
};

export default ProfileItem;
