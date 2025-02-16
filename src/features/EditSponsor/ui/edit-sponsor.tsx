import { useState } from "react";

import { updateSponsorsSectionDescription } from "entities/PartnersData";
import { LanguageSchema } from "shared/schema";

import { AdminButton, AdminModal, AdminTextArea } from "admin-bundle/shared/ui";

import cls from "./edit-sponsor.module.scss";

interface Props {
  sponsor: LanguageSchema;
  onClose: VoidFunction;
}

const EditSponsor = ({ sponsor, onClose }: Props) => {
  const [ro, setRo] = useState<string>(sponsor.ro);
  const [ru, setRu] = useState<string>(sponsor.ru);
  const [en, setEn] = useState<string>(sponsor.en);
  const [loading, setLoading] = useState<boolean>(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const newDescription = { ro, ru, en };
      await updateSponsorsSectionDescription(newDescription);
      window.location.reload();
    } catch (error) {
      console.error("Error updating sponsor description:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminModal onClose={onClose}>
      <p className={cls.title}>Editează Descriere Sponsori</p>
      <div className={cls.content}>
        <AdminTextArea
          name="Română"
          placeholder="Română"
          value={ro}
          onChange={(e) => setRo(e.target.value)}
        />
        <AdminTextArea
          name="Rusă"
          placeholder="Rusă"
          value={ru}
          onChange={(e) => setRu(e.target.value)}
        />
        <AdminTextArea
          name="Engleză"
          placeholder="Engleză"
          value={en}
          onChange={(e) => setEn(e.target.value)}
        />
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

export default EditSponsor;
