import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { landingPageStyles as styles } from "../constants/Styles";

const TotalComponent = () => {
  return (
    <View style={styles.containerTCStyle}>
      <View style={styles.goodsCartStyle}>
        <Icon name="ios-cart" size={20} style={{ marginRight: 8 }} />
        <Text>number of goods here</Text>
      </View>

      <View style={styles.totalCartStyle}>
        <Text>Total: </Text>
        <Text>Sum of Cart here</Text>
      </View>
    </View>
  );
}


export default TotalComponent;
