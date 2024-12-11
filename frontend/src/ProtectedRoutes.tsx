import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { refreshToken } from './api/auth-register';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('access');
      if (accessToken) {
        setIsAuthenticated(true);
      } else {
        const refreshTokenValue = localStorage.getItem('refresh');
        if (refreshTokenValue) {
          try {
            await refreshToken();
            setIsAuthenticated(true);
          } catch {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      }
    };

    checkAuth(); 
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />; 
  }

  return children; 
};
