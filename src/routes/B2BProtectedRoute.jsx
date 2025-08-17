import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export const B2BProtectedRoute = () => {
  const { isLoggedIn, role } = useAuthStore();

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (role !== "owner") return <Navigate to="/home/user" replace />;

  return <Outlet />;
};
