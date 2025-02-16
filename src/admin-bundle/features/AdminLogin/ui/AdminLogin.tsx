import React from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AdminLoginRecord,
  adminLoginSchema,
} from "admin-bundle/features/AdminLogin";
import { AdminButton, AdminBackButton } from "admin-bundle/shared/ui";

import { handleLogin } from "entities/UserData";
import { logo } from "shared/assets";

import cls from "./AdminLogin.module.scss";

const AdminLogin: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginRecord>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (data: AdminLoginRecord) => {
    try {
      const response = await handleLogin(data.username, data.password);
      if (response.success) {
        toast.success("Login successful");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className={cls.adminLoginWrapper}>
      <a href="https://viscomplast.vercel.app/">
        <AdminBackButton className={cls.backArrow} />
      </a>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className={cls.content}
      >
        <p className={cls.title}>
          Login to Admin’s
          <br />
          <b>Dashboard</b>
        </p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={cls.modalWrapper}
        >
          <img src={logo} alt="" />
          <form onSubmit={handleSubmit(onSubmit)} className={cls.formWrapper}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className={cls.inputWrapper}
            >
              <input {...register("username")} placeholder={"Username"} />
              <AnimatePresence>
                {errors.username && (
                  <motion.p
                    className={cls.error}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.username.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className={cls.inputWrapper}
            >
              <input
                type="password"
                {...register("password")}
                placeholder={"Password"}
              />
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    className={cls.error}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            <AdminButton
              type="submit"
              className={cls.submitButton}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              Login
            </AdminButton>
          </form>
        </motion.div>
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
      </motion.div>
    </div>
  );
};

export default AdminLogin;
