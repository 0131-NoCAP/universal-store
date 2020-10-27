import React, { Component } from 'react';
import { Text, View, FlatList, Image, useState } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { landingPageStyles as styles } from "../../constants/Styles";

//Items in Cart need to be populated into an array like the following.

const data = [
{
  id: 1,
  image: "https://www.marlerblog.com/files/2013/03/orange.jpg",
  name: 'Orange',
  price: 10,
  amountTaken: 3
},
{
  id: 2,
  // image: image2,
  name: 'Tomato',
  price: 5,
  amountTaken: 4
}
//   id: 3,
//   // image: image3,
//   name: 'Salmon fillet',
//   price: 16,
//   amountTaken: 2
// }, {
//   id: 4,
//   // image: image4,
//   name: 'Greens',
//   price: 3,
//   amountTaken: 3
// }, {
//   id: 5,
//   // image: image5,
//   name: 'Rye Bread',
//   price: 20,
//   amountTaken: 1
// }, {
//   id: 5,
//   // image: image5,
//   name: 'Rye Bread',
//   price: 20,
//   amountTaken: 1
// }, {
//   id: 5,
//   // image: image5,
//   name: 'Rye Bread',
//   price: 20,
//   amountTaken: 1
// }, {
//   id: 5,
//   // image: image5,
//   name: 'Rye Bread',
//   price: 20,
//   amountTaken: 1
// }, {
//   id: 5,
//   // image: image5,
//   name: 'Rye Bread',
//   price: 20,
//   amountTaken: 1
// }, {
//   id: 5,
//   // image: image5,
//   name: 'Rye Bread',
//   price: 20,
//   amountTaken: 1
// }, {
//   id: 5,
//   // image: image5,
//   name: 'Rye Bread',
//   price: 20,
//   amountTaken: 1
// }, {
//   id: 5,
//   // image: image5,
//   name: 'Rye Bread',
//   price: 20,
//   amountTaken: 1
// }, {
//   id: 5,
//   // image: image5,
//   name: 'Rye Bread',
//   price: 20,
//   amountTaken: 1
// }, {
//   id: 5,
//   // image: image5,
//   name: 'Rye Bread',
//   price: 20,
//   amountTaken: 1
// }, {
//   id: 5,
//   // image: image5,
//   name: 'Rye Bread',
//   price: 20,
//   amountTaken: 1
// }, {
//   id: 5,
//   // image: image5,
//   name: 'Rye Bread',
//   price: 20,
//   amountTaken: 1
// }, {
//   id: 5,
//   // image: image5,
//   name: 'Rye Bread',
//   price: 20,
//   amountTaken: 1
// }, {
//   id: 5,
//   // image: image5,
//   name: 'Rye Bread',
//   price: 20,
//   amountTaken: 1
// },
];

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {data: [{
      id: 1,
      image: "https://www.marlerblog.com/files/2013/03/orange.jpg",
      name: 'Orange',
      price: 10,
      amountTaken: 3
    },
    {
      id: 2,
      image: "https://www.marlerblog.com/files/2013/03/orange.jpg",
      name: 'Tomato',
      price: 5,
      amountTaken: 4
    }]}
  }

  // onPressMinus(index) {
  //   let cartItem = this.state.data[index];
  //   if (cartItem.amountTaken > 1) {
  //     cartItem.amountTaken = amountTaken - 1;
  //     let newCart = this.state.data;
  //     newCart[index] = cartItem;
  //     this.setState({data: newCart});
  //   }
  // }
  // onPressPlus(index) {
  //   let cartItem = this.state.data[index];
  //   cartItem.amountTaken = amountTaken + 1;
  //   let newCart = this.state.data;
  //   newCart[index] = cartItem;
  //   this.setState({data: newCart});
  // }

  renderItem({ item, index }) {

    return (
    <View style={(index + 1 === data.length) ? styles.lastItemStyle : styles.containerItemStyle}>
      <Image source={item.image} style={styles.imageCartStyle} />

      <View style={styles.textCartStyle}>
        <Text style={{ color: '#2e2f30' }}>{item.name}</Text>
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
          style={{ borderRadius: 15, backgroundColor: '#bbb', height: 30, width: 30, paddingLeft: 10, paddingTop: 5}}
          iconStyle={{ marginRight: 0 }}
          //onPress={this.onPressMinus(index)}
        />

        <Text>{item.amountTaken}</Text>

        <Icon.Button
          name="ios-add"
          size={20}
          color='#fff'
          backgroundColor='#fff'
          style={{ borderRadius: 15, backgroundColor: '#bbb', height: 30, width: 30, paddingLeft: 10, paddingTop: 5 }}
          iconStyle={{ marginRight: 0 }}
          //onPress={this.onPressPlus(index)}
        />

      </View>
    </View>);
  }


  render() {
    
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={(item) => item.id}
      />
    );
  }
}


export default CartItem;
