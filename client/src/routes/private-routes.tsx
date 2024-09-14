import {
  Outlet,
  Navigate,
} from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoaderCircle } from "lucide-react";

const PrivateRoutes = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-[85vh] w-full flex justify-center items-center">
        <LoaderCircle className="text-gray-800 animate-spin" size={35} />
      </div>
    );
  }
  return user ? <Outlet /> : <Navigate to={`/`} />;
};

export default PrivateRoutes;