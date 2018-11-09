import React from 'react';
import { Nav, NavItem, Button, Alert } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import MyDropdown from './MyDropdown.js'
import Amplify, { Auth, Hub } from 'aws-amplify'; 
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

const style = StyleSheet.create({

    authButtons3D: {
        position: 'relative',
        display: 'inline-block',
        left: '515px',
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

      blueBackground: {
        backgroundColor: 'red'
      }
})

//Determines whether to render the sign in and sign up buttons or
//display a dropdown for managing a user's profile
export default class RightNav extends React.Component {
    
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      currUser: {}
    }

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.validateSession = this.validateSession.bind(this);
    this.getUserNames = this.getUserNames.bind(this);
    this.generateTestEvent = this.generateTestEvent.bind(this);
    Hub.listen('auth', this, 'AuthListener');
  }

  signIn() {
    this.props.handleSignIn();
  }

  signUp() {
    window.location  = 'https://auth.projectland.ga/signup?response_type=code'
                       +'&client_id=228uq4urbevfa4jmgm6an45pl0'
                       +'&redirect_uri=https://www.projectland.ga';
  }

  signOut() {
    Auth.signOut();
    this.setState({loggedIn: false});
  }

  generateTestEvent() {
    Hub.dispatch('auth', { event: 'signIn', data: "NONE"}, 'Auth');
  }

  onHubCapsule(capsule) {

    switch (capsule.payload.event) {
    
      case 'signIn':
          alert('user signed in');
          window.location.reload();
          break;
      case 'signUp':
          alert('user signed up');
          break;
      case 'signOut':
          alert('user signed out');
          break;
      case 'signIn_failure':
          alert('user sign in failed');
          break;
      case 'configured':
          alert('the Auth module is configured');
          break;
      default:  
    } 
  }

  getUserNames() {
    let userAttrs = "NONE";
    
    this.state.user.getUserAttributes(function(err, result) {
      if (err) {
        alert(err);
        return;
      }
      alert(result);
      userAttrs = result;
    });

    return userAttrs;
  }

   validateSession() {

    let userPoolData = {
      UserPoolId: 'eu-west-2_CQvHMh1AX',
      ClientId: '228uq4urbevfa4jmgm6an45pl0'
    };

    let userPool = new AmazonCognitoIdentity.CognitoUserPool(userPoolData); 
    let user = userPool.getCurrentUser();
    
    let valid = false;

    if (user != null) {
      user.getSession(function(err, session) {
        if (err) {
          alert(err);
          return;
        }
        valid = session.isValid();
        this.setState({currUser: user});
      });
    }

    return valid;
   } 

  //Conditionally render a Nav component with two authentication buttons
  //or a dropdown menu depending on whether the user is logged in
  render () {
    let rightNav;
    let isUserLogged = this.validateSession();

    if (!isUserLogged) {
      rightNav =
      <Nav justified>
        <Button className={css(style.authButtons3D)} onClick={this.signIn}>Sign in</Button>
        <Button className={css(style.authButtons3D)} onClick={this.signUp}>Sign up</Button>{/*() => window.location  = 'https://auth.projectland.ga/signup?response_type=code&client_id=228uq4urbevfa4jmgm6an45pl0&redirect_uri=https://www.projectland.ga'}>Sign up</Button> */} 
      </Nav>;
    }
    else {

      rightNav = <Nav justified>
                   <MyDropdown names={this.getUserNames} logout={this.signOut} /> 
                 </Nav>
    }
      return rightNav;
  }    
}