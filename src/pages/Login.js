import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Textfield from 'common/components/Textfield';
import { useLocalStorage } from 'common/hooks/useLocalStorage';
import { actionCreators as authActions } from 'store/reducers/authorization';
import { USER_STATES } from 'constants/authorization';

const Login = () => {
  const [succedForm, setSuccedForm] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const { userState } = useSelector((state) => state.authorization);
  const [,, removeToken] = useLocalStorage('token');
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    setSuccedForm(true);
    const { email, password } = data;
    dispatch(authActions.login(email, password));
  };

  const handleClick = () => {
    removeToken();
    dispatch(authActions.setUserState(USER_STATES.NOT_LOGGED));
  }

  useEffect(() => {
    if (userState === USER_STATES.LOGGED && succedForm) {
      history.push('/');
    }
  }, [userState]);

  return (
    <section>
      {userState !== USER_STATES.LOGGED ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textfield
            label="Email"
            type="email"
            placeholder="Dirección de correo electrónico"
            name="email"
            errors={errors}
            register={register({
              required: { value: true, message: 'Es necesario el email' },
            })}
          />
          <Textfield
            label="Contraseña"
            type="password"
            placeholder="Contraseña de tu cuenta"
            name="password"
            errors={errors}
            register={register({
              required: { value: true, message: 'Es necesario la contraseña' },
            })}
          />
          <button type="submit">Accceder</button>
        </form>
      ) : (
        <div>
          <h1>Ya esta autenticado</h1>
          <h3>Navega por esta maravillosa aplicación</h3>
          <h3>Si desea puede salir de la aplición haciendo logout</h3>
          <button type="button" onClick={handleClick}>Salir</button>
        </div>
      )}
    </section>
  );
};

export default Login;
