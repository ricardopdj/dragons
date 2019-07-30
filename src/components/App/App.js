import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import PrivateRoute from '../PrivateRoute'
import { Login } from '../../pages/Login'
import { DragonList } from '../../pages/DragonList'
import { Dragon } from '../Dragon'
import { DragonForm } from '../DragonForm'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={DragonList} />
          <PrivateRoute exact path="/dragon/add" component={DragonForm} />
          <PrivateRoute exact path="/dragon/:id" component={Dragon} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
