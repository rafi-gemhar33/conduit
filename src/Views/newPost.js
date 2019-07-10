import React from 'react';

export default function NewArticle() {
  return (
    <div className="column is-10 is-offset-1">
      <div className="field">
          <div className="control">
          <input className="input is-medium" type="text" placeholder="Article Title" />
          </div>
      </div>
    
      <div className="field">

        <div className="control">
          <input className="input is-medium" type="text" placeholder="What's the article about?" />
        </div>
      </div>
      
      <div className="field">
        <div className="control">
          <textarea className="textarea is-medium" placeholder="Write your article (in markdown)" rows="5"></textarea>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <input className="input is-medium" type="text" placeholder="Enter Tags" />
        </div>
      </div>

      
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-success is-medium">Submit</button>
        </div>

      </div>
    </div>
   )
}