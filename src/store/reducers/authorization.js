import { USER_STATES } from 'constants/authorization';

export const NAME = 'authorization';

export const actionTypes = {
  SET_USER_STATE: '[auth]/SET_USER_STATE',
  LOGIN_FETCHING: '[auth]/LOGIN_FETCHING',
  LOGIN_SUCCEDED: '[auth]/LOGIN_SUCCEDED',
  LOGIN_FAILED: '[auth]/LOGIN_FAILED',
};

const initialState = {
  userState: USER_STATES.NOT_KNOWN,
  token: null,
  isLoading: false,
  error: null,
};

export default function reducer(state = initialState, action = {}) {
  const { payload } = action;

  switch (action.type) {
    case actionTypes.SET_USER_STATE:
      return {
        ...state,
        userState: payload.userState,
        token: payload.token || null,
      };
      case actionTypes.LOGIN_FETCHING:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
    case actionTypes.LOGIN_SUCCEDED:
      return {
        ...state,
        userState: payload.userState,
        token: payload.token,
        isLoading: false,
        error: null,
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        error: payload.message,
      };
    default:
      return state;
  }
}

export const actionCreators = {
  /**
   * @param {USER_STATES.LOGGED | USER_STATES. NOT_LOGGED | USER_STATES.NOT_KNOWN} userState 
   * @param {string} token 
   */
  setUserState: (userState, token) => ({
    type: actionTypes.SET_USER_STATE,
    payload: { userState, token }
  }),
  /**
   * @param {string} email 
   * @param {string} password 
   */
  login: (email, password) => ({
    type: actionTypes.LOGIN_FETCHING,
    payload: { email, password },
  }),
  /**
   * @param {USER_STATES.LOGGED | USER_STATES. NOT_LOGGED | USER_STATES.NOT_KNOWN} userState 
   * @param {string} token
   */
  loginSucceded: (userState, token) => ({
    type: actionTypes.LOGIN_SUCCEDED,
    payload: { userState, token },
  }),
  /**
   * @param {string} message 
   */
  loginFailed: (message) => ({
    type: actionTypes.LOGIN_FAILED,
    payload: { message },
  }),
};
