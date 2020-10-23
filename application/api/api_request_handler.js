import Auth from '@aws-amplify/auth';
import Lambda from 'aws-sdk/clients/lambda'; // npm install aws-sdk

Auth.currentCredentials()
  .then(credentials => {
    const lambda = new Lambda({
      credentials: Auth.essentialCredentials(credentials)
    });
    return lambda.invoke({
      FunctionName: 'shopify-api-handler',
      Payload: JSON.stringify({ hello: world }),
    });
  })
