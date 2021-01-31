/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from 'common/hooks/useLocalStorage';
import { actionCreators as authActions } from 'store/reducers/authorization';
import { USER_STATES } from 'constants/authorization';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [storedToken] = useLocalStorage('token');
  const dispatch = useDispatch();

  if (!storedToken) {
    dispatch(authActions.setUserState(USER_STATES.NOT_LOGGED));
    return <Redirect to="/login" />;
  }

  dispatch(authActions.setUserState(USER_STATES.LOGGED, storedToken));
  return <Route {...rest} render={(props) => <Component {...rest} {...props} />} />;
};

export default ProtectedRoute;
