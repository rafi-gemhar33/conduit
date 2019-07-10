import React from "react";
import { Route, Link, Switch } from "react-router-dom";

import NewArticle from "./Views/newPost";
import EditUser from "./Views/editUser";
import RegisterPage from "./Views/registerPage";
import LoginPage from "./Views/loginPage";
import { ProtectedRoute } from "./Views/protectedRoute";
import auth from "./Views/auth";

import "./App.css";

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
class HomePage extends React.Component {
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

function Header() {
  let isLogged = auth.isLogged();
  return (
    <header className="base column is-8 is-offset-2">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <h1 className="title is-3 isPrimary">
            <Link className="navbar-item green-text" to="/">
              Conduit
            </Link>
          </h1>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <Link className="navbar-item" to="/">
              Home
            </Link>
            {isLogged ? (
              <>
                <Link className="navbar-item" to="/newArticle">
                  New Post
                </Link>
                <Link className="navbar-item" to="/editUser">
                  Settings
                </Link>
                <Link className="navbar-item" to="/register">
                  Account
                </Link>
              </>
            ) : (
              <>
                <Link className="navbar-item" to="/login">
                  Sign In
                </Link>
                <Link className="navbar-item" to="/register">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

function BaseLayout() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <ProtectedRoute path="/newArticle" component={NewArticle} />
        <ProtectedRoute path="/editUser" component={EditUser} />
      </Switch>
    </React.Fragment>
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
