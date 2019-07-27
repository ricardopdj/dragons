import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Auth from '../../services/Auth'
import './Login.css'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      error: null,
      redirectToReferrer: false
    }
  }

  login = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.target)
      await Auth.authenticate({
        username: formData.get('username'), 
        password: formData.get('password')
      })
      this.setState({ redirectToReferrer: true })
    } catch (error) {
      this.setState({error})
    }
  }

  render () {
    let { from } = this.props.location.state || { from: { pathname: '/' } }
    let { redirectToReferrer, error } = this.state

    if (redirectToReferrer) return <Redirect to={from} />
    
    return (
      <div id='login-page'>
        <form className='form-signin' onSubmit={this.login} method='post'>
          <h1 className='h3 mb-3 font-weight-normal text-white'>Dragons Login</h1>
          <label htmlFor='inputUsername' className='sr-only'>Username</label>
          <input defaultValue='username' name='username' type='text' id='inputUsername' className='form-control' placeholder='Username' required autoFocus/>
          <label htmlFor='inputPassword' className='sr-only'>Password</label>
          <input defaultValue='password' name='password' type='password' id='inputPassword' className='form-control' placeholder='Password' required/>
          <button 
            className='btn btn-lg btn-primary btn-block' 
            type='submit'
          >Login</button>
          { error && <div className='form-text text-danger'>{error.message}</div>}
        </form>
      </div>
    )
  }
}

export default Login