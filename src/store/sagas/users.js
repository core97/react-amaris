import { call, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { handleSagaError } from 'store/sagas';
import { actionCreators as usersActions } from 'store/reducers/users';
import { fetchDeleteUser, fetchEditUser, fetchSingleUser, fetchUsers } from 'services/api';

export function* getUsers(action) {
  try {
    const { currentPage, shouldFetch } = action.payload;
    const usersList = yield select((state) => state.users.data);
    const indexPagesSearched = yield select((state) => state.users.indexPagesSearched);

    // Datos payload
    let users = [];
    let navigationList = null;

    // Compureba si la pagina actual ya ha sido buscada
    const hasPage = indexPagesSearched.some((eachPage) => eachPage === currentPage);

    if (!usersList.length || shouldFetch || !hasPage) {
      const nextCurrentPage = currentPage + 1;

      yield put(usersActions.savePageSearched(currentPage));
      const responseCurrentPage = yield call(fetchUsers, currentPage);
      users = [...users, ...responseCurrentPage.data];
      navigationList = {
        totalPages: responseCurrentPage.total_pages,
        itemsPerPage: responseCurrentPage.per_page,
      };

      if (currentPage < responseCurrentPage.total_pages) {
        /**
         * Obtiene los datos de la siguiente pagina para que en caso de
         * borrar un usuario, no se quede un hueco en blanco en la
         * pagina actual
         */
        yield put(usersActions.savePageSearched(nextCurrentPage));
        const responseNextCurrentPage = yield call(fetchUsers, nextCurrentPage);
        users = [...users, ...responseNextCurrentPage.data];
      }
    }

    yield put(usersActions.getUsersSucceded(users, navigationList));
  } catch (error) {
    const reducerFailureAction = usersActions.getUsersFailed(
      'No se ha podido obtener los usuarios',
    );
    yield handleSagaError(error, reducerFailureAction);
  }
}

export function* getSingleUser(action) {
  try {
    const { userID } = action.payload;
    const usersList = yield select((state) => state.users.data);

    let singleUser = usersList.find((eachUser) => String(eachUser.id) === userID);

    if (!singleUser) {
      const response = yield call(fetchSingleUser, userID);
      singleUser = response.data;
    }

    yield put(usersActions.getSingleUserSucceded(singleUser));
  } catch (error) {
    const reducerFailureAction = usersActions.getSingleUserFailed(
      'No se ha podido obtener los detalles del usuario',
    );
    yield handleSagaError(error, reducerFailureAction);
  }
}

export function* editUser(action) {
  try {
    const { payload } = action;
    const singleUser = yield select((state) => state.users.singleUser);

    const params = {
      userID: payload.userID,
      firstName: payload.firstName || singleUser.first_name,
      lastName: payload.lastName || singleUser.last_name,
      email: payload.email || singleUser.email,
    };

    const response = yield call(fetchEditUser, params);

    const { firstName, lastName, email } = response;

    const userData = { firstName, lastName, email };

    yield put(usersActions.editUserSucceded(userData, payload.userID));
    toast.info('✏️ El usuario se ha actualizado correctamente');
  } catch (error) {
    const reducerFailureAction = usersActions.editUserFailed('No se ha podido editar el usuario');
    yield handleSagaError(error, reducerFailureAction);
  }
}

export function* deleteUser(action) {
  try {
    const { userID } = action.payload;
    yield call(fetchDeleteUser, userID);

    yield put(usersActions.deleteUserSucceded(userID));
    toast.info('🗑️ El usuario se ha borrado correctamente');
  } catch (error) {
    const reducerFailureAction = usersActions.deleteUserFailed('Error al eliminar el usuario');
    yield handleSagaError(error, reducerFailureAction);
  }
}
