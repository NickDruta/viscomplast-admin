import { motion, HTMLMotionProps } from "framer-motion";
import clsx from "clsx";
import cls from "./AdminButton.module.scss";

interface Props extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  buttonType?: "primary" | "secondary";
}

const AdminButton = ({
  className,
  children,
  type = "button",
  buttonType = "primary",
  transition,
  ...rest
}: Props) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      type={type}
      className={clsx(
        cls.button,
        buttonType === "secondary" && cls.secondary,
        className,
      )}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default AdminButton;
