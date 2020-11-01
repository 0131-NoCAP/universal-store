import Auth from '@aws-amplify/auth';
import Lambda from 'aws-sdk/clients/lambda'; // npm install aws-sdk

const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-2'});

async function callAPI(payload) {
  var params = {
    FunctionName: 'shopify-api-handler',
    Payload: JSON.stringify(payload),
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

export async function createCheckout(store_url, items) {
  const payload = { 'api_name': 'createCheckout', 'store_url': store_url, 'items': items }
  const response = await callAPI(payload);
  console.log(response);
}

export async function getStoreNames() {
  const payload = { 'api_name': 'getStoreNames' }
  const response = await callAPI(payload);
  return response.get('body');
}

export async function getItemFromBarcode(barcode, store_url) {
  const payload = { 'api_name': 'getItemFromBarcode', 'store_url': store_url, 'barcode': barcode }
  console.log(payload)
  const response = await callAPI(payload);
  const responseJson = JSON.parse(response['Payload'])
  console.log(responseJson);
  return responseJson['body'];
}