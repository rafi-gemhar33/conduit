import React from "react";
import { Route, Switch } from "react-router-dom";
import NewArticle from "./NewPost";
import EditUser from "./EditUser";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { Header } from "./Header";
import { HomePage } from "./HomePage";
import Article from "./Article";
import Profile from "./Profile";

 export function BaseLayout() {
  return (
    <React.Fragment>
      <Header />
      {/* <Route path="/" component={Header} /> */}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <ProtectedRoute path="/newArticle" component={NewArticle} />
        <ProtectedRoute path="/editUser" component={EditUser} />
        <ProtectedRoute path="/profile" component={Profile} />
        <Route path="/article" component={Article} />
      </Switch>
    </React.Fragment>
  );
}