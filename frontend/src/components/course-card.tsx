import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ id, title, description }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/tasks/${id}`)} className="course-card">
      <div className="course-card-background" />
      <div
        className="course-card-content"
        style={{
          backgroundImage: `url(https://blog.coursify.me/wp-content/uploads/2018/08/plan-your-online-course.jpg)`,
        }}>
        <h2 className="course-card-title">{title}</h2>
        <p className="course-card-description">{description}</p>
      </div>
    </div>
  );
};

export default CourseCard;
