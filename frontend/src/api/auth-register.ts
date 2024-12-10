import { axiosInstance } from "./instance";


export const userAuth = async (email: string, password: string) => {
  const data = { email, password };

  try {
    const response = await axiosInstance.post('/auth/user/login/', data);

    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);

    return response.data;
  } catch (error) {
    console.error('Ошибка при авторизации:', error);
    throw new Error('Ошибка авторизации, проверьте введённые данные.');
  }
};

export const userRegister = async (username: string, email: string, password: string) => {
  const data = { username, email, password };

  try {
    const response = await axiosInstance.post('/auth/user/register/', data);

    return response.data;
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    throw new Error('Ошибка регистрации');
  }
};

export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh');

    if (!refresh) {
      throw new Error('Refresh token not found');
    }

    const response = await axiosInstance.post('/auth/user/refresh-token/', { refresh });
    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);

    return response.data.access;
  } catch (error) {
    console.error('Ошибка при обновлении токенов:', error);
    throw new Error('Ошибка при обновлении токенов');
  }
};
