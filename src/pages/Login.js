import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Textfield from 'common/components/Textfield';
import { useLocalStorage } from 'common/hooks/useLocalStorage';
import { actionCreators as authActions } from 'store/reducers/authorization';
import { USER_STATES } from 'constants/authorization';

const Login = () => {
  const [formDone, setFormDone] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const { userState, token } = useSelector((state) => state.authorization);
  const [, setStoredToken] = useLocalStorage('token');
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(authActions.login(email, password));
    setFormDone(true);
  };

  useEffect(() => {
    if (userState === USER_STATES.LOGGED && formDone) {
      setStoredToken('token', token);
      history.push('/');
    }
  }, [userState]);

  return (
    <section>
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
    </section>
  );
};

export default Login;
