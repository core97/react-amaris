import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as usersActions } from 'store/reducers/users';

const DetailUser = () => {
  const [hasDeletedUser, setHasDeletedUser] = useState(false);
  const history = useHistory();
  const { userID } = useParams();
  const { data: usersList, singleUser: detailUser, error: errorUser  } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleClickEditUser = () => {
    dispatch(usersActions.editUser(userID));
  };

  const handleClickDeleteUser = () => {
    dispatch(usersActions.deleteUser(userID));
    setHasDeletedUser(true);
  };

  useEffect(() => {
    dispatch(usersActions.resetError());
    if (!detailUser) {
      dispatch(usersActions.getSingleUser(userID));
    }

    return () => {
      dispatch(usersActions.resetSingleUser());
    }
  }, []);

  useEffect(() => {
    if (hasDeletedUser && !errorUser) {
      history.push('/');
    }
  }, [usersList]);

  return (
    <section>
      {!detailUser ? (
        <p>Cargando</p>
      ) : (
        <div>
          <h1>{`${detailUser.first_name} ${detailUser.last_name}`}</h1>
          <button type="button" onClick={handleClickEditUser}>
            Editar usuario
          </button>
          <button type="button" onClick={handleClickDeleteUser}>
            Eliminar usuario
          </button>
        </div>
      )}
    </section>
  );
};

export default DetailUser;
