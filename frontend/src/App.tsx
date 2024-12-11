import { Navigate, Route, Routes } from 'react-router-dom';
import { Courses } from './pages/Courses.tsx';
import { Forum } from './pages/Forum.tsx';
import { ForumPage } from './pages/ForumPage.tsx';
import { Login } from './pages/Login.tsx';
import { Profile } from './pages/Profile.tsx';
import { Register } from './pages/Register.tsx';
import { Tasks } from './pages/Tasks.tsx';
import Vacancies from './pages/Vacancies.tsx';
import { Webinar } from './pages/Webinar.tsx';
import { ProtectedRoute } from './ProtectedRoutes';
import './sass/app.scss';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
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
        path="/webinar"
        element={
          <ProtectedRoute>
            <Webinar />
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
