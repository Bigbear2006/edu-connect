import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { userRegister } from '../api/auth-register';

type RegistrationFormInputs = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const FormRegistration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegistrationFormInputs>({
    mode: 'onChange',
  });

	const navigate = useNavigate()

  const onSubmit = async (data: RegistrationFormInputs) => {
    const response = await userRegister(data.fullName, data.email, data.password)

		if (response) {
			navigate('/login')
		}
  };

  const password = watch('password');

  return (
    <div className="wrapper-form">
      <div className="form">
        <div className="form__title">Регистрация</div>
        <form className="form__form" onSubmit={handleSubmit(onSubmit)}>
          {/* Поле ФИО */}
          <div className="form__inputs">
            <label htmlFor="fullName">ФИО</label>
            <input
              id="fullName"
              type="text"
              placeholder="ФИО"
              className={errors.fullName ? 'input-error' : ''}
              {...register('fullName', {
                required: 'ФИО обязательно для заполнения',
                pattern: {
                  value: /^[А-Яа-яЁёA-Za-z]+([- ][А-Яа-яЁёA-Za-z]+){2}$/,
                  message: 'ФИО должно состоять из трёх слов, разделённых пробелом или дефисом',
                },
              })}
            />
          </div>

          {/* Поле Email */}
          <div className="form__inputs">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="text"
              placeholder="E-mail"
              className={errors.email ? 'input-error' : ''}
              {...register('email', {
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              })}
            />
          </div>

          {/* Поле Пароль */}
          <div className="form__inputs">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              placeholder="Пароль"
              className={errors.password ? 'input-error' : ''}
              {...register('password', {
                required: true,
                minLength: 4,
              })}
            />
          </div>

          {/* Поле Подтверждение пароля */}
          <div className="form__inputs">
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Подтвердите пароль"
              className={errors.confirmPassword ? 'input-error' : ''}
              {...register('confirmPassword', {
                required: true,
                validate: (value) => value === password || 'Пароли должны совпадать',
              })}
            />
          </div>

          <button className="form__button" type="submit" disabled={!isValid}>
            Зарегистрироваться
          </button>
        </form>
				<Link to={'/login'}>
          <div className="form__register">
            Есть аккаунт?  <span>Войти</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
