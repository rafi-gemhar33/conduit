import React from "react";

import "./App.css";
import { BaseLayout } from "./BaseLayout";

class ShowArticles extends React.Component {
  // return()
  constructor() {
    super();
    this.state = {
      articles: [],
      isLoading: true
    };
  }

  render() {
    return (
      <>
        {this.state.articles.map((article, i) => {
          return (
            <article className="media" key={i}>
              <figure className="media-left">
                <p className="image is-64x64">
                  <img className="is-rounded" src={article.author.image} />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <div>
                    <span>
                      <a href="#" className="green-text">
                        {article.author.username}
                      </a>
                    </span>

                    <a className="article-link">
                      <p>
                        <em>{Date(article.updatedAt).slice(0, 15)}</em>
                      </p>
                      <h4 className="article-title">{article.title}</h4>
                      {article.description}
                      <p>Read More...</p>
                    </a>
                  </div>
                </div>
              </div>
              <div className="media-right">
                <button className="button is-success is-outlined">
                  <span className="icon is-small">
                    <i className="fas fa-heart" />
                  </span>
                  <span>{article.favoritesCount}</span>
                </button>
              </div>
            </article>
          );
        })}
      </>
    );
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("https://conduit.productionready.io/api/articles?limit=10&offset=0")
      .then(res => res.json())
      .then(data => {
        let newArr = this.state.articles.concat(data.articles);
        this.setState({ articles: newArr, isLoading: false });
      });
  }
}

class ShowTags extends React.Component {
  state = {
    tags: []
  };
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

  componentDidMount() {
    fetch("https://conduit.productionready.io/api/tags")
      .then(res => res.json())
      .then(data => {
        let newArr = data.tags;
        this.setState({ tags: newArr });
      });
  }
}

function ShowTab() {
  return (
    <div className="tabs is-medium">
      <ul>
        <li className="is-active">
          <a href="#">Gloabal feed</a>
        </li>
        <li>
          <a href="#">Your feed</a>
        </li>
        <li>
          <a href="#">Recomended feed</a>
        </li>
      </ul>
    </div>
  );
}

function Pagination() {
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
export class HomePage extends React.Component {
  render() {
    return (
      <>
        <section className="hero is-small is-success is-bold">
          <div className="hero-body">
            <div className="container hero-container">
              <h1 className="title is-1"> conduit </h1>
              <h2 className="subtitle is-4">
                {" "}
                A place to share your knowledge.
              </h2>
            </div>
          </div>
        </section>
        <div className="base column is-8 is-offset-2">
          <section className="main-container">
            <div className="column is-three-quarters">
              <ShowTab />
              <ShowArticles />
            </div>
            <div>
              <ShowTags />
            </div>
          </section>
          <footer className="column is-three-quarters">
            <Pagination />
          </footer>
        </div>
      </>
    );
  }
}

const App = () => (
  <div className="App">
    <header className="App-header">
      <BaseLayout />
    </header>
  </div>
);

export default App;
