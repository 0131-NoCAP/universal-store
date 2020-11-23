# universal-store
Universal Store is an app for scanning and checking out items while shopping in stores using Shopify.
## Authors

[Jackson Hall](https://github.com/charjhall), [David Ho](https://github.com/dho37), [Victoria Joh](https://github.com/vjoh), [Andrew Wang](https://github.com/andrewwang024), [Jeremy Zou](https://github.com/jeremy-zou)

## Release Notes version 1.0

### New Features
* Added functionality to select Shopify partner stores from the Home Screen.
* Added ability to scan barcodes for items from Shopify partner stores.
* Added ability to checkout in the app with Shopify.

### Bug Fixes
* Log out button no longer crashes application.
* Handles adding incorrect item to cart correctly.
### Known Bugs
* When adding too many items to cart, checkout and subtotal are pushed off.
* On scan item, the text will sometimes overlap on top.
## Installation

### Mobile Application Installation

#### Install

Clone or download the application directory in master

#### Pre-requisites

You must have the following installed:\
[Node.js LTS release](https://nodejs.org/en/) or greater\
[Expo CLI version 3.28.4](https://docs.expo.io/get-started/installation/) or above
```bash
npm install -g expo-cli
```

#### Dependencies
To download all project dependencies:
```bash
cd {install_path}/application
npm install
```

#### Building and Running
In the application directory:
```bash
expo start
```
Run on the Expo app on iOS or Android or on a simulator
