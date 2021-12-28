import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//component
import SignUp from "./components/auth/signUp";
import BeforeSignUp from "./components/auth/signUp/signUp";
import Login from "./components/auth/login/index";
import Navigation from "./components/navigation/index";
import Dashboard from "./components/dashboard/index";
import Members from "./components/members/members";
import Service from "./components/Service/Service";
import ViewService from "./components/viewService/viewService";

import Profile from "./components/profile/profile";

import User from "./components/profile/normal_User";

import Search from "./components/search/search";

const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/register" component={BeforeSignUp} />
      <Route exact path="/register/:id" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/allMembers" component={Members} />
      <Route exact path="/Services" component={Service} />
      <Route exact path="/Service" component={ViewService} />

      <Route exact path="/user" component={User} />

      <Route exact path="/search" component={Search} />
      <Route exact path="/profile" component={Profile} />
    </div>
  );
};

export default App;
