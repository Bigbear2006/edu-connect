import { Navigate, Route, Routes } from 'react-router-dom';
import { Login, Profile, Register, Tasks, Courses, Forum } from './pages';
import { ProtectedRoute } from './ProtectedRoutes';
import './sass/app.scss';
import Vacancies from "./pages/Vacancies.tsx";
import {ForumPage} from "./pages/ForumPage.tsx";

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
      <Route
        path="/vacancies"
        element={
          <ProtectedRoute>
            <Vacancies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks/:id"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/forum"
        element={
          <ProtectedRoute>
            <Forum />
          </ProtectedRoute>
        }
      />
      <Route
        path="/forum/:id"
        element={
          <ProtectedRoute>
            <ForumPage />
          </ProtectedRoute>
          }
      />
    </Routes>
  );
};
