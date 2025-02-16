import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useClickAway } from "shared/hooks";
import cls from "./AdminModal.module.scss";

interface ModalProps {
  isOpen?: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const AdminModal: React.FC<ModalProps> = ({
  isOpen = true,
  children,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickAway(modalRef, onClose);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cls.modalOverlay}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <motion.div
            className={cls.modalContent}
            ref={modalRef}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default AdminModal;
