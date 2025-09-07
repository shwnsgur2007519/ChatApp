import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

type RouteParams = { roomName?: string }; // ← 이름 변경

interface Message { message: string }

const ChatRoom: React.FC = () => {
  const { roomName } = useParams<RouteParams>(); // ← 제네릭으로 타입 지정
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!roomName) return;

    const wsScheme = location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(`${wsScheme}://${location.hostname}:8000/ws/chat/${roomName}/`);
    socketRef.current = ws;

    ws.onmessage = (e: MessageEvent) => {
      const data: Message = JSON.parse(e.data);
      setMessages(prev => [...prev, data.message]);
    };
    ws.onclose = () => console.error("WebSocket closed unexpectedly");

    return () => ws.close();
  }, [roomName]);

  const sendMessage = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ message: input }));
      setInput("");
    }
  };

  return (
    <div>
      <h2>Chat Room: {roomName ?? "(미지정)"} </h2>
      <div>{messages.map((m, i) => <p key={i}>{m}</p>)}</div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage} disabled={!roomName}>Send</button>
    </div>
  );
};

export default ChatRoom;
