import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  role: string;
  rightCount: string;
  tasksCount: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  role,
  rightCount,
  tasksCount,
}) => {
  const navigate = useNavigate();

  return (
    <div key={id} onClick={() => navigate(`/tasks/${id}`)} className="course-card">
      <div className="course-card-background" />
      <div
        className="course-card-content"
        style={{
          backgroundImage: `url(https://blog.coursify.me/wp-content/uploads/2018/08/plan-your-online-course.jpg)`,
        }}>
        <h2 className="course-card-title">{title}</h2>
        <p className="course-card-description">{description}</p>
        {role === 'Студент' && (
          <div style={{color: '#eeeeee'}}>
            <div>Все задачи: {tasksCount}</div>
            <div>Решенные задачи: {rightCount}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
