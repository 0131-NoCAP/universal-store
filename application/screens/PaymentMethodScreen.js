import * as React from "react";
import { Text, View, TextInput } from "react-native";
import { landingPageStyles as styles } from "../constants/Styles";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-credit-card-input";

export default function PaymentMethodScreen() {
  return (
    <View>
      <CreditCardInput onChange={() => {}} />
      {/* <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="First Name"
          placeholderTextColor="#003f5c"
          value={this.state.firstName}
          onChangeText={(firstName) => this.setState({ firstName })}
          onSubmitEditing={() => this.lastNameTextInput.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Last Name"
          placeholderTextColor="#003f5c"
          value={this.state.lastName}
          onChangeText={(lastName) => this.setState({ lastName })}
          ref={(input) => {
            this.lastNameTextInput = input;
          }}
          onSubmitEditing={() => this.emailTextInput.focus()}
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          ref={(input) => {
            this.emailTextInput = input;
          }}
          onSubmitEditing={() => this.passwordTextInput.focus()}
          blurOnSubmit={false}
        />
      </View> */}
    </View>
  );
}
