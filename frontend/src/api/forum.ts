import { axiosInstance } from './instance';

export const getForums = async () => {
    try {
        const response = await axiosInstance.get('/forums');
        return response.data;
    } catch (error) {
        console.log('Ошибка', error);
    }
};

export const getForumById = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/forums/${id}`);
        return response.data;
    } catch (error) {
        console.log('Ошибка', error);
        throw error;
    }
};

export const getComments = async () => {
    try {
        const response = await axiosInstance.get(`/comments`);
        return response.data;
    } catch (error) {
        console.log('Ошибка при загрузке комментария', error);
        throw error;
    }
}

export const addComment = async (forum: number, text: string) => {
    try {
        const response = await axiosInstance.post(`/comments/`, {
            forum,
            text,
        });
        return response.data;
    } catch (error) {
        console.log('Ошибка при отправке комментария', error);
        throw error;
    }
};

export const createQuestion = async (title: string, description: string) => {
    const data = { title, description };

    try {
        const response = await axiosInstance.post('/forums/', data);
        return response.data;
    } catch (error) {
        console.log('Ошибка', error);
    }
};

