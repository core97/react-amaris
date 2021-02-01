/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from 'pages/Login';
import ListOfUsers from 'pages/ListOfUsers';
import DetailUser from 'pages/DetailUser';
import ProtectedRoute from 'common/components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav> 
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/">Lista de usuarios</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <ProtectedRoute exact path="/users/:userID" component={DetailUser} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={ListOfUsers} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
