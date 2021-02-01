import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as usersActions } from 'store/reducers/users';

const DetailUser = () => {
  const [detailUser, setUserDetail] = useState(undefined);
  const { userID } = useParams();
  const { data: usersList } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(usersActions.editUser(userID));
  };

  useEffect(() => {
    setUserDetail(
      usersList.find((eachUser) => String(eachUser.id) === userID),
    );
  }, []);

  return (
    <section>
      {!detailUser ? (
        <p>Cargando</p>
      ) : (
        <div>
          <h1>{`${detailUser.first_name} ${detailUser.last_name}`}</h1>
          <button type="button" onClick={handleClick}>
            Editar usuario
          </button>
        </div>
      )}
    </section>
  );
};

export default DetailUser;
