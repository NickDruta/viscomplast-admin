import React, { InputHTMLAttributes, useRef } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import cls from "./AdminInput.module.scss";
import { AdminAddButton } from "admin-bundle/shared/ui";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  withPlus?: boolean;
  onPlusClick?: (value: string) => void;
}

const AdminInput: React.FC<Props> = ({
  label,
  className,
  required,
  register,
  error,
  withPlus,
  onPlusClick,
  ...rest
}) => {
  const localInputRef = useRef<HTMLInputElement | null>(null);

  const setRefs = (element: HTMLInputElement | null) => {
    localInputRef.current = element;
    if (register && register.ref) {
      if (typeof register.ref === "function") {
        register.ref(element);
      } else {
        (
          register.ref as React.MutableRefObject<HTMLInputElement | null>
        ).current = element;
      }
    }
  };

  const handlePlusClick = () => {
    if (onPlusClick && localInputRef.current) {
      onPlusClick(localInputRef.current.value);
      localInputRef.current.value = "";
    }
  };

  return (
    <div className={clsx(cls.adminInputWrapper, className)}>
      {label && (
        <label className={cls.label}>
          {label} {required ? <span>*</span> : null}
        </label>
      )}

      <div className={cls.inputWrapper}>
        <input
          {...rest}
          {...(register || {})}
          ref={setRefs}
          className={cls.input}
        />
        {withPlus ? (
          <AdminAddButton className={cls.plus} onClick={handlePlusClick} />
        ) : null}
        <AnimatePresence>
          {error ? (
            <motion.p
              className={cls.error}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error.message}
            </motion.p>
          ) : (
            <div style={{ height: 18 }} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminInput;
