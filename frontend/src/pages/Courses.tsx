import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getCourses } from '../api/courses';

export const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);
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
            </ul>
          </nav>
          <button className="header__button">
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
      <section className="courses">
        <div className="container">
          <div className="courses__title"></div>
          <div className="courses__items">
            {courses.map((el) => (
              <div className="courses__item">
								<img src="https://blog.coursify.me/wp-content/uploads/2018/08/plan-your-online-course.jpg" alt="" />
                <div>{el.title}</div>
                <span>{el.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
