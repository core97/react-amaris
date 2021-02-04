import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Textfield, { TYPE_TEXTFIELD } from 'common/components/Textfield/Textfield';
import Button, { TYPE_BUTTON } from 'common/components/Button/Button';
import { useLocalStorage } from 'common/hooks/useLocalStorage';
import { actionCreators as authActions } from 'store/reducers/authorization';
import { actionCreators as usersActions } from 'store/reducers/users';
import { USER_STATES } from 'constants/authorization';
import {
  StyledButtonArea,
  StyledContainer,
  StyledFormWrapper,
  StyledForm,
  StyledTitle,
} from './styles';

const Login = () => {
  const [formDone, setFormDone] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const { userState, token, isLoading } = useSelector((state) => state.authorization);
  const [, setStoredToken, deleteStoredToken] = useLocalStorage('token', token);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(authActions.login(email, password));
    setFormDone(true);
  };

  const handleClickLogOut = () => {
    dispatch(authActions.setUserState(USER_STATES.NOT_LOGGED));
    dispatch(usersActions.resetAll());
    deleteStoredToken();
  };

  useEffect(() => {
    if (userState === USER_STATES.LOGGED && formDone) {
      setStoredToken(token);
      history.push('/');
    }
  }, [userState]);

  return (
    <StyledContainer>
      {userState === USER_STATES.LOGGED ? (
        <StyledContainer>
          <StyledTitle>Ya estás logueado 🎉🎉🎉🎉</StyledTitle>
          <Button type={TYPE_BUTTON.button} secondary onClick={handleClickLogOut}>
            Cerrar sesión
          </Button>
        </StyledContainer>
      ) : (
        <StyledFormWrapper>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <StyledTitle>Accede a tu cuenta</StyledTitle>
            <Textfield
              label="Email"
              type={TYPE_TEXTFIELD.email}
              placeholder="Dirección de correo electrónico"
              name="email"
              errors={errors}
              register={register({
                required: { value: true, message: 'Es necesario el email' },
              })}
            />
            <Textfield
              label="Contraseña"
              type={TYPE_TEXTFIELD.password}
              placeholder="Contraseña de tu cuenta"
              name="password"
              errors={errors}
              register={register({
                required: { value: true, message: 'Es necesario la contraseña' },
              })}
            />
            <StyledButtonArea>
              <Button
                type={TYPE_BUTTON.submit}
                isFullWidth
                disabled={isLoading}
                isLoading={isLoading}
              >
                Accceder
              </Button>
            </StyledButtonArea>
          </StyledForm>
        </StyledFormWrapper>
      )}
    </StyledContainer>
  );
};

export default Login;
