import json, re, requests, os, random, hmac, boto3
from secret_manager import get_secret
#test working
def lambda_handler(event, context):
    bad_request = {
        'statusCode': 400,
        'body': json.dumps('Bad Request')
    }

    print(event)

    query_string_parameters = event.get('queryStringParameters')
    if query_string_parameters:
        print('GOT QUERY STRING PARAMS')
        # authorization code
        code = query_string_parameters.get('code')
        # hostname
        shop = query_string_parameters.get('shop')
        # signed by shopify
        hmac = query_string_parameters.get('hmac')
        # nonce
        state = query_string_parameters.get('state')
        timestamp = query_string_parameters.get('timestamp')
    else:
        return bad_request

    if event.get('resource') == '/redirect' and shop:
        return redirect(shop)

    shopify_keys = get_secret('shopify_keys')

    # TODO: need to check nonce (state) with server generated install url
    # TODO: need to check if hmac is valid
    valid_hostname = re.compile(r'(https\:\/\/|http\:\/\/)?[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com[\/]?')
    if not re.match(valid_hostname, shop):
        return bad_request
    print(shop, code)

    api_response = post_perm_access_token(shop, code, shopify_keys).json()
    put_merchant_access_token(shop, api_response.get('access_token'))
    return {
        'statusCode': 200,
        'body': json.dumps('Application is now installed!')
    }

def post_perm_access_token(shop: str, code: str, shopify_keys):
    url = 'https://' + shop + '/admin/oauth/access_token'
    if not shopify_keys:
        print('key retrieval failed')
        return 0
    client_id = shopify_keys.get('shopify_client_id')
    client_secret = shopify_keys.get('shopify_client_secret')
    print(shopify_keys)
    data = {'client_id': client_id, 'client_secret': client_secret, 'code': code}
    try:
        output = requests.post(url, data=data)
    except request.exceptions.RequestException as e:
        print(e)
    return output

def redirect(shop: str):
    shopify_keys = get_secret('shopify_keys')
    if not shopify_keys:
        print('key retrieval failed')
        return 0
    api_key = shopify_keys.get('shopify_client_id')
    redirect_uri = 'https://gozbyp62l6.execute-api.us-east-2.amazonaws.com/prod'
    access_mode = ''
    scopes = 'read_inventory,read_orders,write_orders,read_customers,read_products,read_product_listings,read_checkouts,write_checkouts,unauthenticated_write_checkouts'
    nonce = generate_nonce()
    url = f'https://{shop}/admin/oauth/authorize?client_id={api_key}&scope={scopes}&redirect_uri={redirect_uri}&state={nonce}&grant_options[]={access_mode}'
    request = {
        'statusCode': 302,
        'headers': {'Location': url},
        'body': json.dumps({})
    }
    return request

def put_merchant_access_token(store_url, access_token):
    dynamodb = boto3.client('dynamodb')
    dynamodb.put_item(TableName='merchant_access_token-dev', Item={'store_url': {'S': store_url}, 'access_token': {'S': access_token}})

def generate_nonce(length=8):
    """Generate pseudorandom number."""
    return ''.join([str(random.randint(0, 9)) for i in range(length)])
