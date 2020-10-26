import React, { Component } from 'react';
import { View } from 'react-native';
import Header from './components/CartHeader';
import ItemsContainer from './components/ItemContainer';
import BasketContainer from './components/CartComponent';
import Footer from './components/CartFooter';

export default class Cart extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CartHeader />
        <ItemContainer />
        <CartContainer />
        <CartFooter />
      </View>

    );
  }
}
