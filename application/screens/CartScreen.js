import React, { Component } from 'react';
import { View } from 'react-native';
import CartHeader from '../components/checkout/CartHeader';
import ItemContainer from '../components/checkout/ItemContainer';
import CartComponent from '../components/checkout/CartComponent';
import CartFooter from '../components/checkout/CartFooter';

export default class Cart extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CartHeader />
        <ItemContainer />
        <CartComponent />
        <CartFooter />
      </View>

    );
  }
}
