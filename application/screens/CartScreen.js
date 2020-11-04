import React, { Component } from 'react';
import { View, FlatList, Text, Image, Button, useState } from 'react-native';
import { landingPageStyles as styles } from '../constants/Styles';
import { CartContext } from "../providers/cart";
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

// import CartFooter from '../components/checkout/CartFooter';

export default function CartScreen {
  const [selectedId, setSelectedId] = useState(null);

  changeQuantity = (index) => {
    this.setState({modalOpen: true, index: index})
  }
  closeModal = () => {
    this.setState({modalOpen: false})
  }
  renderItem = ({ item, index }) => {

    return (
      <CartItem item={item} index={index} setSelectedId={setSelectedId}/>
    );
  }

  const context = useContext(CartContext);

 
    
  return (
    <View style={{flex: 1}}>
      <View style={styles.cartStyle}>
        <FlatList
          data={context.items}
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

const CartItem = ({item, index, setSelectedId}) => (
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
        onPress={() => {setSelectedId(index)}}
      />

      <Text>{item.quantity}</Text>

      <Icon.Button
        name="ios-add"
        size={20}
        color='#fff'
        backgroundColor='#fff'
        style={styles.removeAddButton}
        iconStyle={{ marginRight: 0 }}
        onPress={() => {setSelectedId(index)}}
      />
      <Modal isVisible={this.state.modalOpen}>
        {this.state.index}
        <Button onPress={() => {closeModal()}}>Close</Button>
      </Modal>

    </View>
  </View>
);