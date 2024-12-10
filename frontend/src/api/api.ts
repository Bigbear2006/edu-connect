// export const sendingDateReg = async (data, setError, navigate) => {
// 	try {
// 		await axiosInstanсe.post('/jwt-auth/register-user/', data).then(() => {
// 		});
// 	} catch {
// 		setError('Ваш регион не Ростовская область');
// 	}
// }
// // Авторизация пользователя
// export const sendingDateAuth = async (email, password, navigate) => {
// 	const data = { email, password };
// 	await axiosInstanсe.post('/jwt-auth/get-token/', data).then((response) => {
// 		localStorage.setItem('access', response.data.access);
// 		localStorage.setItem('refresh', response.data.refresh);
// 		ApiService.infoUserIsCard(navigate);
// 	});
// }
// // Функция для обновления токена
// export const refreshToken = async (refresh) =>{
// 	try {
// 		await axiosInstanсe
// 			.post('/jwt-auth/refresh-token/', { refresh: refresh })
// 			.then((response) => {
// 				const newToken = response.data.access;
// 				localStorage.setItem('access', newToken);
// 			});
// 	} catch (error) {
// 		console.error('Ошибка при обновлении токена:', error);
// 	}
// }
