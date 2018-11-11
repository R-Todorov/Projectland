import React from 'react';
import { Nav, Button} from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router-dom';
import AWS from 'aws-sdk';
import Amplify, { Auth, Hub } from 'aws-amplify'; 
import awsConfig from '../aws-config';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import MyDropdown from './MyDropdown.js'

const myStyles = StyleSheet.create({

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

const USER_POOL_DATA = {
  UserPoolId: awsConfig.cognito.USER_POOL_ID,
  ClientId: awsConfig.cognito.APP_CLIENT_ID
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(USER_POOL_DATA); 

AWS.config.region = awsConfig.cognito.REGION;

//AWS configuration for token retrieval and token exchange
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: awsConfig.cognito.IDENTITY_POOL_ID,
  Logins: {
    'accounts.google.com': 'GOOGLETOKEN',
    'graph.facebook.com': 'FBTOKEN',
    'www.amazon.com': 'AMAZONTOKEN',
  }
});

//Determines whether to render the sign in and sign up buttons or
//display a dropdown for managing a user's profile
export default class RightNav extends React.Component {
    
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      refreshWindow: false
    }

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.checkSessionValidity = this.checkSessionValidity.bind(this);
    this.establishSession = this.establishSession.bind(this);
    this.formGreetingString = this.formGreetingString.bind(this);
    Hub.listen('auth', this, 'AuthListener');
  }

  signIn() {
    this.props.handleSignIn().then(window.location.reload);
  }

  signUp() {
    window.location  = 'https://auth.projectland.ga/signup?response_type=code'
                       +'&client_id=228uq4urbevfa4jmgm6an45pl0'
                       +'&redirect_uri=https://www.projectland.ga';
  }

  //Load Cognito signup page
  signOut() {
    Auth.signOut();
    this.setState({loggedIn: false});
  }

  onHubCapsule(capsule) {

    switch (capsule.payload.event) {
    
      case 'signIn':
          window.location.reload()
          break;
      case 'signOut':
          break;
      default:  
    } 
  }

  //Establishes a new user session if a user has signed in successfully
  checkSessionValidity() { 

    let user = userPool.getCurrentUser();
    let valid = false;

    if (user != null) {
      user.getSession(function(err, session) {
        if (err) {
          alert(err);
          return;
        }
        valid = session.isValid();
        console.log("Session validity " + valid);
      });
    }

    if (valid) this.establishSession();
  } 

  establishSession() {
    Auth.currentAuthenticatedUser()
    .then(data => {
        console.log(data);
        this.setState({
          loggedIn: true,
          user: data.username,
          userAttrs: data.attributes
        })
        this.formGreetingString();
      })
    .catch(err => {
        console.error(err);
    });
  }

  formGreetingString() {
    let userAttrs = this.state.userAttrs;
    let names = userAttrs.given_name + " " + userAttrs.family_name;
    this.setState({names: names});
  }

  componentWillMount() {
    this.checkSessionValidity(); 
  }

  //Conditionally render a Nav component with two authentication buttons
  //or a dropdown menu depending on whether the user is logged in
  render () {
    let rightNav;
    if (!this.state.loggedIn) {
      rightNav =
      <Nav justified>
        <Button className={css(myStyles.authButtons3D)} onClick={this.signIn}>Sign in</Button>
        <Button className={css(myStyles.authButtons3D)} onClick={this.signUp}>Sign up</Button>
      </Nav>;
    }
    else {

      rightNav = <Nav justified>
                   <MyDropdown names={this.state.names} logout={this.signOut} /> 
                 </Nav>
    }
      return rightNav;
  }    
}