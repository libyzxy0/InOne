import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Chat from "@/pages/Chat";
import Signup from "@/pages/Signup";

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/new-account" element={<Signup />} />
      </Routes>
    </>
  );
}
