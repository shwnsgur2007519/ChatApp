// App.tsx (예시)
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatRoom from "./pages/ChatRoom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat/:roomName" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}
