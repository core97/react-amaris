export const NAME = 'users';

export const actionTypes = {
  SAVE_PAGE_SEARCHED: '[users]/SAVE_PAGE_SEARCHED',
  /**
   * Get users from api
   */
  SET_USERS_FETCHING: '[users]/SET_USERS_FETCHING',
  SET_USERS_SUCCEDED: '[users]/SET_USERS_SUCCEDED',
  SET_USERS_FAILED: '[users]/SET_USERS_FAILED',
  /**
   * Edit user from api
   */
  EDIT_USER_FETCHING: '[users]/EDIT_USER_FETCHING',
  EDIT_USER_SUCCEDED: '[users]/EDIT_USER_SUCCEDED',
  EDIT_USER_FAILED: '[users]/EDIT_USER_FAILED',
  /**
   * Delete user from api
   */
  DELETE_USER_FETCHING: '[users]/DELETE_USER_FETCHING',
  DELETE_USER_SUCCEDED: '[users]/DELETE_USER_SUCCEDED',
  DELETE_USER_FAILED: '[users]/DELETE_USER_FAILED',
};

const initialState = {
  data: [],
  indexPagesSearched: [],
  totalPages: null,
  itemsPerPage: null,
  isLoading: false,
  error: null,
};

export default function reducer(state = initialState, action = {}) {
  const { payload } = action;

  switch (action.type) {
    case actionTypes.SAVE_PAGE_SEARCHED:
      return {
        ...state,
        indexPagesSearched: [...state.indexPagesSearched, payload.currentPage],
      };
    case actionTypes.SET_USERS_FETCHING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.SET_USERS_SUCCEDED:
      return {
        ...state,
        data: [...state.data, ...payload.users],
        totalPages: payload.navigationList?.totalPages || state.totalPages,
        itemsPerPage: payload.navigationList?.itemsPerPage || state.itemsPerPage,
        isLoading: false,
        error: null,
      };
    case actionTypes.SET_USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.message,
      };
    case actionTypes.EDIT_USER_FETCHING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.EDIT_USER_SUCCEDED:
      console.log(payload)
      return {
        ...state,
        data: state.data.map((eachUser) => {
          if (String(eachUser.id) === String(payload.userID)) {
            // eslint-disable-next-line no-param-reassign
            eachUser.first_name = payload.firstName;
          }
          return eachUser;
        }),
        isLoading: false,
        error: null,
      };
    case actionTypes.EDIT_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.message,
      };
    default:
      return state;
  }
}

export const actionCreators = {
  /**
   * @param {number|string} params.currentPage - page to make the request to the api
   */
  savePageSearched: (currentPage) => ({
    type: actionTypes.SAVE_PAGE_SEARCHED,
    payload: { currentPage },
  }),
  /**
   * @param {Object} params
   * @param {number|string} params.currentPage - page to make the request to the api
   * @param {boolean} [params.shouldFetch] - forces to do the request to the api
   */
  setUsers: (params) => ({
    type: actionTypes.SET_USERS_FETCHING,
    payload: params,
  }),
  /**
   * @param {Object[]} users - response data
   * @param {Object} navigationList - response data to make pagination
   * @param {number} [navigationList.totalPages]
   * @param {number} [navigationList.itemsPerPage]
   */
  setUsersSucceded: (users, navigationList) => ({
    type: actionTypes.SET_USERS_SUCCEDED,
    payload: { users, navigationList },
  }),
  /**
   * @param {string} message - error message
   */
  setUsersFailed: (message) => ({
    type: actionTypes.SET_USERS_FAILED,
    payload: { message },
  }),
  /**
   * @param {number|string} userID
   */
  editUser: (userID) => ({
    type: actionTypes.EDIT_USER_FETCHING,
    payload: { userID },
  }),
  /**
   * @param {string} firstName
   * @param {number|string} userID
   */
  editUserSucceded: (firstName, userID) => ({
    type: actionTypes.EDIT_USER_SUCCEDED,
    payload: { firstName, userID },
  }),
  editUserFailed: (message) => ({
    type: actionTypes.EDIT_USER_SUCCEDED,
    payload: message,
  }),
};
