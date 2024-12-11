import React, { useState } from 'react';
import { Header } from '../components';
import VacancyCard from '../components/vacancy-card.tsx';
import { useVacancies } from '../hooks/useVacancies';
import { useRespondes } from '../hooks/useRespondes';
import { createVacancy } from '../api/vacancy';
import '../sass/components/_vacancy.scss';

const Vacancies: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const { vacancies, loading: vacanciesLoading, error: vacanciesError } = useVacancies();
  const { respondes, loading: respondesLoading, error: respondesError } = useRespondes();

  const handleAddVacancy = async () => {
    try {
      await createVacancy(title, description, 1);
      setIsModalOpen(false);
    } catch (error) {
      console.log('Ошибка при добавлении вакансии', error);
    }
  };

  if (vacanciesLoading || respondesLoading) return <div>Загрузка...</div>;
  if (vacanciesError || respondesError) return <div>{vacanciesError || respondesError}</div>;

  return (
      <div>
        <Header />
        <div className="vacancies-page">
          <h1 className="vacancies-page__title">Вакансии</h1>
          <button className="vacancies-page__add-btn" onClick={() => setIsModalOpen(true)}>
            Добавить вакансию
          </button>

          {isModalOpen && (
              <div className="vacancies-page__modal">
                <div className="vacancies-page__modal-content">
                  <button type="button" onClick={() => setIsModalOpen(false)}>
                    &times;
                  </button>
                  <h2>Добавить вакансию</h2>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                      Название вакансии:
                      <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                      />
                    </label>
                    <label>
                      Описание вакансии:
                      <input
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                      />
                    </label>
                    <label>
                      Локация:
                      <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                      />
                    </label>
                    <div className="vacancies-page__modal-actions">
                      <button type="submit" onClick={handleAddVacancy}>
                        Добавить
                      </button>
                    </div>
                  </form>
                </div>
              </div>
          )}

          <div className="vacancies-page__list">
            {vacancies.map((vacancy) => {
              const hasApplied = respondes.some((response) => response.job.id === vacancy.id);

              return (
                  <VacancyCard
                      key={vacancy.id}
                      title={vacancy.title}
                      id={vacancy.id}
                      description={vacancy.description}
                      hasApplied={hasApplied}
                  />
              );
            })}
          </div>
        </div>
      </div>
  );
};

export default Vacancies;