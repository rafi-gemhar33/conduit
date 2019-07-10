import React from 'react';
import { Link } from "react-router-dom";

import postData from '../postData';
import auth from './auth';


export default class LoginPage extends React.Component {
    constructor() {
      super();
      this.state = {
        email: "",
        password: ""
      }
    }
    
    changeEmail = (ev) => {
      this.setState({email: ev.target.value});
    }
  
    changePassword = (ev) => {
      this.setState({password: ev.target.value});
    }
  
    submitForm = () => {
  
      const {password, email} = this.state
        const userData = {
              user: {
                email,
                password
              }
            }
  
      postData('https://conduit.productionready.io/api/users/login', userData)
      .then(userData => {
        console.log(userData);
        localStorage.setItem('currentUser', JSON.stringify({ token: userData.user.token }))
      })
      .then(data => {
        if(auth.isLogged()) {
         this.props.history.push("/")
        }
      })
      .catch(error => console.error(error));
  
    }
  
    render() {
      return(
      <div className="base column is-three-fifths is-offset-one-fifth">
          <div className ="sign-header">
            <h1 className = "subtitle is-1 ">Sign In</h1>
            <Link className="subtitle green-text" to='/register'>Need an account?</Link>
          </div>
        
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input is-large" type="email" placeholder="Email" onChange={this.changeEmail} value={this.state.email}/>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input is-large" type="password" placeholder="Password" onChange={this.changePassword} value={this.state.password}/>
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-success is-large" onClick={this.submitForm}>
              Sign In
            </button>
          </p>
        </div>
      </div>
      )
    }
  }