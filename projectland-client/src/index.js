import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Amplify from 'aws-amplify';
import awsConfig from './aws_config';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: awsConfig.cognito.REGION,
    userPoolId: awsConfig.cognito.USER_POOL_ID,
    identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: awsConfig.cognito.APP_CLIENT_ID
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

// Render the App component which contains all custom-made and reactstrap provided components
// and display it in the browser. The same component is enclosed in a Router tag which is used
// to serve requests for display different sections of the application.
ReactDOM.render(
  <Router>
  	<App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
