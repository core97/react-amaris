/* eslint-disable no-param-reassign */
export const NAME = 'users';

export const actionTypes = {
  RESET_ERROR: '[users]/RESET_ERROR',
  RESET_ALL: '[users]/RESET_ALL',
  SAVE_PAGE_SEARCHED: '[users]/SAVE_PAGE_SEARCHED',
  CHANGE_CURRENT_PAGE: '[users]/CHANGE_CURRENT_PAGE',
  /**
   * Get users from api
   */
  GET_USERS_FETCHING: '[users]/GET_USERS_FETCHING',
  GET_USERS_SUCCEDED: '[users]/GET_USERS_SUCCEDED',
  GET_USERS_FAILED: '[users]/GET_USERS_FAILED',
  /**
   * Get single user from api
   */
  GET_SINGLE_USER_FETCHING: '[users]/GET_SINGLE_USER_FETCHING',
  GET_SINGLE_USER_SUCCEDED: '[users]/GET_SINGLE_USER_SUCCEDED',
  GET_SINGLE_USER_FAILED: '[users]/GET_SINGLE_USER_FAILED',
  RESET_SINGLE_USER: '[users]/RESET_SINGLE_USER',
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
  singleUser: null,
  currentPage: 1,
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
    case actionTypes.RESET_ERROR:
      return {
        ...state,
        error: null,
      };
      case actionTypes.RESET_ALL:
        return {
          ...state,
          ...initialState
        };
    case actionTypes.CHANGE_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload.currentPage,
      };
    case actionTypes.GET_USERS_FETCHING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.GET_USERS_SUCCEDED:
      return {
        ...state,
        data: [...state.data, ...payload.users],
        totalPages: payload.navigationList?.totalPages || state.totalPages,
        itemsPerPage: payload.navigationList?.itemsPerPage || state.itemsPerPage,
        isLoading: false,
        error: null,
      };
    case actionTypes.GET_USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.message,
      };
    case actionTypes.GET_SINGLE_USER_FETCHING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.GET_SINGLE_USER_SUCCEDED:
      return {
        ...state,
        singleUser: payload.singleUser,
        isLoading: false,
        error: null,
      };
    case actionTypes.GET_SINGLE_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.message,
      };
    case actionTypes.RESET_SINGLE_USER:
      return {
        ...state,
        singleUser: null,
        isLoading: false,
        error: null,
      };
    case actionTypes.EDIT_USER_FETCHING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.EDIT_USER_SUCCEDED:
      return {
        ...state,
        data: state.data.map((eachUser) => {
          if (String(eachUser.id) === String(payload.userID)) {
            eachUser.first_name = payload.firstName;
            eachUser.last_name = payload.lastName;
            eachUser.email = payload.email;
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
    case actionTypes.DELETE_USER_FETCHING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actionTypes.DELETE_USER_SUCCEDED:
      return {
        ...state,
        data: state.data.filter((eachUser) => String(eachUser.id) !== payload.userID),
        isLoading: false,
        error: null,
      };
    case actionTypes.DELETE_USER_FAILED:
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
   * @param {number} currentPage
   */
  savePageSearched: (currentPage) => ({
    type: actionTypes.SAVE_PAGE_SEARCHED,
    payload: { currentPage },
  }),
  resetError: () => ({
    type: actionTypes.RESET_ERROR,
  }),
  resetAll: () => ({
    type: actionTypes.RESET_ALL,
  }),
  /**
   * @param {number} currentPage
   */
  changeCurrentPage: (currentPage) => ({
    type: actionTypes.CHANGE_CURRENT_PAGE,
    payload: { currentPage },
  }),
  /**
   * @param {Object} params
   * @param {number} params.currentPage
   * @param {boolean} [params.shouldFetch]
   */
  getUsers: (params) => ({
    type: actionTypes.GET_USERS_FETCHING,
    payload: params,
  }),
  /**
   * @param {Object[]} users
   * @param {string} users.first_name
   * @param {string} users.last_name
   * @param {string} users.email
   * @param {Object} navigationList
   * @param {number} [navigationList.totalPages]
   * @param {number} [navigationList.itemsPerPage]
   */
  getUsersSucceded: (users, navigationList) => ({
    type: actionTypes.GET_USERS_SUCCEDED,
    payload: { users, navigationList },
  }),
  /**
   * @param {string} message
   */
  getUsersFailed: (message) => ({
    type: actionTypes.GET_USERS_FAILED,
    payload: { message },
  }),
  /**
   * @param {number|string} userID
   */
  getSingleUser: (userID) => ({
    type: actionTypes.GET_SINGLE_USER_FETCHING,
    payload: { userID },
  }),
  /**
   * @param {Object} singleUser
   * @param {number} singleUser.id
   * @param {string} singleUser.email
   * @param {string} singleUser.first_name
   * @param {string} singleUser.last_name
   * @param {string} singleUser.avatar
   */
  getSingleUserSucceded: (singleUser) => ({
    type: actionTypes.GET_SINGLE_USER_SUCCEDED,
    payload: { singleUser },
  }),
  /**
   * @param {string} message
   */
  getSingleUserFailed: (message) => ({
    type: actionTypes.GET_SINGLE_USER_FAILED,
    payload: { message },
  }),
  resetSingleUser: () => ({
    type: actionTypes.RESET_SINGLE_USER,
  }),
  /**
   * @param {string|number} userID
   * @param {Object} userData
   * @param {string} [userData.firstName]
   * @param {string} [userData.lastName]
   * @param {string} [userData.email]
   */
  editUser: (userID, userData) => ({
    type: actionTypes.EDIT_USER_FETCHING,
    payload: { userID, ...userData },
  }),
  /**
   * @param {number|string} userID
   * @param {string} [userData.firstName]
   * @param {string} [userData.lastName]
   * @param {string} [userData.email]
   */
  editUserSucceded: (userData, userID) => ({
    type: actionTypes.EDIT_USER_SUCCEDED,
    payload: { ...userData, userID },
  }),
  /**
   * @param {string} message
   */
  editUserFailed: (message) => ({
    type: actionTypes.EDIT_USER_FAILED,
    payload: message,
  }),
  /**
   * @param {number|string} userID
   */
  deleteUser: (userID) => ({
    type: actionTypes.DELETE_USER_FETCHING,
    payload: { userID },
  }),
  /**
   * @param {string} userID
   */
  deleteUserSucceded: (userID) => ({
    type: actionTypes.DELETE_USER_SUCCEDED,
    payload: { userID },
  }),
  /**
   * @param {string} message
   */
  deleteUserFailed: (message) => ({
    type: actionTypes.DELETE_USER_FAILED,
    payload: message,
  }),
};
