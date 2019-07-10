import React from 'react';

export default function EditUser() {
  return (
    <div className="column is-10 is-offset-1">
      <div className="field">
          <div className="control">
          <input className="input is-medium" type="text" placeholder="URL of profile picture" />
          </div>
      </div>
    
      <div className="field">
        <div className="control">
          <input className="input is-medium" type="text" placeholder="Username" />
        </div>
      </div>
      
      <div className="field">
        <div className="control">
          <textarea className="textarea is-medium" placeholder="Short bio about you" rows="5"></textarea>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input className="input is-medium" type="email" placeholder="Email" />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input className="input is-medium" type="text" placeholder="New password" />
        </div>
      </div>
      
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-success is-medium">Update Settings</button>
        </div>
      </div>

      <hr />
      <div className="field">
        <div className="control">
          <button className="button is-danger is-outlined is-medium">Click here to Logout</button>
        </div>
      </div>
    </div>
  )
}