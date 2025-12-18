import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireAuth(){
    const {user} = useAuth();
    const location = useLocation();

    if(!user){
        return <Navigate to ="/user/login" state={{from: location}} replace />;
    }
    return <Outlet />;
}