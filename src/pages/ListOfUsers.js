import React from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as usersActions } from 'store/reducers/users';

const ListOfUsers = () => {
  const dispatch = useDispatch();
  dispatch(usersActions.setUsers({ currentPage: 2 }));

  return <h1>Hola desde Lista de Usuarios</h1>;
};

export default ListOfUsers;
