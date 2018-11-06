import React from 'react';
import { Nav, Button } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';
import MyDropdown from './MyDropdown.js'
import { API } from 'aws-amplify';

const style = StyleSheet.create({

    authButtons3D: {
        position: 'relative',
        display: 'inline-block',
        left: '525px',
        width: '80px',
        height: '30px',
        margin: '10px',
        cursor: 'pointer',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        textDecoration: 'none',
        backgroundColor: '#1E90FF',
        boxShadow: '0 7px #BBB',
        outline: '0',
        fontSize: '15px',
    
        ':active': {
          backgroundColor: '#0066CC', 
          boxShadow: '0 4px #999', 
          transform: 'translateY(4px)'
        },
      },
})

//Determines whether to render the sign in and sign up buttons or
//display a dropdown for managing a user's profile
export default class RightNav extends React.Component {
    
  constructor(props) {
    super(props)
    this.state = {loggedIn: false}

    this.handleSession = this.handleSession.bind(this);
  } 

  //Logs the user in or out depending on whether he has signed in successfully 
  //or pressed the log out button
  handleSession() {
    this.setState({loggedIn: !this.state.loggedIn});
  }

  //Displays a dropdown providing a number of features after the user authorisation
  //process is complete
  showDropdown = async event => {
    //event.preventDefault();
  
    let names;
    try {
      names = await this.authenticateUser();
    } 
    catch (err) {
      alert(err);
    }
  
    return names;
  }
  
  authenticateUser() {
    return API.get("users", "/profile");
  }
  
  render () {
    let rightNav;

    if (!this.state.loggedIn) {

      rightNav =  
        <Nav justified>       
          <a href="https://auth.projectland.ga/login?response_type=code&client_id=228uq4urbevfa4jmgm6an45pl0&redirect_uri=https://www.projectland.ga" alt="Amazon Cognito authentication page">
            <Button className={css(style.authButtons3D)} onClick={{/*this.showDropdown}*/}}>Sign in</Button>   
          </a>
          <a href="https://auth.projectland.ga/signup?response_type=code&client_id=228uq4urbevfa4jmgm6an45pl0&redirect_uri=https://www.projectland.ga" alt="Amazon Cognito authentication page">
            <Button className={css(style.authButtons3D)}>Sign up</Button>   
          </a>
        </Nav>; 
    }
    else {
      rightNav = <Nav justified>
                   <MyDropdown name="Radoslav" surname="Todorov" handler={this.handleSession} /> 
                 </Nav>
    }

      return rightNav;
    }    
}