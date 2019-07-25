import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from './pages/Login.js'
import DragonList from './pages/DragonList.js'
import Auth from './services/Auth'

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        Auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

class App extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/" component={DragonList} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
