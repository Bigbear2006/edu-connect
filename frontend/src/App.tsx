import { Navigate, Route, Routes } from 'react-router-dom';
import { Login, Register } from './pages';
import { Courses } from './pages/Courses';
import { ProtectedRoute } from './ProtectedRoutes';
import './sass/app.scss';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/login'} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
