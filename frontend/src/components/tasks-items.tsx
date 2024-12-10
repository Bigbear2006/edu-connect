import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTasksCurrentCourse } from '../api/tasks';
import { Course } from '../types/course';

interface Task extends Course {
  course: number;
}

export const TasksItems = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (id) {
        try {
          const response = await getTasksCurrentCourse(id);
          setTasks(response);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.error('ID is undefined');
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <div
        onClick={() => navigate('/courses')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'grey',
          cursor: 'pointer',
          fontSize: '1.2rem',
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="grey"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-undo-2">
          <path d="M9 14 4 9l5-5" />
          <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
        </svg>
        Назад
      </div>
      {tasks.length === 0 ? (
        <div style={{ textAlign: 'center', fontSize: '2rem', color: 'grey' }}>
          К сожалению задач нет...
        </div>
      ) : (
        <>
          <div className="courses__title">Задачи</div>

          <div className="courses__items tasks__items">
            {tasks.map((el: Task) => (
              <div key={el.id} className="courses__item">
                <img
                  src="https://blog.coursify.me/wp-content/uploads/2018/08/plan-your-online-course.jpg"
                  alt="course"
                  className="courses__item-img"
                />
                <div className="courses__item-content">
                  {' '}
                  <div className="courses__item-title">{el.title}</div>
                  <div style={{ marginBottom: '20px' }} className="courses__item-desc">
                    {el.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
