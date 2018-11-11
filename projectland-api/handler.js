import awsConfig from './aws-config.js';
import Amplify, { Auth, Hub } from 'aws-amplify';
import AWS from "aws-sdk";

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

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.clearCachedSession = async (event, context, callback) => {
  Auth.signOut();
  context.done(null, event);
};

exports.updateUserDetails = (event, context, callback) => {

  const details = event.body;

  const params = {
    TableName: "users",
    Item: {
      username: details.username,
      name: details.name,
      surname: details.surname,
      role: details.role,
      email: details.email,
      number: details.number,
      gender: details.gender,
      join_date: details.join_date
    }
  };

  dynamoDb.put(params, (error, details) => {

    // Set response headers to enable CORS (Cross-Origin Resource Sharing)
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    };

    // Return status code 500 on error
    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false })
      };
      callback(error, response);
      return;
    }

    // Return status code 200 and the newly created item
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item)
    };
    callback(null, response);
  });
}
