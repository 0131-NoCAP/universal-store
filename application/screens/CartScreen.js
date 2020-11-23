import React, { Component } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { landingPageStyles as styles } from '../constants/Styles';
import { CartContext } from "../providers/cart";
import { createCheckout, modifyCheckout } from "../api/ApiRequestHandler";
import Icon from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import Modal from 'react-native-modal';
import base64 from 'react-native-base64';

export default class CartScreen extends Component {

  componentDidMount () {
      this.props.navigation.addListener('focus', () =>
        this.forceUpdate()
      );
  }

  state = {
    webCheckout: false,
    checkoutID: '',
    checkoutURL: ''
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
            
                  <Text>Subtotal: ${calculateSubtotal(items).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>

                </View>


                <TouchableOpacity onPress={async () => {

                  console.log(`going into webview. checkoutID: ${this.state.checkoutID}`);
                  if (this.state.checkoutID == '') {
                    let shopifyResponse = await this.createCheckoutWithAPI(items);
                    let shopifyCheckoutID = shopifyResponse.id;
                    let shopifyCheckoutURL = shopifyResponse.webUrl;
                    console.log(`shopify checkout url: ${shopifyCheckoutURL}`);

                    this.setState({
                      checkoutID: shopifyCheckoutID,
                      checkoutURL: shopifyCheckoutURL
                    });
                  } else {
                    await this.modifyCheckoutWithAPI(items);
                  }
                  this.setState({
                    webCheckout: true
                  });

                }} style={styles.wideBtn}>
                  <Text style={styles.wide}>Checkout</Text>
                </TouchableOpacity> 
              </View>
              

            ) : (
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={{fontSize: 24}}>Your cart is empty!</Text>
              </View>
            )}
          
          
            <Modal isVisible={ this.state.webCheckout }>
              <View style={{ flex: 1 }}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#2b2b2b'
                  }}
                >
                  <TouchableWithoutFeedback onPress={() => this.exitCheckout()}>
                    <View style={{flex: 1, backgroundColor: '#2b2b2b'}} />
                  </TouchableWithoutFeedback>
                </View>
              </View>

              <View style={{ flex: 19 }}>
                <WebView
                  source={{ uri: this.state.checkoutURL }}
                />
              </View>
            </Modal>

          </View>
        )}
      </CartContext.Consumer>
      
    );
  }

  createCheckoutWithAPI = async (items) => {
    // create checkout with Shopify API
    let formattedItems = formatItems(items);
    let responseJson = await createCheckout(this.context.selectedStore, formattedItems);
    let shopifyResponse = responseJson.data.checkoutCreate.checkout;

    return shopifyResponse;
  }
  
  modifyCheckoutWithAPI = async (items) => {
    // modify existing checkout with Shopify API
    let formattedItems = formatItems(items);
    let responseJson = await modifyCheckout(
      this.context.selectedStore,
      formattedItems,
      this.state.checkoutID
    );
    //let shopifyResponse = responseJson.data.checkoutLineItemsReplace.checkout;
  }

  exitCheckout = () => {
    this.setState({
      webCheckout: false
    });
  }
}


function calculateSubtotal(items) {
  let subtotal = 0;
  
  items.forEach(item => {
    subtotal += (item.price) * item.quantity
  });

  return subtotal;
}


function formatItems(items) {
  var formattedItems = [];
  for (let i = 0; i < items.length; i++) {
    formattedItems.push({
      "id": base64.encode(items[i].id),
      "quantity": items[i].quantity
    });
  }
  console.log(`formatted items:`);
  console.log(formattedItems)
  return formattedItems;
}
