import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses } from '../api/courses';
import { getCurrentUser } from '../api/user';
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
                width="54"
                height="54"
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
              <p>Role: {user?.role}</p>
              <p>Email: {user?.email}</p>
            </div>
            <button onClick={logout} className="profile-button">Выйти</button>
          </div>
        </div>
        <div className="profile-content__courses">
          <h1>Пройденные курсы</h1>
          {courses.map((el: Course) => (
            <CourseCard id={el.id} title={el.title} description={el.description} />
          ))}
        </div>
      </div>
    </div>
  );
};
