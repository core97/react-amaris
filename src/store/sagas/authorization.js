import { call, put } from 'redux-saga/effects';
import { handleSagaError } from 'store/sagas';
import { actionCreators as authActions } from 'store/reducers/authorization';
import { USER_STATES } from 'constants/authorization';
import { fetchLogin } from 'services/api';

export function* login(action) {
  try {
    const { email, password } = action.payload;
    const credentials = { email, password };

    const response = yield call(fetchLogin, credentials);
    const { token } = response;
    yield put(authActions.loginSucceded(USER_STATES.LOGGED, token));

  } catch (error) {
    const reducerFailureAction = authActions.loginFailed('Error al autenticarse');
    yield handleSagaError(error, reducerFailureAction);
  }
}
