import { axiosInstance } from './instance';

export const getVacancies = async () => {
  try {
    const response = await axiosInstance.get('/jobs/');
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};

export const createVacancy = async (title: string, description: string, company: number) => {
  const data = { title, description, company };

  try {
    const response = await axiosInstance.post('/jobs/', data);
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};

export const createRespond = async (id: number) => {
  try {
    const response = await axiosInstance.post('/jobs-applications/', { job: id });
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};

export const getRespondes = async () => {
  try {
    const response = await axiosInstance.get('/auth/user/jobs-applications/');
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};

export const currentApplication = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/jobs/${id}/applications/`);
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};
