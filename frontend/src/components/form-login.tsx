import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

type LoginFormInputs = {
  email: string;
  password: string;
};

export const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    mode: 'onChange',
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Форма отправлена:', data);
  };

  return (
    <div className="wrapper-form">
      <div className="form">
        <div className="form__title">Авторизация</div>
        <form className="form__form" onSubmit={handleSubmit(onSubmit)}>
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

          <button className="form__button" type="submit" disabled={!isValid}>
            Войти
          </button>
        </form>
        <Link to={'/register'}>
          <div className="form__register">
            Нет аккаунта? <br /> <span>Зарегистрируйтесь</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
