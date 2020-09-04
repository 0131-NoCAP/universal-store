import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../providers/auth";
import { landingPageStyles as styles } from "../constants/Styles";

export default class RegistrationScreen extends React.Component {
  // Instance variables
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  static contextType = AuthContext;

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.registerPageHead}>
          <Text style={styles.registerText}>Register for a new account</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="First Name"
            placeholderTextColor="#003f5c"
            value={this.state.firstName}
            onChangeText={(firstName) => this.setState({ firstName })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Last Name"
            placeholderTextColor="#003f5c"
            value={this.state.lastName}
            onChangeText={(lastName) => this.setState({ lastName })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Confirm Password"
            placeholderTextColor="#003f5c"
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) =>
              this.setState({ confirmPassword })
            }
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.context.signUp(this.state.email, this.state.password);
            navigate("LoginScreen");
          }}
          style={
            this.state.email === "" || this.state.firstName === "" ||
            this.state.lastName === "" || this.state.password === "" ||
            this.state.confirmPassword === ""
              ? styles.disabledLoginButton
              : styles.loginBtn
          }
          disabled={this.state.email === "" || this.state.firstName === "" ||
            this.state.lastName === "" || this.state.password === "" ||
            this.state.confirmPassword === ""}
        >
          <Text style={styles.loginText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
