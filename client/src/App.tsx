import {
  Suspense,
  lazy
} from "react";
import {
  Routes,
  Route, 
  useLocation
} from "react-router-dom";
import {
  Toaster
} from "@/components/ui/sonner";
import {
  AuthProvider
} from "@/context/AuthContext";
import PrivateRoutes from "@/routes/private-routes";
import {
  ThemeProvider
} from "@/components/theme-provider"
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react'

const Login = lazy(() => import("@/pages/Login"));
const Chat = lazy(() => import("@/pages/Chat"));
const Signup = lazy(() => import("@/pages/Signup"));
const NewThread = lazy(() => import("@/pages/CreateThread"));

export default function App() {
  const [isFirstMount, setIsFirstMount] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (isFirstMount) {
      setIsFirstMount(false);
    }
  }, [isFirstMount]);

  return (
    <>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Suspense>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route
                  index
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Login />
                    </motion.div>
                  }
                />
                <Route
                  path="/new-account"
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Signup />
                    </motion.div>
                  }
                />
                <Route element={<PrivateRoutes />}>
                  <Route
                    path="/chat"
                    element={
                      <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Chat />
                      </motion.div>
                    }
                  />
                  <Route
                    path="/new-thread"
                    element={
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <NewThread />
                      </motion.div>
                    }
                  />
                </Route>
              </Routes>
            </AnimatePresence>
          </Suspense>
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
