import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AdminLogin } from "admin-bundle/features/AdminLogin";
import { verifyToken } from "entities/UserData";

interface AdminWrapperProps {
  children: React.ReactNode;
}

const AdminWrapper: React.FC<AdminWrapperProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token && verifyToken(token)) {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <>{children}</>;
};

export default AdminWrapper;
