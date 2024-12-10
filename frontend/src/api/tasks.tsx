import { axiosInstance } from './instance';

export const getTasksCurrentCourse = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/courses/${id}/tasks`);
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};
