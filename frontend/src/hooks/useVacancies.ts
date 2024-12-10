import { useState, useEffect } from 'react';
import { getVacancies } from '../api/vacancy';
import { Vacancy } from '../types/vacancy';

export const useVacancies = () => {
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                setLoading(true);
                const vacanciesResponse = await getVacancies();
                setVacancies(vacanciesResponse);
            } catch (error) {
                setError('Не удалось загрузить вакансии');
            } finally {
                setLoading(false);
            }
        };

        fetchVacancies();
    }, []);

    return { vacancies, loading, error };
};