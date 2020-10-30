import Auth from '@aws-amplify/auth';
import Lambda from 'aws-sdk/clients/lambda'; // npm install aws-sdk

const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-2'});

async function callAPI(api_name, store_url) {
  var params = {
    FunctionName: 'shopify-api-handler',
    Payload: JSON.stringify({ 'api_name': api_name, 'store_url': store_url }),
  }
  return Auth.currentCredentials()
    .then(async (credentials) => {
      const lambda = new Lambda({
        credentials: Auth.essentialCredentials(credentials)
      });
      try {
        const response = await lambda.invoke(params).promise();
        return response;
      }
      catch (ex) {
        console.error(ex);
      }
    })
}

export async function createCheckout(store_url) {
  response = await callAPI("createCheckout", store_url);
  console.log(response);
}

export async function getStoreNames() {
  response = await callAPI("getStoreNames", None);
  return response;
}
