import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App.js';
import Home from './containers/Home.js';
import Profile from './containers/Profile.js';
import SearchProjects from './containers/SearchProjects.js';
import UserProjects from './containers/UserProjects.js';
import PageNotFound from './containers/PageNotFound.js';

//Serve internal page requests via React router
export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/search_projects" exact component={SearchProjects} />
    <Route path="/my_profile" exact component={Profile} />
    <Route path="/my_projects" exact component={UserProjects} />
    <Route component={PageNotFound} />
  </Switch>;
