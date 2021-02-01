import { call, put } from 'redux-saga/effects';
import { handleSagaError } from 'store/sagas';
import { actionCreators as authActions } from 'store/reducers/authorization';
import { USER_STATES } from 'constants/authorization';

const fetchLogin = (credentials) =>
  fetch(
    `https://reqres.in/api/login?email=${credentials.email}&password=${credentials.password}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }
  ).then((res) => res.json());

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
