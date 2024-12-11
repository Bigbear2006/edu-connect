import { axiosInstance } from './instance';

export const getBids = async () => {
  try {
    const response = await axiosInstance.get('/change-role-bids/');
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};

export const deleteChangeRole = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/change-role-bids/${id}/`);
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};
