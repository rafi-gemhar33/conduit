import React from "react";
import { Link, NavLink, withRouter} from "react-router-dom";
import auth from "./auth";

class Header extends React.Component {

  render() {
      
      const userData = JSON.parse(localStorage.getItem("userData"));
      const user = userData && userData.user ; 

    return (
      <header className="base column is-8 is-offset-2">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <h1 className="title is-3 isPrimary">
              <Link className="navbar-item green-text" to="/">
                conduit
              </Link>
            </h1>
          </div>
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              <NavLink
                exact
                className="navbar-item"
                to="/"
                activeClassName="active__nav"
              >
                Home
              </NavLink>
              {auth.isLogged() ? (
                <>
                  <NavLink
                    exact
                    className="navbar-item"
                    to={{
                      pathname: '/newArticle',
                      state: { }
                    }}
                    activeClassName="active__nav"
                  >
                    New Post
                  </NavLink>
                  <NavLink
                    exact
                    className="navbar-item"
                    to="/editUser"
                    activeClassName="active__nav"
                  >
                    Settings
                  </NavLink>
                  <NavLink
                    exact
                    className="navbar-item"
                    to={{
                      pathname: "/profile",
                      state: {
                        username: user.username
                      }
                    }}
                    activeClassName="active__nav"
                  >
                    {user.username}
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    exact
                    className="navbar-item"
                    to="/login"
                    activeClassName="active__nav"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    exact
                    className="navbar-item"
                    to="/register"
                    activeClassName="active__nav"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default withRouter(Header)