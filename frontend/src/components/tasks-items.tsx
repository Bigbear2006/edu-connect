import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getCurrentCompletedTasks,
  getTasksCurrentCourse,
  postSolution,
  processingTask,
} from '../api/tasks';
import { getCurrentUser } from '../api/user';
import { Course } from '../types/course';

interface Task extends Course {
  course: number;
  is_right?: boolean;
}

interface CompletedTask {
  id: string;
  solution: string;
  completed_at: string;
  is_right: boolean | null;
  task: number; // ID задачи
  user: number; // ID пользователя
}

export const TasksItems = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>([]);
  const [isTextAreaVisible, setIsTextAreaVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [responseText, setResponseText] = useState('');
  const [role, setRole] = useState('');

  console.log(completedTasks);
  console.log(tasks);

  useEffect(() => {
    const fetchTasks = async () => {
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

    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        setRole(response.role);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
    fetchUser();
  }, [id]);

  // Функция для получения решенных задач по ID
  useEffect(() => {
    const fetchCompletedTasks = async () => {
      if (role === 'Учитель' && selectedTaskId) {
        try {
          const response = await getCurrentCompletedTasks(selectedTaskId); // Передаем ID задачи
          setCompletedTasks(response);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchCompletedTasks();
  }, [role, selectedTaskId]); // Зависимости: роль и выбранный ID задачи

  const handleTaskClick = (taskId: string) => {
    if (selectedTaskId !== taskId) {
      // Если нажали на другую задачу, показать текстовое поле
      setSelectedTaskId(taskId);
      setIsTextAreaVisible(true);
      setResponseText(''); // Сброс текста при выборе новой задачи
    }
  };

  const handleSubmitResponse = async () => {
    if (selectedTaskId && responseText) {
      try {
        await postSolution(responseText, selectedTaskId); // Используем selectedTaskId
        alert('Ответ отправлен!');
        setIsTextAreaVisible(false);
        setResponseText('');
      } catch (error) {
        console.log('Ошибка', error);
      }
    }
  };

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
              <div onClick={() => handleTaskClick(el.id)} key={el.id} className="courses__item">
                <img
                  src="https://blog.coursify.me/wp-content/uploads/2018/08/plan-your-online-course.jpg"
                  alt="course"
                  className="courses__item-img"
                />
                <div className="courses__item-content">
                  <div className="courses__item-title">{el.title}</div>
                  <div style={{ marginBottom: '20px' }} className="courses__item-desc">
                    {el.description}
                  </div>
                </div>

                {isTextAreaVisible && role === 'Студент' && selectedTaskId === el.id && (
                  <div className="response-area">
                    <textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      placeholder="Введите ваш ответ..."
                    />
                    <button onClick={handleSubmitResponse}>Отправить</button>
                  </div>
                )}

                {role === 'Студент' && (
                    <div className="completed-task">
                      <h4>Статус:</h4>
                      <button
                          className="job-card__apply-btn"
                          disabled={
                            completedTasks.some(
                                (completedTask) => completedTask.task === Number(el.id) && completedTask.is_right !== null
                            )
                          }
                      >
                        {completedTasks.some(
                            (completedTask) => completedTask.task === Number(el.id) && completedTask.is_right
                        )
                            ? 'Правильное'
                            : 'Не оценено'}
                      </button>
                    </div>
                )}


                {role === 'Учитель' &&
                    completedTasks.length > 0 &&
                  completedTasks.map(
                    (completedTask) =>
                      completedTask.task === Number(el.id) && (
                        <div key={completedTask.id} className="completed-task">
                          <h4>Решение:</h4>
                          <p>{completedTask.solution}</p>
                          <button
                            onClick={() => processingTask(completedTask.id, completedTask.id)}>
                            Принять
                          </button>
                        </div>
                      ),
                  )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
