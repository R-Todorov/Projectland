import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App.js';
import Home from './containers/Home.js';
import Profile from './containers/Profile.js';
import SearchProjects from './containers/SearchProjects.js';
import UserProjects from './containers/UserProjects.js';
import PageNotFound from './containers/PageNotFound.js';
import CreateProject from './containers/CreateProject.js';

//Serve internal page requests via React router
export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/profile/:username" exact component={Profile} />
    <Route path="/projects" exact component={UserProjects} />
    <Route path="/projects/create" exact component={CreateProject} />
    <Route path="/projects/search" exact component={SearchProjects} />
    <Route component={PageNotFound} />
  </Switch>;
