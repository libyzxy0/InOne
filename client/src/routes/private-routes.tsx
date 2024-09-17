import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoadingScreen } from "@/components/LoadingScreen";
import { motion } from "framer-motion";

const PrivateRoutes = () => {
  const { user, loading } = useAuth();

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5 }
  };

  if (loading) {
    return (
      <motion.div
        initial={fadeIn.initial}
        animate={fadeIn.animate}
        exit={fadeIn.exit}
        transition={fadeIn.transition}
      >
        <LoadingScreen />
      </motion.div>
    );
  }

  return user ? <Outlet /> : <Navigate to={`/`} />;
};

export default PrivateRoutes;
