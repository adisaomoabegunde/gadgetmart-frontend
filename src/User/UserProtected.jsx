import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function UserProtectedRoute() {
//   const user = localStorage.getItem("userr");
const {user} = useAuth();
  if(user === undefined) return null;

  if (!user) {
    return <Navigate to="/user/login" replace />;
  }

  return <Outlet />;
}