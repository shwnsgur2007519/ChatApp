// ChatPage.tsx
import ChatSidebar from '../components/ChatSidebar';
import ChatWindow from '../components/ChatWindow';
import './ChatPage.css'; // 스타일은 외부 파일로 분리

export default function ChatPage() {
  return (
    <div className="chat-page">
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
}
