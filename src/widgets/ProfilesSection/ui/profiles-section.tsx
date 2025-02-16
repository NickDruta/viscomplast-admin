import { useState } from "react";

import { AddProfile } from "features/AddProfile";
import { ProfileItem } from "entities/ProfileItem";
import { ProfilesSectionType, ProfileType } from "shared/schema";

import { AdminAddItem } from "admin-bundle/shared/ui";

import cls from "./profiles-section.module.scss";

interface Props {
  parent: string;
  profilesSection: ProfilesSectionType;
}

const ProfilesSection = ({ parent, profilesSection }: Props) => {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState<ProfileType | null>(null);

  return (
    <div className={cls.profilesSection}>
      <p className={cls.title}>{profilesSection.sectionTitle.ro}</p>
      <div className={cls.dataWrapper}>
        {profilesSection.profiles.map((profile, index) => (
          <ProfileItem
            key={index}
            parent={parent}
            profile={profile}
            onEdit={(profile) => setEditOpen(profile)}
          />
        ))}
        <AdminAddItem
          onClick={() => setAddOpen(true)}
          className={cls.addItem}
        />
      </div>
      {addOpen || editOpen ? (
        <AddProfile
          parent={parent}
          onClose={() => {
            setAddOpen(false);
            setEditOpen(null);
          }}
          data={editOpen ?? undefined}
        />
      ) : null}
    </div>
  );
};

export default ProfilesSection;
