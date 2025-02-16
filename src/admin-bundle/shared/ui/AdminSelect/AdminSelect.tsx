import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

import { ArrowUpDownIcon } from "admin-bundle/shared/assets";
import { Option } from "admin-bundle/shared/types";

import cls from "./AdminSelect.module.scss";

interface Props {
  placeholder: string;
  className?: string;
  listClassName?: string;
  options: Option[];
  onChange?: (selected: Option) => void;
  defaultValue?: string;
  isSearch?: boolean;
}

const AdminSelect: React.FC<Props> = ({
  placeholder,
  className,
  listClassName,
  options,
  onChange,
  defaultValue,
  isSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [searchTerm, setSearchTerm] = useState(
    selectedOption ? selectedOption.label : "",
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setSearchTerm(option.label);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  const filteredOptions = isSearch
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : options;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  useEffect(() => {
    if (defaultValue) {
      const defaultOption =
        options.find((option) => option.value === defaultValue) || null;
      setSelectedOption(defaultOption);
      setSearchTerm(defaultOption?.label || "");
    }
  }, [defaultValue, options]);

  return (
    <div className={cls.dropdown} ref={dropdownRef}>
      <div
        className={clsx(cls.dropdownHeader, className)}
        onClick={toggleDropdown}
      >
        {isSearch ? (
          <input
            type="text"
            className={cls.searchInput}
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
          />
        ) : (
          <>{selectedOption ? selectedOption.label : placeholder}</>
        )}

        <motion.span
          className={cls.arrow}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpDownIcon />
        </motion.span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={clsx(cls.dropdownList, listClassName)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {filteredOptions.map((option) => (
              <motion.div
                key={option.value}
                className={cls.dropdownItem}
                onClick={() => handleOptionClick(option)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {option.label}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSelect;
