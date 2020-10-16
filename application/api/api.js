
 function getCheckouts() {
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
      const path = '/admin/api/2020-10/checkouts.json';
      let responseJson = apiCall(path, header);
      return responseJson;
  }

 function apiCall(path, header) {
    baseURL = 'https://andrew-and-david-bridal-services.myshopify.com';
    email = 'a@a.com';
    shopifyToken = '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'; //will need to get this from dynamo eventually
    let response = await fetch(baseURL + path, header);
    let responseJson = await response.json();
    return responseJson;
  }