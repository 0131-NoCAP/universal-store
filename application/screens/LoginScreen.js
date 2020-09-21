import React from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { AuthContext } from "../providers/auth";
import { landingPageStyles as styles } from "../constants/Styles";
import Modal from "react-native-modal";
import { login, register } from "../api/mockapi";

export default class LoginScreen extends React.Component {
  // Instance variables
  state = {
    email: "",
    setEmail: "",
    password: "",
    setPassword: "",
    errorState: false,
    errorMessage: "",
    modalVisible: false,
  };

  static contextType = AuthContext;
  attemptLogin() {
    this.context.signIn(this.state.email, this.state.password)
      .catch((error) => {
        console.log("error: ", error.message);
        this.setState({
          modalVisible: true,
          errorMessage: error.message,
        });
      });
  }
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
            onSubmitEditing={() => this.passwordTextInput.focus()}
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
            ref={(input) => {
              this.passwordTextInput = input;
            }}
            onSubmitEditing={() => this.attemptLogin()}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* <View visible = {this.state.errorState}>
          <Text style={styles.errorText}>
            {this.state.errorMessage}
          </Text>
        </View> */}

        <TouchableOpacity
          onPress={() => {
            this.attemptLogin();
          }}
          style={
            this.state.email === "" || this.state.password === ""
              ? styles.disabledLoginButton
              : styles.loginBtn
          }
          disabled={this.state.email === "" || this.state.password === ""}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("RegistrationScreen")}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{this.state.errorMessage}</Text>

              <TouchableHighlight
                style={{ ...styles.openButton }}
                onPress={() => {
                  this.setState({ modalVisible: !this.state.modalVisible });
                }}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
