// TODO: Test Camera Permissions
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Camera } from 'expo-camera';
import Modal from 'react-native-modal';

export default class ScanScreen extends React.Component {

  // Instance variables
  state = {
    barcodeType: '',
    barcodeData: '',
    cameraOn: false,
    scanned: false
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

  render() {

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
            <TouchableWithoutFeedback onPress={() => {this.setState({scanned: false, cameraOn: true})}}>
              <View style={{flex: 1, backgroundColor: 'black'}} />
            </TouchableWithoutFeedback>
          }
          animationIn='zoomIn'
          animationOut='zoomOut'
        >
          <TouchableWithoutFeedback onPress={() => {this.setState({scanned: false, cameraOn: true})}}>
              <View style={{flex: 1}} />
          </TouchableWithoutFeedback>
          <View style={{
            flex: 3,
            justifyContent: 'center', 
            backgroundColor: 'white',
            borderRadius: 20,
            alignItems: 'stretch'
          }}>
            <View style = {{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1}}>
              <Text style = {{fontSize: 30}}>
                Item Added
              </Text>
            </View>
            <View style = {{alignItems: 'center', flex: 8, justifyContent: 'center'}}>
              <Text style = {{fontSize: 15}}>
                {this.state.barcodeData}
              </Text>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={() => {this.setState({scanned: false, cameraOn: true})}}>
            <View style={{flex: 1}} />
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );

  }

  handleBarCodeScanned = ({ type, data }) => {
    let barcodeType = type;
    let barcodeData = data;
    this.setState({
      barcodeType: barcodeType,
      barcodeData: barcodeData,
      cameraOn: false,
      scanned: true
    });
  }
}

async function getCameraAsync() {
  const { status } = await Camera.requestPermissionsAsync();
  return status === 'granted';
}