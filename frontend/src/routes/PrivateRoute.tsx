import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null: 로딩 중

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("http://localhost:8000/users/me/", {
          credentials: "include",
        });
        setIsAuthenticated(res.ok);
      } catch {
        setIsAuthenticated(false); // 네트워크 에러 등
      }
    };

    checkUser();
  }, []);

  // 아직 확인 중이면 아무것도 렌더링하지 않음 or 로딩 중 UI
  if (isAuthenticated === null) {
    return <div>로딩 중...</div>; // 또는 <Spinner /> 등
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
