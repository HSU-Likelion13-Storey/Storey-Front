import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

export const UserProtectedRoute = () => {
  const { isLoggedIn, role } = useAuthStore();

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (role !== "user") return <Navigate to="/home/owner" replace />;

  return <Outlet />;
};
