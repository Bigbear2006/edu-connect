import { Route, Routes } from 'react-router-dom';
import { Some } from './pages';
import './sass/app.scss';
import Profile from "./pages/Profile.tsx";
import Vacancies from "./pages/Vacancies.tsx";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Some />} />
      <Route path="/profile" element={<Profile
          name="Иван Иванов"
          username="ivan_ivanov"
          email="ivan@example.com"
          avatarUrl="https://via.placeholder.com/150"
          />}/>
      <Route path="/vacancies" element={<Vacancies />}
      />
    </Routes>
  );
};
