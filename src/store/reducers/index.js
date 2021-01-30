import { combineReducers } from 'redux';
import usersReducer, { NAME as usersName} from 'store/reducers/users';

const rootReducer = () => combineReducers({
  [usersName]: usersReducer,
});

export default rootReducer;