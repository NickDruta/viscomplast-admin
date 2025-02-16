import { AdminButton, AdminModal } from "admin-bundle/shared/ui";

import cls from "./ConfirmationModal.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  handleClick: () => void;
  loading?: boolean;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  handleClick,
  loading,
}: Props) => {
  return (
    <AdminModal isOpen={isOpen} onClose={onClose}>
      <p className={cls.title}>{title}</p>
      <div className={cls.actionsWrapper}>
        <AdminButton buttonType="secondary" onClick={onClose}>
          Anulează
        </AdminButton>
        <AdminButton onClick={handleClick} disabled={loading}>
          Șterge
        </AdminButton>
      </div>
    </AdminModal>
  );
};

export default ConfirmationModal;
