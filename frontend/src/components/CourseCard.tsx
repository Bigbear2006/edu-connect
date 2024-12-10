import React from "react";
import '../sass/courseCard.scss';

interface CourseCardProps {
    imageUrl: string;
    title: string;
    description: string;
    duration: string;
    onEnrollClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ imageUrl, title, description, duration, onEnrollClick }) => {
    return (
        <div className="course-card">
            <div className="course-card-background" />
            <div className="course-card-content" style={{ backgroundImage: `url(${imageUrl})` }} >
                <h2 className="course-card-title">{title}</h2>
                <p className="course-card-description">{description}</p>
                <div className="course-card-duration">{duration}</div>
                <button className="enroll-button" onClick={onEnrollClick}>Записаться</button>
            </div>
        </div>
    );
};

export default CourseCard;
