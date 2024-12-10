import React from "react";
import '../sass/vacancyCard.scss';

interface IJobCardProps {
    title: string;
    description: string;
    location: string;
    onApplyClick: () => void;
}

const VacancyCard: React.FC<IJobCardProps> = ({ title, description, location, onApplyClick }) => {
    return (
        <div className="job-card">
            <div className="job-card__content">
                <h2 className="job-card__title">{title}</h2>
                <p className="job-card__description">{description}</p>
                <p className="job-card__location">{location}</p>
            </div>
            <button className="job-card__apply-btn" onClick={onApplyClick}>
                Откликнуться
            </button>
        </div>
    );
};

export default VacancyCard;