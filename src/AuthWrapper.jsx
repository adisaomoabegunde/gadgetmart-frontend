import { Outlet } from "react-router-dom";
import { AuthProvider } from "./User/AuthContext";

export default function AuthWrapper(){
            
    return <Outlet />;

    
}