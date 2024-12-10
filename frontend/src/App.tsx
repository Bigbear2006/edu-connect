import { Navigate, Route, Routes } from 'react-router-dom';
import { Login, Register } from './pages';
import './sass/app.scss';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/login'} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};
