import React, { Component } from "react";
import {Button} from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';

const style = StyleSheet.create({

    buttons: {
      fontSize: '15px',
      margin: '20px',
      backgroundColor: "#007bff",

      ':hover, :active': {
        backgroundColor: '#0066CC', 
      }
    },

    mainDiv: {
      textAlign: 'center',
      backgroundColor: 'white'
    },

    optionsDiv: {
      display: 'inline-block',
      marginTop: '150px',
      backgroundColor: 'white'
    }  

})

export default class Home extends Component {
  render() {
    return (
      <div className={css(style.mainDiv)}>
        <div className={css(style.optionsDiv)}>
          <h1>You aren't contributing to any projects  currently</h1>
          <Button className={css(style.buttons)} color="primary">Create a new project</Button>
          <Button className={css(style.buttons)} color="primary">Join an existing project</Button>
        </div>  
      </div>
    );
  }
}