import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoadingScreen } from '@/components/LoadingScreen'

const PrivateRoutes = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <LoadingScreen />
  }
  return user ? <Outlet /> : <Navigate to={`/`} />;
};

export default PrivateRoutes;
