import React from "react";
import { Route, Switch } from "react-router-dom";
import NewArticle from "./Views/newPost";
import EditUser from "./Views/editUser";
import RegisterPage from "./Views/registerPage";
import LoginPage from "./Views/loginPage";
import { ProtectedRoute } from "./Views/protectedRoute";
import { Header } from "./Header";
import { HomePage } from "./HomePage";

export function BaseLayout() {
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
