/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from 'pages/Login/Login';
import ListOfUsers from 'pages/ListOfUsers/ListOfUsers';
import DetailUser from 'pages/DetailUser/DetailUser';
import ProtectedRoute from 'common/components/ProtectedRoute';
import Header from 'common/components/Header/Header';
import { useLocalStorage } from 'common/hooks/useLocalStorage';
import { actionCreators as authActions } from 'store/reducers/authorization';
import { USER_STATES } from 'constants/authorization';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [storedToken] = useLocalStorage('token');
  const dispatch = useDispatch();

  if (storedToken) {
    dispatch(authActions.setUserState(USER_STATES.LOGGED, storedToken));
  }

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <ProtectedRoute exact path="/users/:userID" component={DetailUser} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={ListOfUsers} />
        </Switch>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
