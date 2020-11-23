import React, { Component } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { landingPageStyles as styles } from '../constants/Styles';
import { CartContext } from "../providers/cart";
import Icon from 'react-native-vector-icons/Ionicons';


export default class CartScreen extends Component {

  componentDidMount () {
      this.props.navigation.addListener('focus', () =>
        this.forceUpdate()
      );
  }

  
  
  static contextType = CartContext;

  render() {

    return (
      <CartContext.Consumer>
        {({items, setCart}) => (

          <View style={{flex: 1}}>
            {items.length > 0 ? (
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={styles.cartStyle}>
                  <FlatList
                    data={items}
                    renderItem={({ item, index }) => (
                      <View style={styles.containerItemStyle}>
                        <Image source={{url: item.product.media.edges[0].node.preview.image.originalSrc}} style={styles.imageCartStyle} />
                        <View style={styles.textCartStyle}>
                          <Text style={{ color: '#2e2f30', fontSize: 11 }}>{item.displayName}</Text>
                          <View style={styles.priceCartStyle}>
                            <Text style={{ color: '#2e2f30', fontSize: 8 }}>${item.price}</Text>
                          </View>
                        </View>
                        <View style={styles.counterCartStyle}>
                          <Icon.Button
                            name="ios-trash"
                            size={20} 
                            color='#000' 
                            backgroundColor='#fff' 
                            // style={styles.removeAddButton} 
                            onPress={() => {
                              const updatedCart = items.filter(cartItem => cartItem.id !== item.id);
                              setCart(updatedCart);
                              this.forceUpdate();
                            }}

                          />
                          <Icon.Button 
                              name="ios-remove" 
                              size={15} 
                              color='#fff' 
                              backgroundColor='#fff' 
                              style={styles.removeAddButton} 
                              iconStyle={{ marginRight: 0 }}
                              onPress={() => {
                                let selecteditem = items[index];
                                if (selecteditem.quantity > 1) selecteditem.quantity = selecteditem.quantity - 1;
                                let updatedCart = items;
                                updatedCart[index] = selecteditem;
                                setCart(updatedCart);
                                this.forceUpdate();
                              }}
                            />

                            <Text style={{fontSize: 10, padding: 10}}>{item.quantity}</Text>

                            <Icon.Button
                              name="ios-add"
                              size={15}
                              color='#fff'
                              backgroundColor='#fff'
                              style={styles.removeAddButton}
                              iconStyle={{ marginRight: 0 }}
                              onPress={ () => {
                                let selecteditem = items[index];
                                selecteditem.quantity = selecteditem.quantity + 1;
                                let updatedCart = items;
                                updatedCart[index] = selecteditem;
                                setCart(updatedCart);
                                this.forceUpdate();
                              }}
                            />

                        </View>



                      </View>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </View>

                <View>
            
                  <Text style={{flex: 'row'}}>Subtotal: ${calculateSubtotal(items).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>

                </View>


                <TouchableOpacity onPress={() => console.log(items)} style={styles.wideBtn}>
                    <Text style={styles.wide}>Checkout</Text>
                </TouchableOpacity> 
              </View>
              

            ) : (
              <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{fontSize: 24}}>Your cart is empty!</Text>
              </View>
            )}
          
          

        </View>
      )}
      </CartContext.Consumer>
      
    );
  }
}

function calculateSubtotal(items) {
  let subtotal = 0;
  
  items.forEach(item => {
    subtotal += (item.price) * item.quantity  
  });

  return subtotal;
    
}

