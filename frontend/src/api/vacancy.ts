import { axiosInstance } from './instance';

export const getVacancy = async () => {
    try {
        const response = await axiosInstance.get('/jobs/');
        return response.data;
    } catch (error) {
        console.log('Ошибка', error);
    }
};
