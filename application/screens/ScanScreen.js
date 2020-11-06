// TODO: Test Camera Permissions
import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, TextInput, Image } from 'react-native';
import { Camera } from 'expo-camera';
import Modal from 'react-native-modal';
import { landingPageStyles as styles } from "../constants/Styles";
import { getItemFromBarcode } from "../api/ApiRequestHandler";
import { CartContext } from "../providers/cart";

export default class ScanScreen extends React.Component {
  static contextType = CartContext;

  // Instance variables
  state = {
    barcodeType: '',
    barcodeData: '',
    cameraOn: false,
    scanned: false,
    itemName: null,
    itemImage: null,
    itemPrice: null,
    itemQuantity: null,
    previousCartTotal: null
  }

  // Checks if current screen is mounted to turn camera on or off
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () =>
      this.setState({ cameraOn: true, scanned: false })
    );
    this._unsubscribe2 = this.props.navigation.addListener('blur', () =>
      this.setState({ cameraOn: false, scanned: false })
    );
  }
  componentWillUnmount() {
    this._unsubscribe();
    this._unsubscribe2();
  }

      decreaseQuantity = () => {
          if(this.state.itemQuantity <= 1) {
              return;
          } else {
              this.setState({
                  itemQuantity: this.state.itemQuantity - 1,
              });
          }
      }

      increaseQuantity = () => {
          this.setState({
              itemQuantity: this.state.itemQuantity + 1
          });
      }

  render() {

    const { hasCameraPermissions } = getCameraAsync();
    // Edge cases
    if (hasCameraPermissions === null) {
      return <Text>Requesting Camera Permissions</Text>;
    }
    if (hasCameraPermissions === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={{ flex: 1 }}>
        {(this.state.cameraOn &&
        <Camera
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
        )}
              {/* This Modal displays on a successful scan */}
                    <Modal 
                      isVisible={this.state.scanned && this.itemData !== null} 
                      customBackdrop={
                        <TouchableWithoutFeedback onPress={() => this.exitPopup()}>
                          <View style={{flex: 1, backgroundColor: 'white'}} />
                        </TouchableWithoutFeedback>
                      }
                      animationIn='zoomIn'
                      animationOut='zoomOut'
                    >
                      <TouchableWithoutFeedback onPress={() => this.exitPopup()}>
                          <View style={{flex: 1}} />
                      </TouchableWithoutFeedback>
                      <View style={{
                        flex: 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 20
                      }}>


                        <View style = {{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, padding: 5, margin: 'auto'}}>
                          <Text style = {{fontSize: 20, fontWeight: "bold"}}>
                            Item Added
                          </Text>
                        </View>


                        <View style = {{alignItems: 'center', flex: 8, justifyContent: 'center', margin: 'auto' }}>
                        
                              <Text style = {{fontSize: 20, textAlign: 'center', margin: 'auto' }}>
                                {this.state.itemName}{"\n"}has been added to your cart.{"\n"}
                              </Text>

                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            let toCart = this.state.itemData;
                            toCart["quantity"] = this.state.itemQuantity;
                            this.context['items'].push(toCart);
                            this.exitPopup();
                          }}
                          style={styles.wideBtn}
                        >
                            <Text style={styles.buttonText}> Confirm </Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableWithoutFeedback onPress={() => this.exitPopup()}>
                        <View style={{flex: 1}} />
                      </TouchableWithoutFeedback>
                    </Modal>


                      {/* This Modal displays on a null scan. */}

                    <Modal 
                      isVisible={this.state.itemData === null}
                      customBackdrop={
                        <TouchableWithoutFeedback onPress={() => this.exitPopup()}>
                          <View style={{flex: 1, backgroundColor: 'white'}} />
                        </TouchableWithoutFeedback>
                      }
                      animationIn='zoomIn'
                      animationOut='zoomOut'
                    >
                      <TouchableWithoutFeedback onPress={() => this.exitPopup()}>
                          <View style={{flex: 1}} />
                      </TouchableWithoutFeedback>
                      <View style={{
                        flex: 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderRadius: 20
                      }}>


                        <View style = {{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, padding: 5, margin: 'auto'}}>
                          <Text style = {{fontSize: 20, fontWeight: "bold"}}>
                            Scan Error: No Item to Add
                          </Text>
                        </View>


                        <View style = {{alignItems: 'center', flex: 8, justifyContent: 'center', margin: 'auto' }}>
                        
                              <Text style = {{fontSize: 20, textAlign: 'center', margin: 'auto' }}>
                                {"\n"}Please try rescanning or scanning another item.{"\n"}
                              </Text>

                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            // let toCart = this.state.itemData;
                            // toCart["quantity"] = this.state.itemQuantity;
                            // this.context['items'].push(toCart);
                            this.exitPopup();
                          }}
                          style={styles.wideBtn}
                        >
                            <Text style={styles.buttonText}> Confirm </Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableWithoutFeedback onPress={() => this.exitPopup()}>
                        <View style={{flex: 1}} />
                      </TouchableWithoutFeedback>
                    </Modal>

      </View>
    );

  }

  exitPopup = () => {
    this.setState({
      scanned: false,
      cameraOn: true,
      barcodeData: '',
      barcodeType: '',
      itemData: null,
      itemPrice: null,
      itemQuantity: null,
      previousCartTotal: null
    });
  }

  handleBarCodeScanned = async ({ type, data }) => {
    let barcodeType = type;
    let barcodeData = data;
    let itemData = await getBarcodeFromApiAsync(barcodeData);
    let name = itemData['displayName'];


    if (name.includes(' - Default Title')) {
      name = name.substring(0, name.length - 16);
    }
    if (name.length > 50) name = name.slice(0, 49) + "...";

      let image = itemData['product']['media']['edges'][0]['node']['preview']['image']['originalSrc'];
      let price = itemData['price']

      this.setState({
        barcodeType: barcodeType,
        barcodeData: barcodeData,
        cameraOn: false,
        scanned: true,
        itemData: itemData,
        itemName: name,
        itemImage: image,
        itemPrice: price,
        itemQuantity: 1

      });


          //TODO:
    //itemData check if it's null, then assign the
    if (name === 'Item Not Found') {
      this.setState({
        itemData: null
      });
    }
   
  };
}

async function getCameraAsync() {
  const { status } = await Camera.requestPermissionsAsync();
  return status === 'granted';
}

async function getBarcodeFromApiAsync(barcodeData) {
  try {
    // TODO: Add store selection options
    // TODO: Store item in a cart with persistence
    let responseJson = await getItemFromBarcode(barcodeData, 'andrew-and-david-bridal-services.myshopify.com');
    return responseJson;
  } catch (error) {
    console.log("ERROR:\n" + error);
    return {

      'barcode': barcodeData,
      'id': 'N/A',
      'displayName': 'Item Not Found',
      'product': {
        'media': {
          'edges': [
            {
              'node': {
                'preview': {
                  'image': {
                      'originalSrc': 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
                      'transformedSrc': 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
                  }
                }
              }
            }
          ]
        }
      },
      'availableForSale': 'false',
      'inventoryQuantity': 0,
      'price': '0',
      'sku': 'N/A'


    };
  } 
}
