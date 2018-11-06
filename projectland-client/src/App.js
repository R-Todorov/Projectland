import React, { Component } from 'react';
import NavMenu from './components/NavMenu.js';
import { Link } from 'react-router-dom';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="">
        <NavMenu /> 
  	  </div>
    );
  }
}

export default App;