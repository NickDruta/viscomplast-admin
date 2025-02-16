import { useCallback } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useRouter } from "@tanstack/react-router";

import { AdminBackButton } from "admin-bundle/shared/ui";

import { logo, menuGridsIcon } from "shared/assets";

import cls from "./AdminNavBar.module.scss";

const AdminNavBar = () => {
  const router = useRouter();

  const navigateToOption = useCallback((option: string) => {
    const pathMap: Record<string, string> = {
      Parteneri: "/",
      Pagini: "/pages",
      Manere: "/handles",
      Export: "/export",
    };
    const path = pathMap[option] || "/";
    router.navigate({ to: path });
  }, []);

  const options = [
    { name: "Parteneri", icon: menuGridsIcon, link: "/" },
    { name: "Pagini", icon: menuGridsIcon, link: "/pages" },
    { name: "Manere", icon: menuGridsIcon, link: "/handles" },
    { name: "Export", icon: menuGridsIcon, link: "/export" },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className={cls.adminNavBarWrapper}>
      <AdminBackButton onClick={() => console.log("Back")} />
      <motion.img
        src={logo}
        alt=""
        className={cls.logo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <div className={cls.optionsWrapper}>
        {options.map((option, index) => (
          <motion.div
            key={option.name}
            custom={index}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variants={itemVariants}
            className={clsx(cls.optionWrapper, {
              [cls.activeOption]: location.pathname === option.link,
            })}
            onClick={() => navigateToOption(option.name)}
          >
            <img src={option.icon} alt="" />
            <p>{option.name}</p>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className={cls.info}
      >
        Dashboard v1.0
        <br />
        Made by IT_FACTORY
      </motion.p>
    </div>
  );
};

export default AdminNavBar;
