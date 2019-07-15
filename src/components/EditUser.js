import React from 'react';

import customFetch from '../customFetch';
import auth from './auth';

// import {UserContext} from '../App';

export default class EditUser extends React.Component {
  constructor(){
    super();
    this.state = {
      email: "",
      username: "",
      bio: "",
      image: "",
      password:"",
      message: ""
    }
  }
  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const email = userData.user.email || "";
    const username =userData.user.username || "";
    const bio = userData.user.bio || "";
    const image = userData.user.image || "";

    this.setState({email, username, bio, image})
  }
  handleInput = (ev) => {
    this.setState({message: ""});
    this.setState({[ev.target.name]: ev.target.value});
  }

  logout = () => {
    localStorage.clear();
    this.props.history.push("/");
  }
  updateProfile = () => {
    const {email, username}= this.state; 

    if(email.length>0 && username.length>0) {
      let user = {};
      for(let i in this.state){
        if(this.state[i].length>0) {
          user[i] = this.state[i]
        }
      }
  
      const userData = {
        user: user
      }
      
      const token = `Token ${auth.getToken()}`
  
      const upadteUserAPI = "https://conduit.productionready.io/api/user";
  
      customFetch(upadteUserAPI, userData, token, "PUT")
      .then(userData => {

        if(!userData.errors){ 
          localStorage.setItem('currentUser', JSON.stringify({ token: userData.user.token }));
          localStorage.setItem('userData', JSON.stringify(userData));         
          this.props.history.push("/")
        } else {
          this.setState({ message: "email or password is invalid"});
        }
      })
      .catch(error => console.error(error));
    } else {
      this.setState({ message: "Email or username cannot be empty"});
    }
  }


  render() {
    const {email, username, bio, image, password, message}= this.state;
    return (
      
      <div className="column is-8 is-offset-2">
  
        <div className="column is-8 is-offset-2">
          <div className ="sign-header">
            <h1 className = "subtitle is-1 ">Edit Profile</h1>
          </div>
          <div className="field">
              <div className="control">
              <input name="image" className="input " type="text" placeholder="URL of profile picture" value={image} onChange={this.handleInput}/>
              </div>
          </div>
        
          <div className="field">
            <div className="control">
              <input name="username" className="input " type="text" placeholder="Username" value={username} onChange={this.handleInput}/>
            </div>
          </div>
          
          <div className="field">
            <div className="control">
              <textarea name="bio" className="textarea " placeholder="Short bio about you" rows="5" value={bio} onChange={this.handleInput}></textarea>
            </div>
          </div>
  
          <div className="field">
            <div className="control">
              <input name="email" className="input " type="email" placeholder="Email" value={email} onChange={this.handleInput}/>
            </div>
          </div>
  
          <div className="field">
            <div className="control">
              <input name="password" className="input " type="text" placeholder="New password" value={password} onChange={this.handleInput}/>
            </div>
            <p className="help is-danger">{message}</p>
          </div>
          
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-success " onClick={this.updateProfile}>Update Settings</button>
            </div>
          </div>
  
          <hr />
          <div className="field">
            <div className="control">
              <button className="button is-danger is-outlined" onClick={this.logout}>Click here to Logout</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}