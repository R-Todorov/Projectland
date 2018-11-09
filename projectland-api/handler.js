import awsConfig from './aws-config.js';
import Amplify, { Auth, Hub } from 'aws-amplify';

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
  }
});  

exports.clearCachedSession = async (event, context, callback) => {
  Auth.signOut();
  context.done(null, event);
};

exports.generateLoginEvent = async (event, context, callback) => {
  Hub.dispatch('auth', { event: 'signIn', data: "DUMMY"}, 'Auth');
  context.done(null, event);
};
