import React from "react";
import { Link, NavLink } from "react-router-dom";
import auth from "./Views/auth";

export function Header() {
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
            <NavLink
              exact
              className="navbar-item"
              to="/"
              activeClassName="active__nav"
            >
              Home
            </NavLink>
            {isLogged ? (
              <>
                <NavLink
                  exact
                  className="navbar-item"
                  to="/newArticle"
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
                  to="/register"
                  activeClassName="active__nav"
                >
                  Account
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
  );
}
