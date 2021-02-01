/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useLocalStorage } from 'common/hooks/useLocalStorage';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [storedToken] = useLocalStorage('token');

  if (!storedToken) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} render={(props) => <Component {...rest} {...props} />} />;
};

export default ProtectedRoute;
