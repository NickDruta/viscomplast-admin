import { motion } from "framer-motion";
import clsx from "clsx";

import { KeyboardLeftIcon } from "admin-bundle/shared/assets";

import cls from "./AdminBackButton.module.scss";

interface Props {
  className?: string;
  onClick?: () => void;
}

const AdminBackButton = ({ className, onClick }: Props) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={clsx(cls.backButton, className)}
      onClick={onClick}
    >
      <KeyboardLeftIcon width={18} height={18} stroke={"#fff"} />
    </motion.button>
  );
};

export default AdminBackButton;
