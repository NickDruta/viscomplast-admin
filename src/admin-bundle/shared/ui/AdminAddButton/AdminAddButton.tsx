import { motion } from "framer-motion";
import clsx from "clsx";
import { PlusIcon } from "admin-bundle/shared/assets";
import cls from "./AdminAddButton.module.scss";

interface Props {
  onClick?: () => void;
  className?: string;
}

const AdminAddButton = ({ onClick, className }: Props) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={clsx(cls.addButton, className)}
      onClick={onClick}
    >
      <PlusIcon width={16} height={16} fill={"#fff"} />
    </motion.button>
  );
};

export default AdminAddButton;
