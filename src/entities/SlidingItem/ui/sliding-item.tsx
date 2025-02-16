import { useState } from "react";

import { deleteSlidingCard } from "entities/SlidingData";
import { GalleryCardType } from "shared/schema";

import { ConfirmationModal } from "admin-bundle/entities/ConfirmationModal";
import { AdminBinButton, AdminEditButton } from "admin-bundle/shared/ui";

import cls from "./sliding-item.module.scss";

interface Props {
  parent: string;
  card: GalleryCardType;
  onEdit: (value: GalleryCardType) => void;
}

const SlidingItem = ({ parent, card, onEdit }: Props) => {
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteSlidingCard(parent, card);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting sliding card:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cls.cardWrapper}>
      <img src={card.gallery[0]} alt="" />
      <div className={cls.infoWrapper}>
        <p className={cls.infoTitle}>{card.title.ro}</p>
        <p>{card.description.ro}</p>
      </div>
      <AdminEditButton className={cls.edit} onClick={() => onEdit(card)} />
      <AdminBinButton className={cls.bin} onClick={() => setConfirm(true)} />

      <ConfirmationModal
        isOpen={confirm}
        onClose={() => setConfirm(false)}
        title="Șterge Glisante"
        handleClick={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default SlidingItem;
