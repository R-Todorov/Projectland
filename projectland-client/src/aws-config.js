//JSON configuration description of the Amazon Cognito, S3 and API Gateway resources
export default {
  cognito: {
    REGION: 'eu-west-2',
    USER_POOL_ID: 'eu-west-2_CQvHMh1AX',
    APP_CLIENT_ID: '228uq4urbevfa4jmgm6an45pl0',
    IDENTITY_POOL_ID: 'eu-west-2:b4750d8f-920f-4787-8ab2-30d9306e518f'
  }, 
  s3: {
    REGION: 'eu-west-2',
    BUCKET: 'www.projectland'
  },
  apiGateway: {
    REGION: 'eu-west-2',
    URL: 'https://of6mw3disk.execute-api.eu-west-2.amazonaws.com/prod'
  }
};
