import React from "react";
import { Button, Text, View, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "../providers/auth";
import { landingPageStyles as styles } from "../constants/Styles";
import Modal from 'react-native-modal'
import { login, register } from '../api/mockapi';

export default class LoginScreen extends React.Component {
  // Instance variables
  state = {
    email: "",
    setEmail: "",
    password: "",
    setPassword: "",
    errorState: false,
    errorMessage: "",
  };

  static contextType = AuthContext;

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>lucky</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            value={this.state.email}
            onChangeText={(email) => {
              this.setState({ email });
            }}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            value={this.state.password}
            onChangeText={(password) => {
              this.setState({ password });
            }}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <View visible = {this.state.errorState}>
          <Text style={styles.errorText}>
            {this.state.errorMessage}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            login(this.state.email, this.state.password).then((value) => {
              this.context.signIn(this.state.email, this.state.password);
            }).catch((error) => {
              console.log('error: ', error.message);
              this.setState({
                errorState: true,
                errorMessage: error.message,
              })
            })
          }}
          style={
            this.state.email === "" || this.state.password === ""
              ? styles.disabledLoginButton
              : styles.loginBtn
          }
          disabled={this.state.email === "" || this.state.password === ""}
        >
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("RegistrationScreen")}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
