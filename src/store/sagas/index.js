import { all, takeLatest, put } from 'redux-saga/effects';
import { actionTypes as usersActions } from 'store/reducers/users';
import * as usersSagas from 'store/sagas/users';

export default function* rootSaga() {
  yield all([
    /**
     * users
     */
    takeLatest(usersActions.SET_USERS_FETCHING, usersSagas.setUsers),
  ]);
}

export function* handleSagaError(error, reducerFailureAction) {
  console.log(error);

  if (reducerFailureAction) {
    yield put(reducerFailureAction);
  }
}
