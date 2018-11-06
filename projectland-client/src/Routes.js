import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home.js';
import Profile from './containers/Profile.js';
import SearchProjects from './containers/SearchProjects.js'

//Use react router to server internal page requests
export default () =>
  <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/profile" exact component={Profile}/>
    <Route path="/search_projects" exact component={SearchProjects}/>
  </Switch>;
