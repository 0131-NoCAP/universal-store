import json, re, requests, os, flask
from secret_manager import get_secret

def lambda_handler(event, context):
    bad_request = {
        'statusCode': 400,
        'body': json.dumps('Bad Request')
    }

    print(event.get('queryStringParameters'))

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
    # need to check nonce (state) with server generated install url
    # need to check if hmac is valid
    # need to check hostname parameter is valid
    valid_hostname = re.compile(r'(https\:\/\/|http\:\/\/)?[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com[\/]?')
    if not re.match(valid_hostname, shop):
        return bad_request
    print(shop, code)
    output = post_perm_access_token(shop, code)
    print('all good???')
    return output

def post_perm_access_token(shop: str, code: str):
    url = 'https://' + shop + '/admin/oauth/access_token'
    shopify_keys = get_secret('shopify_keys')
    if not shopify_keys:
        print('key retrieval failed')
        return 0
    client_id = shopify_keys.get('shopify_client_id')
    client_secret = shopify_keys.get('shopify_client_secret')
    data = {'client_id': client_id, 'client_secret': client_secret, 'code': code}
    print(shopify_keys)
    try:
        output = requests.post(url, data=data)
    except request.exceptions.RequestException as e:
        print(e)
    return flask.jsonify(output)
