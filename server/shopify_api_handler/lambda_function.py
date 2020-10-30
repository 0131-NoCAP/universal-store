import json, requests, boto3
from botocore.exceptions import ClientError

def lambda_handler(event, context):
    # TODO implement
    response = json.dumps(get_merchant_access_key('andrew-and-david-bridal-services.myshopify.com'))
    # if event.get(api_name) == 'getCheckout':
    #     response = get_checkout()
    return {
        'statusCode': 200,
        'body': response
    }

def get_merchant_access_key(store_url):

    dynamodb = boto3.resource('dynamodb', region_name='us-east-2')
    table = dynamodb.Table('merchant_access_token-dev')
    try:
        response = table.get_item(Key={'store_url':store_url})
        key = response.get('Item').get('access_token')
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        return key

def get_store_names():
    dynamodb = boto3.resource('dynamodb', region_name='us-east-2')
    table = dynamodb.Table('merchant_access_token-dev')
    response = table.scan(AttributesToGet=['store_url', 'store_name'])
    data = response['Items']
    while 'LastEvaluatedKey' in response:
        response = table.scan(AttributesToGet=['store_url', 'store_name'])
        data.extend(response['Items'])
    return data
