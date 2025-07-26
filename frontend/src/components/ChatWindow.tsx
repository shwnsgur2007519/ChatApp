export default function ChatWindow() {
  return (
    <div className="chat-window">
      <h4>유저2</h4>
      <div style={{ flex: 1, overflowY: "auto", marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
        <p><strong>유저2:</strong> 안녕하세요!</p>
        <p><strong>나:</strong> 반갑습니다.</p>
      </div>
      <div className="input-group">
        <input type="text" className="form-control" placeholder="메시지를 입력하세요" />
        <button className="btn btn-primary">전송</button>
      </div>
    </div>
  );
}

