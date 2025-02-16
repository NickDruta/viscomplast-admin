import { motion } from "framer-motion";
import { PencilIcon } from "admin-bundle/shared/assets";
import cls from "./AdminEditButton.module.scss";
import clsx from "clsx";

interface Props {
  onClick?: () => void;
  className?: string;
}

const AdminEditButton = ({ onClick, className }: Props) => {
  return (
    <motion.button
      className={clsx(cls.editIcon, className)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <PencilIcon />
    </motion.button>
  );
};

export default AdminEditButton;
