import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses } from '../api/courses';
import { getCurrentUser } from '../api/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { Header } from '../components';
import CourseCard from '../components/course-card';
import { Course } from '../types/course';
import { User } from '../types/user';

export const Profile = () => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState<User>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCurrentUser = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
    fetchCurrentUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <Header />
      <div className="profile-info">
        <div className="profile-content">
          <div className="avatar-container">
            <div className="avatar">
              {' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#333333"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            <h1>{user?.username}</h1>
          </div>

          <div className="profile-details">
            <div className="profile-contact">
              <p>Роль: {user?.role}</p>
              <p>Почта: {user?.email}</p>
            </div>
            <div className="profile-buttons-container">
              <button className="profile-button-change-role">
                <FontAwesomeIcon icon={faCrown} style={{marginRight: "8px"}}/>
                Стать админом
              </button>
              <button className="profile-button-change-role">
                <FontAwesomeIcon icon={faUserGraduate} style={{marginRight: "8px"}}/>
                Стать преподавателем
              </button>
            </div>
            <button onClick={logout} className="profile-button">Выйти</button>
          </div>
        </div>
        <div className="profile-content__courses">
          <h1>Пройденные курсы</h1>
          {courses.map((el: Course) => (
              <CourseCard id={el.id} title={el.title} description={el.description}/>
          ))}
        </div>
      </div>
    </div>
  );
};
