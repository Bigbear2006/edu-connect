import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCourses, createCourse } from '../api/courses';
import { Course } from '../types/course';
import { getCurrentUser } from "../api/user";

export const CoursesItems = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [role, setRole] = useState<string>('');
  const [, setLoadingRole] = useState(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = await getCurrentUser();
        console.log('Полученная роль:', user.role);
        setRole(user.role);
      } catch (error) {
        console.log('Ошибка при получении пользователя', error);
      } finally {
        setLoadingRole(false);
      }
    };

    fetchUserRole();
  }, []);

  const handleAddCourse = async () => {
    try {
      await createCourse(title, description);
      setIsModalOpen(false);
    } catch (error) {
      console.log('Ошибка при добавлении курса', error);
    }
  };

  return (
      <section className="courses">
        <div className="container">
          <div className="courses__title">Курсы</div>
          {(role === 'Админ' || role === 'Учитель') && (
              <button className="courses__button" onClick={() => setIsModalOpen(true)}>
                Добавить курс
              </button>
          )}

          {isModalOpen && (
              <div className="vacancies-page__modal">
                <div className="vacancies-page__modal-content">
                  <button type="button" onClick={() => setIsModalOpen(false)}>
                    &times;
                  </button>
                  <h2>Добавить курс</h2>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                      Название курса:
                      <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                      />
                    </label>
                    <label>
                      Описание курса:
                      <input
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                      />
                    </label>
                    <div className="vacancies-page__modal-actions">
                      <button type="submit" onClick={handleAddCourse}>
                        Добавить
                      </button>
                    </div>
                  </form>
                </div>
              </div>
          )}

          <div className="courses__items">
            {courses.map((el: Course) => (
                <div onClick={() => navigate(`/tasks/${el.id}`)} key={el.id} className="courses__item">
                  <img
                      src="https://blog.coursify.me/wp-content/uploads/2018/08/plan-your-online-course.jpg"
                      alt="course"
                      className="courses__item-img"
                  />
                  <div className="courses__item-content">
                    <div className="courses__item-title">{el.title}</div>
                    <div className="courses__item-desc">{el.description}</div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
};