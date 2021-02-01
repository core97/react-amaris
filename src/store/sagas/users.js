import { call, put, select } from 'redux-saga/effects';
import { handleSagaError } from 'store/sagas';
import { actionCreators as usersActions } from 'store/reducers/users';

const fetchUsers = (page) =>
  fetch(`https://reqres.in/api/users?page=${page}`).then((res) => res.json());

  const fetchSingleUser = (userID) =>
  fetch(`https://reqres.in/api/users/${userID}`).then((res) => res.json());

const fetchEditUser = (userID) =>
  fetch(`https://reqres.in/api/users/${userID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Juan',
      job: 'Developer',
    }),
  }).then((res) => res.json());

const fetchDeleteUser = (userID) =>
  fetch(`https://reqres.in/api/users/${userID}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res);

export function* setUsers(action) {
  try {
    const { currentPage, shouldFetch } = action.payload;
    const usersList = yield select((state) => state.users.data);
    const indexPagesSearched = yield select((state) => state.users.indexPagesSearched);

    // Data to payload
    let users = [];
    let navigationList = null;

    // Check if it has already been searched with that "currentPage"
    const hasPage = indexPagesSearched.some((eachPage) => eachPage === currentPage);

    if (!usersList.length || shouldFetch || !hasPage) {
      const response = yield call(fetchUsers, currentPage);
      yield put(usersActions.savePageSearched(currentPage));
      users = response.data;
      navigationList = {
        totalPages: response.total_pages,
        itemsPerPage: response.per_page,
      };
    }

    yield put(usersActions.setUsersSucceded(users, navigationList));
  } catch (error) {
    const reducerFailureAction = usersActions.setUsersFailed(
      'No se ha podido obtener los usuarios',
    );
    yield handleSagaError(error, reducerFailureAction);
  }
}

export function* getSingleUser(action) {
  try {
    const { userID } = action.payload;
    const usersList = yield select(state => state.users.data);

    let singleUser = usersList.find((eachUser) => String(eachUser.id) === userID);

    if (!singleUser) {
      const response = yield call(fetchSingleUser, userID);
      singleUser = response.data;
    }

    yield put(usersActions.getSingleUserSucceded(singleUser));

  } catch (error) {
    const reducerFailureAction = usersActions.getSingleUserFailed(
      'No se ha podido obtener los detalles del usuario',
    );
    yield handleSagaError(error, reducerFailureAction);
  }
}

export function* editUser(action) {
  try {
    const { userID } = action.payload;
    const response = yield call(fetchEditUser, userID);
    
    const { name } = response;
    yield put(usersActions.editUserSucceded(name, userID));
  } catch (error) {
    const reducerFailureAction = usersActions.editUserFailed('No se ha podido editar el usuario');
    yield handleSagaError(error, reducerFailureAction);
  }
}

export function* deleteUser(action) {
  try {
    const { userID } = action.payload;
    yield call(fetchDeleteUser, userID);
    yield put(usersActions.deleteUserSucceded(userID));
  } catch (error) {
    const reducerFailureAction = usersActions.deleteUserFailed('Error al eliminar el usuario');
    yield handleSagaError(error, reducerFailureAction);
  }
}
