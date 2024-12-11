import { axiosInstance } from './instance';

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('/auth/user/info');
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};

export const getPortfolio= async (id: string) => {
  try {
    const response = await axiosInstance.get(`/auth/user/${id}/portfolio/`);
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};

export const changeRole = async (role: string) => {
  try {
    const response = await axiosInstance.post('/change-role-bids/', { role: role });
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};

export const changeRoleUser = async (id: string, role: string) => {
  try {
    const response = await axiosInstance.patch(`/auth/user/${id}/info/`, { role: role });
		console.log(response.data);
		
    return response.data;
  } catch (error) {
    console.log('Ошибка', error);
  }
};
