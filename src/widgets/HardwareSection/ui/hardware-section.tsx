import { useState } from "react";

import { EditHardware } from "features/EditHardware";
import { HardwareSectionType } from "shared/schema";

import { AdminEditButton } from "admin-bundle/shared/ui";

import cls from "./hardware-section.module.scss";

interface Props {
  parent: string;
  hardware: HardwareSectionType;
}

const HardwareSection = ({ parent, hardware }: Props) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className={cls.wrapper}>
      <p className={cls.title}>{hardware.title.ro}</p>
      <p className={cls.description}>{hardware.description.ro}</p>
      <AdminEditButton className={cls.edit} onClick={() => setEdit(true)} />
      {edit ? (
        <EditHardware
          parent={parent}
          hardware={hardware}
          onClose={() => setEdit(false)}
        />
      ) : null}
    </div>
  );
};

export default HardwareSection;
