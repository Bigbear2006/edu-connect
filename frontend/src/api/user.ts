import { axiosInstance } from './instance';

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('/auth/user/info');
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};
