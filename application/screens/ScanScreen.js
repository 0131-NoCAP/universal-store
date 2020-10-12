// TODO: Test Camera Permissions
import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, TextInput, Image } from 'react-native';
import { Camera } from 'expo-camera';
import Modal from 'react-native-modal';
import { scanScreenStyles as styles } from "../constants/Styles";
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
      <View style={styles.camera}>
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
          <View style={styles.view2}>


            <View style = {styles.view3}>
              <Text style = {styles.itemAddedHeader}>
                Item Added
              </Text>
            </View>


            <View style = {styles.view4}>


              <Text style = {styles.itemAdded}>
                {this.state.itemName}{"\n"}has been added to your cart.{"\n"}
              </Text>


              <Image
                style={styles.itemAddedImage}
                source={{url: this.state.itemImage}}
              />


              <View style={styles.view5}>
                   <View style={styles.view6}>
                      <Text style={{ fontSize: 20}}>Quantity: </Text>
                       <TouchableOpacity onPress={this.decreaseQuantity}>
                           <Text style={styles.quantityText}> - </Text>
                       </TouchableOpacity>
                       <TextInput
                           style = {{fontSize: 20, textAlign: 'center', padding: 5}}
                           onChangeText={(itemQuantity) => this.setState({ itemQuantity })}
                           value={`${this.state.itemQuantity}`}
                           keyboardType="numeric"
                       />
                       <TouchableOpacity onPress={this.increaseQuantity} >
                           <Text style={styles.quantityText}> + </Text>
                       </TouchableOpacity>
                   </View>
              </View>

              <Text style = {{fontSize: 20, textAlign: 'center', padding: 5}}>
                Item Price: ${this.state.itemPrice}{"\n"}
                Cart Total: ${this.state.previousCartTotal + (this.state.itemQuantity * this.state.itemPrice)}
              </Text>
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
      previousCartTotal: null
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
    if (name.length > 50) name = name.slice(0, 49) + "...";
    var image = responseJson['item_attributes']['image'];
    return [name, image];

  } catch (error) {
    console.log(error);
    return ['No item', 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'];
  }
}
