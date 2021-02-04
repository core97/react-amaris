import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Button, { TYPE_BUTTON } from 'common/components/Button/Button';
import Textfield, { TYPE_TEXTFIELD } from 'common/components/Textfield/Textfield';
import { actionCreators as usersActions } from 'store/reducers/users';
import {
  StyledAvatar,
  StyledAvatarWrapper,
  StyledContainer,
  StyledButtonArea,
  StyledForm,
  StyledFormWrapper,
} from './styles';

const BUTTON_LABEL = {
  editUser: 'Guardar cambios',
  deleteUser: 'Eliminar usuario',
};

const DetailUser = () => {
  const [hasDeletedUser, setHasDeletedUser] = useState(false);
  const [hasEditedUser, setHasEditedUser] = useState(false);
  const [disabledBtnEdit, setDisabledBtnEdit] = useState(true);
  const { register, handleSubmit, errors, watch } = useForm();
  const history = useHistory();
  const { userID } = useParams();
  const { data: usersList, singleUser: detailUser, error: errorUser, isLoading } = useSelector(
    (state) => state.users,
  );
  const dispatch = useDispatch();

  const handleClickDeleteUser = () => {
    setHasDeletedUser(true);
    dispatch(usersActions.deleteUser(userID));
  };

  const onSubmit = (data) => {
    setHasEditedUser(true);
    const { firstName, lastName, email } = data;
    const userData = { firstName, lastName, email };

    dispatch(usersActions.editUser(userID, userData));
  };

  useEffect(() => {
    dispatch(usersActions.resetError());
    if (!detailUser) {
      dispatch(usersActions.getSingleUser(userID));
    }

    return () => {
      dispatch(usersActions.resetSingleUser());
    };
  }, []);

  useEffect(() => {
    if (detailUser) {
      /**
       * Esta escuchando los valores de los inputs.
       * Si el valor es difirente al valor por defecto,
       * el boton de editar se habilita
       */
      if (
        watch('firstName') !== detailUser.first_name ||
        watch('lastName') !== detailUser.last_name ||
        watch('email') !== detailUser.email
      ) {
        setDisabledBtnEdit(false);
      }
    }
  }, [watch('firstName'), watch('lastName'), watch('email')]);

  useEffect(() => {
    if ((hasDeletedUser || hasEditedUser) && !errorUser) {
      history.push('/');
    }
  }, [usersList]);

  return (
    <StyledContainer>
      {!detailUser ? (
        <p>Cargando</p>
      ) : (
        <StyledFormWrapper>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <h1>Detalles del usuario</h1>
            <StyledAvatarWrapper>
              <StyledAvatar src={detailUser.avatar} width="128" height="128" alt="Photo profile" />
            </StyledAvatarWrapper>
            <Textfield
              label="Nombre"
              name="firstName"
              errors={errors}
              defaultValue={detailUser.first_name}
              register={register({
                required: { value: true, message: 'Es necesario el email' },
              })}
            />
            <Textfield
              label="Apellidos"
              name="lastName"
              errors={errors}
              defaultValue={detailUser.last_name}
              register={register({
                required: { value: true, message: 'Es necesario el email' },
              })}
            />
            <Textfield
              label="Email"
              type={TYPE_TEXTFIELD.email}
              name="email"
              errors={errors}
              defaultValue={detailUser.email}
              register={register({
                required: { value: true, message: 'Es necesario el email' },
              })}
            />
            <StyledButtonArea>
              <Button
                secondary
                type={TYPE_BUTTON.button}
                onClick={handleClickDeleteUser}
                disabled={isLoading}
                isLoading={isLoading && hasDeletedUser}
              >
                {BUTTON_LABEL.deleteUser}
              </Button>
              <Button
                type={TYPE_BUTTON.submit}
                disabled={disabledBtnEdit || isLoading}
                isLoading={isLoading && hasEditedUser}
              >
                {BUTTON_LABEL.editUser}
              </Button>
            </StyledButtonArea>
          </StyledForm>
        </StyledFormWrapper>
      )}
    </StyledContainer>
  );
};

export default DetailUser;
