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
    takeLatest(usersActions.SET_USERS_FETCHING, usersSagas.setUsers),
    takeLatest(usersActions.EDIT_USER_FETCHING, usersSagas.editUser),
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
