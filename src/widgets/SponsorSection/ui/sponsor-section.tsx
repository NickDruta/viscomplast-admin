import { useState } from "react";

import { EditSponsor } from "features/EditSponsor";
import { SponsorSectionType } from "shared/schema";

import { AdminEditButton } from "admin-bundle/shared/ui";

import cls from "./sponsor-section.module.scss";

interface Props {
  sponsor: SponsorSectionType;
}

const SponsorSection = ({ sponsor }: Props) => {
  const [sponsorOpen, setSponsorOpen] = useState(false);

  return (
    <div className={cls.wrapper}>
      <p className={cls.title}>{sponsor.title.ro}</p>
      <p className={cls.description}>{sponsor.description.ro}</p>
      <AdminEditButton
        className={cls.edit}
        onClick={() => setSponsorOpen(true)}
      />
      {sponsorOpen ? (
        <EditSponsor
          sponsor={sponsor.description}
          onClose={() => setSponsorOpen(false)}
        />
      ) : null}
    </div>
  );
};

export default SponsorSection;
