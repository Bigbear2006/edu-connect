import { axiosInstance } from "./instance";


export const getCourses = async () => {
	try {
    const response = await axiosInstance.get('/courses/');
    return response.data;
  } catch (error) {
		console.log('Ошибка', error);
}
}