import { axiosInstance } from './instance';

export const getChangeRole = async () => {
  try {
    const response = await axiosInstance.get('/change-role-bids/');
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};
