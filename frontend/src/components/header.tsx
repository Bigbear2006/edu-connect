import { NavLink, useNavigate } from 'react-router-dom';

export const Header = () => {
	const navigate = useNavigate()
  return (
    <div className="wrapper">
      <header className="header">
        <div className="container">
          <div className="header__logo">
            <NavLink to={'/courses'}>EduConnect</NavLink>
          </div>
          <nav className="header__nav">
            <ul>
              <li>
                <NavLink to={'/courses'} className={({ isActive }) => (isActive ? 'active' : '')}>
                  Курсы
                </NavLink>
              </li>
              <li>
                <NavLink to={'/vacancies'} className={({ isActive }) => (isActive ? 'active' : '')}>
                  Вакансии
                </NavLink>
              </li>
              <li>
                <NavLink to={'/forum'} className={({ isActive }) => (isActive ? 'active' : '')}>
                  Форум
                </NavLink>
              </li>
              <li>
                <NavLink to={'/webinar'} className={({ isActive }) => (isActive ? 'active' : '')}>
                  Вебинары
                </NavLink>
              </li>

            </ul>
          </nav>
          <button onClick={() => navigate('/profile')} className="header__button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-user">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Профиль
          </button>
        </div>
      </header>
    </div>
  );
};
