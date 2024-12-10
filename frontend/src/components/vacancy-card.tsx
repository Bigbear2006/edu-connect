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
    const response = await createRespond(id);
    if (response) {
      alert('Вы откликнулись на вакансию. Ждите ответ от работодателя)');
    }
  };

  return (
    <div className="job-card">
      <div className="job-card__content">
        <h2 className="job-card__title">{title}</h2>
        <p className="job-card__description">{description}</p>
      </div>
      {hasApplied && <span className="applied-indicator">✔️</span>}
      <button onClick={createResponsVacancy} className="job-card__apply-btn">
        Откликнуться
      </button>
    </div>
  );
};

export default VacancyCard;
