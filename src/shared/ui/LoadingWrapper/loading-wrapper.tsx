import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import cls from "./loading-wrapper.module.scss";
import clsx from "clsx";

interface LoadingWrapperProps {
  loading: boolean;
  className?: string;
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({
  loading,
  className,
  children,
}) => {
  return (
    <div className={clsx(cls.wrapper, className)}>
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className={cls.loadingWrapper}
          >
            <div className={cls.spinner}></div>
          </motion.div>
        ) : (
          children
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoadingWrapper;
