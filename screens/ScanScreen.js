// TODO: Test Camera Permissions
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
// import { Permissions } from 'expo-permissions';

export default class ScanScreen extends React.Component {

  state = {
    barcodeType: '',
    barcodeData: '',
    cameraOn: false,
  }


  componentDidMount() {
    //const { navigation } = this.props;
    this._unsubscribe = this.props.navigation.addListener('focus', () =>
      this.setState({ cameraOn: true })
    );
    this._unsubscribe2 = this.props.navigation.addListener('blur', () =>
      this.setState({ cameraOn: false })
    );
  }

  componentWillUnmount() {
    this._unsubscribe();
    this._unsubscribe2();
  }

  render() {

    const { hasCameraPermissions } = getCameraAsync();
    const { cameraOn } = this.state;
    if (hasCameraPermissions === null) {
      return <Text>Requesting Camera Permissions</Text>;
    }
    if (hasCameraPermissions === false) {
      return <Text>No access to camera</Text>;
    }

    console.log(this.state);

    if (cameraOn) {
      return (
        <View style={{ flex: 1 }}>
          
          {(
          <BarCodeScanner
            onBarCodeScanned={this.handleBarCodeScanned}
            style={StyleSheet.absoluteFill}
          />
          )}
        </View>
      );
    } else {
      return <Text>Camera Off</Text>
    }
  }

  handleBarCodeScanned = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    let barcodeType = type;
    let barcodeData = data;
    this.setState({
      barcodeType: barcodeType,
      barcodeData: barcodeData,
    });
  }
}

async function getCameraAsync() {
  const { status } = await BarCodeScanner.requestPermissionsAsync();
  return status === 'granted';
}