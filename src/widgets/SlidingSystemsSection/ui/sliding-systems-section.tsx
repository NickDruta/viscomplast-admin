import { useState } from "react";

import { AddSliding } from "features/AddSliding";
import { SlidingItem } from "entities/SlidingItem";
import { GalleryCardType, SlidingSystemsSectionType } from "shared/schema";

import { AdminAddItem } from "admin-bundle/shared/ui";

import cls from "./sliding-systems-section.module.scss";

interface Props {
  parent: string;
  sliding: SlidingSystemsSectionType;
}

const SlidingSystemsSection = ({ parent, sliding }: Props) => {
  const [addOpen, setAddOpen] = useState(false);
  const [edit, setEdit] = useState<GalleryCardType | null>(null);

  return (
    <div className={cls.wrapper}>
      <p className={cls.title}>{sliding.title.ro}</p>
      <p>{sliding.description.ro}</p>
      <div className={cls.dataWrapper}>
        {sliding.typeGalleryCards.map((card, index) => (
          <SlidingItem
            key={index}
            parent={parent}
            card={card}
            onEdit={(value) => setEdit(value)}
          />
        ))}
        <AdminAddItem onClick={() => setAddOpen(true)} />
      </div>
      {addOpen || edit ? (
        <AddSliding
          parent={parent}
          onClose={() => {
            setAddOpen(false);
            setEdit(null);
          }}
          edit={edit ?? undefined}
        />
      ) : null}
    </div>
  );
};

export default SlidingSystemsSection;
