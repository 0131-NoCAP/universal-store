import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { landingPageStyles as styles } from '../constants/Styles';
import { CartContext } from "../providers/cart";
// import CartFooter from '../components/checkout/CartFooter';

export default class CartScreen extends Component {
  static contextType = CartContext;
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => console.log(this.context.items)}
          style={styles.wideBtn}
        >
          <Text style={styles.buttonText}>TEST BUTTON</Text>
        </TouchableOpacity>

      </View>

    );
  }
}
