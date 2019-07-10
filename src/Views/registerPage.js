import React from 'react';
import { Link } from "react-router-dom";

import postData from '../postData';

export default class RegisterPage extends React.Component {
    constructor() {
      super();
      this.state = {
        username: "",
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
  
    changeUsername = (ev) => {
      this.setState({username: ev.target.value});
    }
  
    submitForm = () => {
  
      const {username, email, password} = this.state
        const userData = {
              user: {
                username,
                email,
                password
              }
            }
         
      postData('https://conduit.productionready.io/api/users', userData)
      .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
  
    }
  
    
  
  
    render() {
  
      return(
        <div className="base column is-three-fifths is-offset-one-fifth">
          <div className ="sign-header">
            <h1 className = "subtitle is-1 ">Sign Up</h1>
            <Link className="subtitle green-text" to='/login'>Have an account?</Link>
          </div>
  
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input className="input is-large" type="text" placeholder="Username" onChange={this.changeUsername} value={this.state.username} />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input className="input is-large" type="email" placeholder="Email" onChange={this.changeEmail} value={this.state.email} />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input className="input is-large" type="password" placeholder="Password"onChange={this.changePassword}  value={this.state.password}  />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
            <p className="control">
              <button className="button is-success is-large " type="submit" onClick={this.submitForm}>
                Sign Up
              </button>
            </p>
          </div>
        </div>
        )
    }
  }