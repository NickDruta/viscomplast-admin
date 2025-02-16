import { motion } from "framer-motion";
import { CancelIcon } from "admin-bundle/shared/assets";
import cls from "./AdminCancelButton.module.scss";

interface Props {
  onClick?: () => void;
}

const AdminCancelButton = ({ onClick }: Props) => {
  return (
    <motion.button
      className={cls.cancelButton}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <CancelIcon />
    </motion.button>
  );
};

export default AdminCancelButton;
