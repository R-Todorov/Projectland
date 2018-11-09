import React, { Component } from 'react';
import NavMenu from './components/NavMenu.js';
import { Link } from 'react-router-dom';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { withOAuth } from 'aws-amplify-react';
import awsConfig from './aws-config';
import './App.css';


//OAuth configuration necessary for initiating 
//the user authentication process
const OAuth = {
    domain : 'auth.projectland.ga', 
    scope : ['phone', 'email', 'profile', 'openid','aws.cognito.signin.user.admin'], 
    redirectSignIn :'https://www.projectland.ga', 
    redirectSignOut : 'https://www.projectland.ga',
    responseType: 'code'
};


Amplify.configure({

  Auth: {
    region: awsConfig.cognito.REGION,
    userPoolId: awsConfig.cognito.USER_POOL_ID,
    identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: awsConfig.cognito.APP_CLIENT_ID,
    oauth: OAuth
  },

  Storage: {
    region: awsConfig.s3.REGION,
    bucket: awsConfig.s3.BUCKET,
    identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID
  },

  API: {
  	endpoints: [ 
  	  {
        name: "users", //API name
        endpoint: awsConfig.apiGateway.URL,
        region: awsConfig.apiGateway.REGION
      },
    ]
  }
});

Hub.dispatch('auth', { event: 'signIn'}, 'Auth');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {initial: 0};
  }

  render() {
    return (
      <NavMenu handleSignIn={this.props.OAuthSignIn} />
    );
  }  
}

export default withOAuth(App);