import React from 'react';
import { createRespond } from '../api/vacancy';
import '../sass/components/_vacancy-card.scss';

interface IJobCardProps {
    id: number;
    title: string;
    description: string;
    hasApplied: boolean;
}

const VacancyCard: React.FC<IJobCardProps> = ({ id, title, description, hasApplied }) => {
    const createResponsVacancy = async () => {
        try {
            const response = await createRespond(id);
            if (response?.success) {
                alert('Вы откликнулись на вакансию. Ждите ответ от работодателя!');
            } else {
                alert('Что-то пошло не так, пожалуйста, попробуйте позже.');
            }
        } catch (error) {
            console.error('Ошибка при отклике на вакансию:', error);
            alert('Произошла ошибка. Попробуйте снова!');
        }
    };

    return (
        <div className="job-card">
            <div className="job-card__content">
                <h2 className="job-card__title">{title}</h2>
                <p className="job-card__description">{description}</p>
                {hasApplied && <span className="applied-indicator">✔️</span>}
            </div>
            <button
                onClick={createResponsVacancy}
                className="job-card__apply-btn"
                disabled={hasApplied}
            >
                {hasApplied ? 'Вы откликнулись' : 'Откликнуться'}
            </button>
        </div>
    );
};

export default VacancyCard;