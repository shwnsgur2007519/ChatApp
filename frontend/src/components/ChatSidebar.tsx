import { useNavigate } from 'react-router-dom';

export default function ChatSidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const csrftoken = document.cookie.split('; ').find(row => row.startsWith('csrftoken='));
    const res = await fetch("http://localhost:8000/users/logout/", {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRFToken": csrftoken ? csrftoken.split('=')[1] : "",
        "Content-Type": "application/json",
      }
    });

    if (res.ok) {
      navigate("/login", { replace: true });
    } else {
      alert("로그아웃에 실패했습니다.");
    }
  };

  const users = ["유저1", "유저2", "유저3"];

  return (
    <div className="chat-sidebar">
      <button className="btn btn-outline-danger w-100 mb-3" onClick={handleLogout}>
        로그아웃
      </button>

      <input className="form-control mb-3" placeholder="사용자 검색" />

      <ul className="list-group">
        {users.map((user, index) => (
          <li key={index} className="list-group-item">
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
}
