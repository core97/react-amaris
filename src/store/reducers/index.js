import { combineReducers } from 'redux';
import usersReducer, { NAME as usersName} from 'store/reducers/users';
import authReducer, { NAME as authName} from 'store/reducers/authorization';

const rootReducer = () => combineReducers({
  [usersName]: usersReducer,
  [authName]: authReducer,
});

export default rootReducer;