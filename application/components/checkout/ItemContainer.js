
import React, { Component } from 'react';
import { View } from 'react-native';
import Item from './CartItem';
import { landingPageStyles as styles } from "../constants/Styles";

class ItemContainer extends Component {
  render() {
    return (
      <View style={styles.itemContainterStyle}>
        <Item />
      </View>
    );
  }
}

export default ItemContainer;
