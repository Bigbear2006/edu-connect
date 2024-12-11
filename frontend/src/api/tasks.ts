import { axiosInstance } from './instance';

export const getTasksCurrentCourse = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/courses/${id}/tasks`);
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};

export const postSolution = async (solution: string, id: string) => {
  try {
    const response = await axiosInstance.post(`/tasks/${id}/complete/`, { solution: solution });
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};

export const getCurrentCompletedTasks = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/tasks/${id}/completed/`);
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};

export const processingTask = async (id: string, solutionId: string) => {
  try {
    const response = await axiosInstance.post(`/tasks/${id}/evaluate/?solution_id=${solutionId}`, { is_right: true });
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};

export const createTask = async (title: string, description: string, course: string) => {
  const data = { title, description, course };

  try {
    const response = await axiosInstance.post('/tasks/', data);
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
    throw error;
  }
};
