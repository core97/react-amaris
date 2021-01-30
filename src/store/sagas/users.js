import { call, put, select } from 'redux-saga/effects';
import { handleSagaError } from 'store/sagas';
import { actionCreators as usersActions } from 'store/reducers/users';

const fetchUsers = (page) =>
  fetch(`https://reqres.in/api/users?page=${page}`).then((res) => res.json());

export function* setUsers(action) {
  try {
    const { currentPage, shouldFetch } = action.payload;
    // function to get user state in redux
    const getUsers = (state) => state.users.data;
    // function to get the paging indexes searched
    const getIndexPagesSearched = (state) => state.users.indexPagesSearched;
    const usersList = yield select(getUsers);
    const indexPagesSearched = yield select(getIndexPagesSearched);
    let data = [];

    // Check if it has already been searched with that "currentPage"
    const hasPage = indexPagesSearched.some((eachPage) => eachPage === currentPage);

    if (!usersList.length || shouldFetch || !hasPage) {
      const response = yield call(fetchUsers, currentPage);
      yield put(usersActions.savePageSearched(currentPage));
      data = response.data;
    }

    yield put(usersActions.setUsersSucceded(data));
  } catch (error) {
    const reducerFailureAction = usersActions.setUsersFailed(
      'No se ha podido obtener los usuarios',
    );
    yield handleSagaError(error, reducerFailureAction);
  }
}
