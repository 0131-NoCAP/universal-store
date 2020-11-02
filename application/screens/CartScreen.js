import React, { Component } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { landingPageStyles as styles } from '../constants/Styles';
import { CartContext } from "../providers/cart";
import Icon from 'react-native-vector-icons/Ionicons';
// import CartFooter from '../components/checkout/CartFooter';

export default class CartScreen extends Component {

  renderItem({ item, index }) {

    return (
    <View style={styles.containerItemStyle}>
      <Image source={{url: item.product.media.edges[0].node.preview.image.originalSrc}} style={styles.imageCartStyle} />
      <View style={styles.textCartStyle}>
        <Text style={{ color: '#2e2f30' }}>{item.displayName}</Text>
        <View style={styles.priceCartStyle}>
          <Text style={{ color: '#2e2f30', fontSize: 12 }}>${item.price}</Text>
        </View>
      </View>

      <View style={styles.counterCartStyle}>
      <Icon.Button 
          name="ios-remove" 
          size={20} 
          color='#fff' 
          backgroundColor='#fff' 
          style={styles.removeAddButton} 
          iconStyle={{ marginRight: 0 }}
          //onPress={this.onPressPlus(index)}
        />

        <Text>{item.quantity}</Text>

        <Icon.Button
          name="ios-add"
          size={20}
          color='#fff'
          backgroundColor='#fff'
          style={styles.removeAddButton}
          iconStyle={{ marginRight: 0 }}
          //onPress={this.onPressPlus(index)}
        />

      </View>
    </View>);
  }

  static contextType = CartContext;

  render() {
    
    return (
      <View style={{flex: 1}}>
        <View style={styles.cartStyle}>
          <FlatList
            data={this.context.items}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
          />
          {/* <TouchableOpacity
            onPress={() => console.log(this.context.items[0].product.media.edges[0].node.preview.image.originalSrc)}
            style={styles.wideBtn}
          >
            <Text style={styles.buttonText}>TEST BUTTON</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}