import React, { Component } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { landingPageStyles as styles } from '../constants/Styles';
import { CartContext } from "../providers/cart";
import { createCheckout, modifyCheckout } from "../api/ApiRequestHandler";
import Icon from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import CartFooter from '../components/checkout/CartFooter';

export default class CartScreen extends Component {
  componentDidMount () {
      this.props.navigation.addListener('focus', () =>
        this.forceUpdate()
      );
  }

  state = {
    webCheckout: false,
  }

  state = {
    webCheckout: false,
    checkoutExists: false,
    checkoutID: '',
    checkoutURL: ''
  }

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

          <TouchableOpacity
            onPress={() => {
              // if there are no items in the cart, do nothing
              if (this.context.items.length > 0) {
                console.log("going into webview");
                if (!this.state.checkoutExists) {
                  await createCheckoutWithAPI();
                } else {
                  await modifyCheckoutWithAPI();
                }
                this.setState({
                  webCheckout: true
                });
              }
            }}
            style={styles.wideBtn}
          >
            <Text style={styles.buttonText}>TEST BUTTON</Text>
          </TouchableOpacity>
        </View>
        

        <Modal
          isVisible={ this.state.webCheckout }
        >
          <View style={{ flex: 1 }}>
            <View style={{
                flex: 1,
                backgroundColor: '#2b2b2b'
              }}
            >
              <MaterialCommunityIcons
                name="close-box"
                size={30}
                style={{marginTop: 2, marginLeft: 1}}
                color={"#fa5c5c"}
              />
            </View>
          </View>

          <View style={{ flex: 19 }}>
            <WebView
              source={{ uri: 'https://shopify.com/partners' }}
            />
          </View>
        </Modal>
      </View>
    );
  }

  exitCheckout = () => {
    this.setState({
      webCheckout: false
    })
  }
}


async function createCheckoutWithAPI() {
  // create checkout with Shopify API
  let responseJson = await createCheckout(this.context.selectedStore, this.context.items);
  let shopifyResponse = responseJson.body.data.checkoutLineItemsReplace.checkout;
  let shopifyCheckoutID = shopifyResponse.id;
  let shopifyCheckoutURL = shopifyResponse.webUrl;
  this.setState({
    checkoutExists: true,
    checkoutID: shopifyCheckoutID,
    checkoutURL: shopifyCheckoutURL
  });
}

async function modifyCheckoutWithAPI() {
  // modify existing checkout with Shopify API
  let responseJson = await modifyCheckout(
    this.context.selectedStore,
    this.context.items,
    this.state.checkoutID
  );
  let shopifyResponse = responseJson.body.data.checkoutLineItemsReplace.checkout;
}