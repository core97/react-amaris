import { all, takeLatest, put } from 'redux-saga/effects';
import { actionTypes as usersActions } from 'store/reducers/users';
import { actionTypes as authActions } from 'store/reducers/authorization';
import * as usersSagas from 'store/sagas/users';
import * as authSagas from 'store/sagas/authorization';

export default function* rootSaga() {
  yield all([
    /**
     * users
     */
    takeLatest(usersActions.GET_USERS_FETCHING, usersSagas.getUsers),
    takeLatest(usersActions.GET_SINGLE_USER_FETCHING, usersSagas.getSingleUser),
    takeLatest(usersActions.EDIT_USER_FETCHING, usersSagas.editUser),
    takeLatest(usersActions.DELETE_USER_FETCHING, usersSagas.deleteUser),
    /**
     * authorization
     */
    takeLatest(authActions.LOGIN_FETCHING, authSagas.login),
  ]);
}

export function* handleSagaError(error, reducerFailureAction) {
  console.error(error);

  if (reducerFailureAction) {
    yield put(reducerFailureAction);
  }
}
