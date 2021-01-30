export const NAME = 'users';

export const actionTypes = {
  SAVE_PAGE_SEARCHED: '[users]/SAVE_PAGE_SEARCHED',
  SET_USERS_FETCHING: '[users]/SET_USERS_FETCHING',
  SET_USERS_SUCCEDED: '[users]/SET_USERS_SUCCEDED',
  SET_USERS_FAILED: '[users]/SET_USERS_FAILED',
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
    default:
      return state;
  }
}

export const actionCreators = {
  savePageSearched: (currentPage) => ({
    type: actionTypes.SAVE_PAGE_SEARCHED,
    payload: { currentPage },
  }),
  setUsers: (params) => ({
    type: actionTypes.SET_USERS_FETCHING,
    payload: params,
  }),
  setUsersSucceded: (users, navigationList) => ({
    type: actionTypes.SET_USERS_SUCCEDED,
    payload: { users, navigationList },
  }),
  setUsersFailed: (message) => ({
    type: actionTypes.SET_USERS_FAILED,
    payload: { message },
  }),
};
