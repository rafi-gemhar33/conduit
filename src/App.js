import React from "react";

import "./App.css";
import { BaseLayout } from "./BaseLayout";

export class ShowTags extends React.Component {
  state = {
    tags: []
  };
  componentDidMount() {
    fetch("https://conduit.productionready.io/api/tags")
      .then(res => res.json())
      .then(data => {
        let newArr = data.tags;
        this.setState({ tags: newArr });
      });
  }
  render() {
    return (
      <div className="tags box tag-container">
        <div className="tag-title">
          <p>Popular Tags</p>
        </div>
        {this.state.tags.map((tag, i) => (
          <button key={i} className="tag button is-success is-medium">
            {tag}
          </button>
        ))}
      </div>
    );
  }
}

export function Pagination() {
  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <a
        className="pagination-previous"
        title="This is the first page"
        disabled
      >
        Previous
      </a>
      <a className="pagination-next">Next page</a>
      <ul className="pagination-list">
        <li>
          <a
            href="#"
            className="pagination-link is-current"
            aria-label="Page 1"
            aria-current="page"
          >
            1
          </a>
        </li>
        <li>
          <a href="#" className="pagination-link" aria-label="Goto page 2">
            2
          </a>
        </li>
        <li>
          <a href="#" className="pagination-link" aria-label="Goto page 3">
            3
          </a>
        </li>
      </ul>
    </nav>
  );
}
const App = () => (
  <div className="App">
    <header className="App-header">
      <BaseLayout />
    </header>
  </div>
);

export default App;
