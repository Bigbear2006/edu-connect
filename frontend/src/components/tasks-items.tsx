import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createTask,
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
  task: number;
  user: number;
}

export const TasksItems = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>([]);
  const [isTextAreaVisible, setIsTextAreaVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [responseText, setResponseText] = useState('');
  const [role, setRole] = useState('');

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

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      if (role === 'Учитель' && selectedTaskId) {
        try {
          const response = await getCurrentCompletedTasks(selectedTaskId);
          setCompletedTasks(response);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchCompletedTasks();
  }, [role, selectedTaskId]);

  const handleTaskClick = (taskId: string) => {
    if (selectedTaskId !== taskId) {
      setSelectedTaskId(taskId);
      setIsTextAreaVisible(true);
      setResponseText('');
    }
  };

  const handleAddTask = async () => {
    try {
      if (!id) {
        console.log('ID курса не найден');
        return;
      }
      const taskId = await createTask(title, description, id);
      console.log('Задача добавлена с id:', taskId);
      setIsModalOpen(false);
    } catch (error) {
      console.log('Ошибка при добавлении задачи', error);
    }
  };

  const handleSubmitResponse = async () => {
    if (selectedTaskId && responseText) {
      try {
        await postSolution(responseText, selectedTaskId);
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

            <button className="vacancies-page__add-btn" onClick={() => setIsModalOpen(true)}>
              Добавить задачу
            </button>

            {isModalOpen && (
                <div className="vacancies-page__modal">
                  <div className="vacancies-page__modal-content">
                    <button type="button" onClick={() => setIsModalOpen(false)}>
                      &times;
                    </button>
                    <h2>Добавить задачу</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <label>
                        Название задачи:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                      </label>
                      <label>
                        Описание задачи:
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                      </label>
                      <div className="vacancies-page__modal-actions">
                        <button type="submit" onClick={handleAddTask}>
                          Добавить
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
            )}

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
                      <div style={{marginBottom: '20px'}} className="courses__item-desc">
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
                          <div className="job-card__apply-btn">
                      <span
                          style={{
                            color: el.is_right === true ? 'green' : 'grey',
                          }}>
                        {el.is_right === true ? 'Правильное' : 'Не оценено'}
                      </span>
                          </div>
                        </div>
                    )}

                    {role === 'Учитель' &&
                        completedTasks.length > 0 &&
                        completedTasks.map(
                            (completedTask) =>
                                completedTask.task === Number(el.id) && (
                                    <div key={completedTask.id} className="completed-task">
                                      <div className="completed-task-solition">{completedTask.solution}</div>
                                      <div className="completed-task-button">
                                        <button
                                            onClick={() => processingTask(completedTask.id, completedTask.id)}>
                                          Принять
                                        </button>
                                      </div>
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
