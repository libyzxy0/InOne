import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/context/AuthContext";
import PrivateRoutes from '@/routes/private-routes'
import Home from "@/pages/Home";
import Chat from "@/pages/Chat";
import Signup from "@/pages/Signup";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/new-account" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
        <Toaster />
      </AuthProvider>
    </>
  );
}
