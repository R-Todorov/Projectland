import React, { Component } from 'react';
import awsConfig from './aws-config';
import AWS from 'aws-sdk';
import Amplify from 'aws-amplify';
import { withOAuth } from 'aws-amplify-react';
import './App.css';
import NavMenu from './components/NavMenu.js';

//OAuth configuration necessary for initiating 
//the user authentication process
const OAuth = {
    domain : 'auth.projectland.ga', 
    scope : ['phone', 'email', 'profile', 'openid','aws.cognito.signin.user.admin'], 
    redirectSignIn :'https://www.projectland.ga', 
    redirectSignOut : 'https://www.projectland.ga',
    responseType: 'code'
};

//Amplify service configuration
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
        name: awsConfig.apiGateway.NAME,
        endpoint: awsConfig.apiGateway.URL,
        region: awsConfig.apiGateway.REGION,
        service: "lambda"
      }
    ]
  }
});

//Entry point of the SPA
class App extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <NavMenu handleSignIn={this.props.OAuthSignIn} />
     </div>
    );
  }  
}

export default withOAuth(App);