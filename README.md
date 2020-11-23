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
* When adding too many items to cart, checkout and subtotal are pushed below the view of the screen.
* On scan item, the text will sometimes overlap on top.

## Installation

### Pre-requisites

You must have the following installed:\
[Node.js LTS release](https://nodejs.org/en/) or greater\
[Expo CLI version 3.28.4](https://docs.expo.io/get-started/installation/) or above
```bash
npm install -g expo-cli
```
### Download/Installation

Clone or download the application directory in master anywhere on your computer

### Dependencies
To download all project dependencies:
```bash
cd {install_path}/application
npm install
```

### Building and Running
In the application directory:
```bash
expo start
```
Run on the Expo app on iOS or Android or on a simulator.

### Troubleshooting
* Make sure you are in the application directory when installing dependencies.
* If AWS issues arise, install AWS Amplify using:
```bash
npm install -g @aws-amplify/cli
```
* If you get permission errors while trying to run npm install with the global flag "-g", run using sudo.
