import { motion } from "framer-motion";
import { BinIcon } from "admin-bundle/shared/assets";
import cls from "./AdminBinButton.module.scss";
import clsx from "clsx";

interface Props {
  onClick?: VoidFunction;
  className?: string;
}

const AdminBinButton = ({ onClick, className }: Props) => {
  return (
    <motion.button
      className={clsx(cls.binIcon, className)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <BinIcon />
    </motion.button>
  );
};

export default AdminBinButton;
