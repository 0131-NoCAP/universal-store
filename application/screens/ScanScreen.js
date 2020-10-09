// TODO: Test Camera Permissions
import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, TextInput, Image } from 'react-native';
import { Camera } from 'expo-camera';
import Modal from 'react-native-modal';
var BARCODESPIDER_API_KEY = 'ce057e14c2cb19f18e45';
export default class ScanScreen extends React.Component {

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
    cartTotal: null

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

  //set Cart Total
      // setCartTotal = () => {
      //   this.setState({
      //     cartTotal: this.state.itemPrice * this.state.itemQuantity
      //   });
      //
      // }


  render() {

// I don't think it asks for permissions properly
    // Asks for camera permissions hopefully :(
    const { hasCameraPermissions } = getCameraAsync();
    // Edge cases
    if (hasCameraPermissions === null) {
      return <Text>Requesting Camera Permissions</Text>;
    }
    if (hasCameraPermissions === false) {
      return <Text>No access to camera</Text>;
    }

    console.log(this.state);

    return (
      <View style={{ flex: 1 }}>
        {(this.state.cameraOn &&
        <Camera
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
        )}

        <Modal
          isVisible={this.state.scanned}
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
            backgroundColor: 'white',
            borderRadius: 20,
            alignItems: 'stretch'
          }}>


            <View style = {{flex: 1, flexDirection: 'row', alignItems: 'left', justifyContent: 'left', borderBottomWidth: 1, padding: 10}}>
              <Text style = {{fontSize: 20}}>
                Item Added
              </Text>
            </View>


            <View style = {{alignItems: 'center', flex: 8, justifyContent: 'center'}}>


              <Text style = {{fontSize: 20, textAlign: 'center', padding: 5}}>
                {this.state.itemName}{"\n"}has been added to your cart.{"\n"}
                Cart Total: ${this.state.cartTotal + (this.state.itemQuantity * this.state.itemPrice)}
              </Text>

              <View style={{ fontSize: 20, display: 'flex', flexDirection: 'row', padding: 10, marginLeft: 20, marginBottom: 20 }}>
                   <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center',marginTop:10 }}>

                      <Text style={{ fontSize: 20, display: 'flex', justifyContent: 'left'}}>Quantity: </Text>
                       <TouchableOpacity onPress={this.decreaseQuantity}>
                           <Text> - </Text>
                       </TouchableOpacity>
                       <TextInput
                           style = {{fontSize: 20, textAlign: 'center', padding: 5}}
                           onChangeText={(itemQuantity) => this.setState({ itemQuantity })}
                           value={`${this.state.itemQuantity}`}
                           keyboardType="numeric"
                       />
                       <TouchableOpacity onPress={this.increaseQuantity} >
                           <Text> + </Text>
                       </TouchableOpacity>
                   </View>
              </View>

              <Image
                style={{width: 100, height: 100}}
                source={{url: this.state.itemImage}}
              />

            </View>
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
      cartTotal: null
    });
  }

  handleBarCodeScanned = async ({ type, data }) => {
    let barcodeType = type;
    let barcodeData = data;
    let itemData = await getBarcodeFromApiAsync(barcodeData);

    this.setState({
      barcodeType: barcodeType,
      barcodeData: barcodeData,
      cameraOn: false,
      scanned: true,
      itemName: itemData[0],
      itemImage: itemData[1],
      itemPrice: 5,
      itemQuantity: 1

    });
  };
}

async function getCameraAsync() {
  const { status } = await Camera.requestPermissionsAsync();
  return status === 'granted';
}

async function getBarcodeFromApiAsync(barcodeData) {
  try {
    if (barcodeData.length == 13) {
      barcodeData = barcodeData.substring(1);
    }
    let response = await fetch(`https://api.barcodespider.com/v1/lookup?token=${BARCODESPIDER_API_KEY}&upc=${barcodeData}`);
    let responseJson = await response.json();
    var name = responseJson['item_attributes']['title'];
    var image = responseJson['item_attributes']['image'];
    return [name, image];

  } catch (error) {
    console.log(error);
    return ['No item', 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'];
  }
}
