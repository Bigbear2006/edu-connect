import { Route, Routes } from 'react-router-dom';
import { Some } from './pages';
import './sass/app.scss';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Some />} />
    </Routes>
  );
};
