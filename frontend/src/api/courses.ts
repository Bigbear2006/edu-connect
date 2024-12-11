import { axiosInstance } from './instance';

export const getCourses = async () => {
  try {
    const response = await axiosInstance.get('/courses/');
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};

export const createCourse = async (title: string, description: string) => {
  const data = { title, description };

  try {
    const response = await axiosInstance.post('/courses/', data);
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};