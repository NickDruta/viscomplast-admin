import { motion } from "framer-motion";
import { ConfirmIcon } from "admin-bundle/shared/assets";
import cls from "./AdminConfirmButton.module.scss";

interface Props {
  onClick?: () => void;
}

const AdminConfirmButton = ({ onClick }: Props) => {
  return (
    <motion.button
      className={cls.confirmIcon}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <ConfirmIcon />
    </motion.button>
  );
};

export default AdminConfirmButton;
