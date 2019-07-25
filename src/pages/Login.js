import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Auth from '../services/Auth'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      redirectToReferrer: false
    }
  }

  login = async (e) => {
    try {
      const formData = new FormData(e.target);
      await Auth.authenticate({
        username: formData.get('username'), 
        password: formData.get('password')
      })
      this.setState({ redirectToReferrer: true });
    } catch (error) {
      console.log("error");
      // this.setState({error: response.originalError.message})      
    }
  };

  render () {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <form className="form-signin" onSubmit={this.login}>
        <h1 className="h3 mb-3 font-weight-normal">Login</h1>
        <label htmlFor="inputUsername" className="sr-only">Username</label>
        <input name="username" type="text" id="inputUsername" className="form-control" placeholder="Username" required autoFocus/>
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
        <button 
          className="btn btn-lg btn-primary btn-block" 
          type="submit"
        >Login</button>
      </form>
    )
  }
}

export default Login