import React, { TextareaHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import cls from "./AdminTextArea.module.scss";
import { motion, AnimatePresence } from "framer-motion";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  name: string;
}

const AdminTextArea: React.FC<Props> = ({
  label,
  className,
  required,
  register,
  error,
  ...rest
}) => {
  return (
    <div className={clsx(cls.textAreaWrapper, className)}>
      {label && (
        <label className={cls.label}>
          {label} {required ? <span className={cls.required}>*</span> : null}
        </label>
      )}

      <div className={cls.textAreaWrapper}>
        <textarea {...register} {...rest} className={cls.textArea} />
        <AnimatePresence>
          {error && (
            <motion.p
              className={cls.error}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminTextArea;
