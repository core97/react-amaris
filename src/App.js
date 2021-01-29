import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from 'pages/Login';
import ListOfUsers from 'pages/ListOfUsers';
import DetailUser from 'pages/DetailUser';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users/1">Detalles del usuario</Link>
            </li>
            <li>
              <Link to="/users">Lista de usuarios</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/users/:userID">
            <DetailUser />
          </Route>
          <Route path="/users">
            <ListOfUsers />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
