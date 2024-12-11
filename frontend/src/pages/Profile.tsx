import { faCrown, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBids } from '../api/admin';
import { getCourses } from '../api/courses';
import { changeRole, getCurrentUser, getPortfolio } from '../api/user';
import { currentApplication } from '../api/vacancy';
import { BidRole, Header } from '../components';
import CourseCard from '../components/course-card';
import { formatDate } from '../lib';
import { Bid } from '../types/bid';
import { Course } from '../types/course';
import { User } from '../types/user';

export const Profile = () => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState<User>();
  const [applications, setApplications] = useState([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [portfolio, setPortfolio] = useState([]);

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

    const fetchCurrentApplication = async () => {
      try {
        const response = await currentApplication('2');
        setApplications(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrentUser();

    if (user?.role !== 'Админ') {
      fetchCurrentApplication();
      fetchCourses();
    }
  }, []);

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (user?.id) {
        try {
          const response = await getPortfolio(user.id);
          setPortfolio(response);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchPortfolio();
  }, [user]);

  useEffect(() => {
    if (user?.role === 'Админ') {
      const fetchChangeBids = async () => {
        try {
          const response = await getBids();
          setBids(response);
        } catch (error) {
          console.log(error);
        }
      };
      fetchChangeBids();
    }
  }, [user]);

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
            {user?.role !== 'Админ' && (
              <div className="profile-buttons-container">
                {user?.role !== 'Работодатель' && (
                  <button
                    onClick={() => changeRole('Работодатель')}
                    className="profile-button-change-role">
                    <FontAwesomeIcon icon={faCrown} style={{ marginRight: '8px' }} />
                    Стать работодателем
                  </button>
                )}

                {user?.role !== 'Учитель' && (
                  <button
                    onClick={() => changeRole('Учитель')}
                    className="profile-button-change-role">
                    <FontAwesomeIcon icon={faUserGraduate} style={{ marginRight: '8px' }} />
                    Стать преподавателем
                  </button>
                )}
              </div>
            )}

            <button onClick={logout} className="profile-button">
              Выйти
            </button>
          </div>
        </div>
        {user?.role === 'Учитель' && (
          <div className="profile-content__courses">
            <h1>Курсы</h1>
            {courses.map((el: Course) => (
              <CourseCard
                role={user.role}
                tasksCount={el.tasks_count}
                rightCount={el.right_count}
                id={el.id}
                title={el.title}
                description={el.description}
              />
            ))}
          </div>
        )}
        {user?.role === 'Студент' && (
          <div className="profile-content__courses">
            <h1>Курсы</h1>
            {portfolio.map((el: Course) => (
              <CourseCard
                id={el.id}
                role={user.role}
                tasksCount={el.tasks_count}
                rightCount={el.right_count}
                title={el.title}
                description={el.description}
              />
            ))}
          </div>
        )}
        {user?.role === 'Работодатель' && (
          <div className="profile-content__courses">
            <div className="reflections">
              {applications.map((el: Bid) => (
                <div className="reflection" key={el.id}>
                  {' '}
                  <div className="reflection__username">{el.user.username}</div>
                  <div className="reflection__job">{el.job}</div>
                  <div className="reflection__date">{formatDate(el.created_at)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {user?.role === 'Админ' && <BidRole bids={bids} setBids={setBids} />}
      </div>
    </div>
  );
};
