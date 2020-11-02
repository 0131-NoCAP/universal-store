import json, requests, boto3
from botocore.exceptions import ClientError
from base64 import b64encode

def lambda_handler(event, context):

    response = 'nothing'
    if event.get('api_name') == 'getStoreNames':
        response = get_store_names()
    elif event.get('api_name') == 'createCheckout':
        store_url = event.get('store_url')
        items = event.get('items')
        response = create_checkout(store_url, items)
    elif event.get('api_name') == 'modifyCheckout':
        store_url = event.get('store_url')
        items = event.get('items')
        checkout_id = event.get('checkout_id')
        response = modify_checkout(store_url, items, checkout_id)
    elif event.get('api_name') == 'getItemFromBarcode':
        store_url = event.get('store_url')
        barcode = event.get('barcode')
        response = get_item_from_barcode(store_url, barcode)
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


def get_storefront_access_key(store_url):

    url = 'https://' + store_url + '/admin/api/2020-10/storefront_access_tokens.json'
    headers = {
        'X-Shopify-Access-Token': get_merchant_access_key(store_url),
        'Content-Type': 'application/json'
    }

    data = {
        "storefront_access_token": {
            "title": "Test"
        }
    }

    r = requests.post(url, json=data, headers=headers)
    storefront_token = r.json()['storefront_access_token']['access_token']
    return storefront_token


def create_checkout(store_url: str, items: list):

    url = 'https://' + store_url + '/api/2020-10/graphql.json'
    storefront_token = get_storefront_access_key(store_url)
    headers = {
        'X-Shopify-Storefront-Access-Token': storefront_token,
        'Content-Type': 'application/graphql'
    }

    line_items = '[{ '
    for item in items:
        line_items += 'variantId: "{}", quantity: {}'.format(item['id'], item['quantity'])
    line_items += '}]'

    mutation = """mutation {
        checkoutCreate(input: {
            lineItems: %s
        }) {
            userErrors{
                field
                message
            }
            checkout {
                id
                webUrl
                lineItems(first:2) {
                    edges {
                        node {
                            id
                            title
                            quantity
                        }
                    }
                }
            }
        }
    }""" % line_items

    r = requests.post(url, data=mutation, headers=headers)
    return r.json()


def modify_checkout(store_url: str, items: list, checkout_id: str):

    url = 'https://' + store_url + '/api/2020-10/graphql.json'
    storefront_token = get_storefront_access_key(store_url)
    headers = {
        'X-Shopify-Storefront-Access-Token': storefront_token,
        'Content-Type': 'application/graphql'
    }

    line_items = '[{ '
    for item in items:
        line_items += 'variantId: "{}", quantity: {}'.format(item['id'], item['quantity'])
    line_items += '}]'

    mutation = """mutation {
        checkoutLineItemsReplace(
            lineItems: %s, checkoutId: "%s"
        ) {
            userErrors{
                field
                message
            }
            checkout {
                id
                webUrl
                lineItems(first:2) {
                    edges {
                        node {
                            id
                            title
                            quantity
                        }
                    }
                }
            }
        }
    }""" % (line_items, checkout_id)

    r = requests.post(url, data=mutation, headers=headers)
    return r.json()

def get_item_from_barcode(store_url: str, barcode: str):

    url = 'https://' + store_url + '/admin/api/2020-10/graphql.json'
    headers = {
        'X-Shopify-Access-Token': get_merchant_access_key(store_url),
        'Content-Type': 'application/graphql'
    }

    query = """query {
        productVariants(query:"%s" first:1) {
            edges {
                node {
                    barcode
                    id
                    displayName
                    product {
                        media(first:1) {
                            edges {
                                node {
                                    preview {
                                        image {
                                            originalSrc
                                            transformedSrc
                                        }
                                    }
                                }
                            }
                        }
                    }
                    availableForSale
                    inventoryQuantity
                    price
                    sku
                }
            }
        }
    }""" % barcode

    r = requests.post(url, data=query, headers=headers)
    item_data = r.json()['data']['productVariants']['edges'][0]['node']
    return item_data
