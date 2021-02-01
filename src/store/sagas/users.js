import { call, put, select } from 'redux-saga/effects';
import { handleSagaError } from 'store/sagas';
import { actionCreators as usersActions } from 'store/reducers/users';

const fetchUsers = (page) =>
  fetch(`https://reqres.in/api/users?page=${page}`).then((res) => res.json());

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

export function* setUsers(action) {
  try {
    const { currentPage, shouldFetch } = action.payload;
    // function to get user state in redux
    const getUsers = (state) => state.users.data;
    // function to get the paging indexes searched
    const getIndexPagesSearched = (state) => state.users.indexPagesSearched;
    const usersList = yield select(getUsers);
    const indexPagesSearched = yield select(getIndexPagesSearched);

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

export function* editUser(action) {
  try {
    const { userID } = action.payload; 
    const response = yield call(fetchEditUser, userID);
    yield put(usersActions.editUserSucceded(response.name, userID));
  } catch (error) {
    const reducerFailureAction = usersActions.editUserFailed('No se ha podido editar el usuario');
    yield handleSagaError(error, reducerFailureAction);
  }
}
