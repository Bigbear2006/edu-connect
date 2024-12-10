import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses } from '../api/courses';
import { Course } from '../types/course';

export const CoursesItems = () => {
  const [courses, setCourses] = useState([]);

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
    fetchCourses();
  }, []);
  return (
    <section className="courses">
      <div className="container">
        <div className="courses__title">Курсы</div>
        <div className="courses__items">
          {courses.map((el: Course) => (
            <div key={el.id} className="courses__item">
              <img
                src="https://blog.coursify.me/wp-content/uploads/2018/08/plan-your-online-course.jpg"
                alt="course"
                className="courses__item-img"
              />
              <div className="courses__item-content">
                {' '}
                <div className="courses__item-title">{el.title}</div>
                <div className="courses__item-desc">{el.description}</div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    onClick={() => navigate(`/tasks/${el.id}`)}
                    className="courses__item-button">
                    Перейти
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
