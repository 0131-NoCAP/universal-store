
import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { landingPageStyles as styles } from "../../constants/Styles";

const CartHeader = () => {
  return (
    <View style={styles.headerCartStyle}>
      {/* <Icon name="ios-close" size={35} color="#a8a9ad" />
      <Text style={{ fontSize: 18 }}>Shopping Cart</Text>
      <Text>Empty</Text> */}
    </View>
  );
}


export default CartHeader;
