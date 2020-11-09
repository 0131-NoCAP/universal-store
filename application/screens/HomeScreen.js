import * as React from "react";
import { Text, View } from "react-native";
import {Picker} from '@react-native-community/picker';
import { CartContext } from '../providers/cart';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {language: 'java'};
  }

  static contextType = CartContext;

  render() {
    console.log(this.context.storeList)
    const storeListFormatted = this.context.storeList.map(x => (<Picker.Item label={x.store_name} value={x.store_url}/>))
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ flex: 1 }} />
        <Text style={{ flex: 2, fontSize: 45, padding: 20, textAlign: "center" }}>
          <Text>Welcome, and thank you for shopping with </Text>
          <Text style={{ fontFamily: "pacifico", color: "#9c27b0" }}>lucky</Text>
        </Text>
        <View style={{ flex: 2 }} />
        <Picker
          selectedValue={this.state.language}
          style={{height: 50, width: 350}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({language: itemValue})
          }>
          {storeListFormatted}
        </Picker>
        <View style={{ flex: 1 }} />

      </View>
    );
  }
}
