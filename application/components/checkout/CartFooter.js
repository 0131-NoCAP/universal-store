import React from 'react';
import { View, Text } from 'react-native';
import TotalComp from './TotalComponent';
import { landingPageStyles as styles } from "../../constants/Styles";

const CartFooter = () => {

  return (
    <View style={styles.cartFooterStyle}>
      <TotalComp />
      <View style={styles.buttonContainerStyle}>
        <View style={styles.closeCartButtonStyle}>
          <Text style={{ color: '#9c27b0' }}>Close</Text>
        </View>

        <View style={styles.checkoutCartButtonStyle}>
          <Text style={{ color: '#9c27b0' }}>Go to checkout</Text>
        </View>
      </View>
    </View>
  );
}


export default CartFooter;
