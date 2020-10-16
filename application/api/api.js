

const shopifyToken = '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'; //will need to get this from dynamo eventually

export async function getCheckouts() {
    const header = {
        method: 'POST',
        headers: {
            'X-Shopify-Access-Token': shopifyToken,
            'Content-Type': 'application/json'
        },
        body: {
            "checkout": {
            "email": "a@yahoo.com"
            }
        }
    }
    const path = 'admin/api/2020-10/checkouts.json';
    let responseJson = apiCall(path, header);
    return responseJson;
  }

export async function getItemFromBarcode(barcode) {
    const header = {
        method: 'GET',
        headers: {
            'X-Shopify-Access-Token': shopifyToken,
            'Content-Type': 'application/json'
        }
    }
    const path = `admin/api/2020-10/products/${barcode}.json`
    const item = apiCall(path, header);
    return item;
}

/**
 * Generalized api call
 * @param path should NOT have a '/' at the beginning, the baseURL adds one
 * @param header should be a JSON object with specifics of your API call
 * @returns a JSON response object
 * **/
 async function apiCall(path, header) {
    baseURL = 'https://andrew-and-david-bridal-services.myshopify.com/';
    let response = await fetch(baseURL + path, header);
    let responseJson = await response.json();
    return responseJson;
  }