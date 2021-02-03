/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { USER_STATES } from 'constants/authorization';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { userState } = useSelector((state) => state.authorization);

  if (userState !== USER_STATES.LOGGED) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} render={(props) => <Component {...rest} {...props} />} />;
};

export default ProtectedRoute;
