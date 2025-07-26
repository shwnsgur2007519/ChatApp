import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate} from 'react-router-dom';

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}


function LoginPage() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch("http://localhost:8000/users/me/", {
        credentials: "include",
      });
      setIsAuthenticated(res.ok);
    };
    checkUser();
  }, []);
  if(isAuthenticated) {
    const from = location.state?.from?.pathname || '/chat';
    return <Navigate to={from} replace />;
  }

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:8000/users/csrf/", {
      credentials: "include",
    });
    const csrftoken = getCookie('csrftoken');
    const res = await fetch("http://localhost:8000/users/login/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken || "",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    // console.log(data);

    if (res.ok) {
      navigate(from, { replace: true });
    } else {
      alert(data.error || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-3">로그인</h2>
      <form onSubmit={handleLogin}>
      <input
        className="form-control mb-2"
        placeholder="사용자 이름"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-2"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary w-100" type="submit">
        로그인
      </button>
      </form>
    </div>
  );
}

export default LoginPage;
