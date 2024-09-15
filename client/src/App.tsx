import {
  Suspense,
  lazy
} from 'react'
import {
  Routes,
  Route
} from "react-router-dom";
import {
  Toaster
} from "@/components/ui/sonner";
import {
  AuthProvider
} from "@/context/AuthContext";
import PrivateRoutes from "@/routes/private-routes";

const Login = lazy(() => import("@/pages/Login"))
const Chat = lazy(() => import("@/pages/Chat"))
const Signup = lazy(() => import("@/pages/Signup"))

export default function App() {
  return (
    <>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/new-account" element={<Signup />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Routes>
        </Suspense>
        <Toaster />
      </AuthProvider>
    </>
  );
}