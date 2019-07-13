import React from "react";

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
        })
        .catch(error => console.error(error));
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
        <button
          href="#"
          className="pagination-previous"
          title="This is the first page"
          disabled
        >
          Previous
        </button>
        <button className="pagination-next">Next page</button>
        <ul className="pagination-list">
          <li>
            <button
              href="#"
              className="pagination-link is-current"
              aria-label="Page 1"
              aria-current="page"
            >
              1
            </button>
          </li>
          <li>
            <button href="#" className="pagination-link" aria-label="Goto page 2">
              2
            </button>
          </li>
          <li>
            <button href="#" className="pagination-link" aria-label="Goto page 3">
              3
            </button>
          </li>
        </ul>
      </nav>
    );
  }