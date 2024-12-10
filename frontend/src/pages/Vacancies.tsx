import React, {useState} from "react";
import '../sass/components/_vacancy.scss';
import VacancyCard from "../components/vacancy-card.tsx";
import {Header} from "../components";

const Vacancies: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    const handleApply = () => {
        alert("Отклик");
    };

    const handleAddVacancy = () => {
        alert('Вакансия добавлена');
        setIsModalOpen(false);
    };

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
                <VacancyCard
                        title="Frontend-разработчик"
                        description="Мы ищем frontend-разработчика"
                        location="Москва"
                        onApplyClick={handleApply}
                />
                <VacancyCard
                    title="Frontend-разработчик"
                    description="Мы ищем frontend-разработчика"
                    location="Москва"
                    onApplyClick={handleApply}
                />
                <VacancyCard
                    title="Frontend-разработчик"
                    description="Мы ищем frontend-разработчика"
                    location="Москва"
                    onApplyClick={handleApply}
                />
                </div>
            </div>
        </div>
    );
};

export default Vacancies;
