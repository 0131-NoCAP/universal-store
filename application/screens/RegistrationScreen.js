import React from "react";
import {
  Modal,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { AuthContext } from "../providers/auth";
import { landingPageStyles as styles } from "../constants/Styles";
import ValidationComponent from "react-native-form-validator";
import DismissKeyboard from "../components/DismissKeyboard";

export default class RegistrationScreen extends ValidationComponent {
  // Instance variables
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    modalVisible: false,
    errorMessage: "",
  };
  static contextType = AuthContext;
  submit() {
    if (this.validateInput()) {
      this.context
        .signUp(
          this.state.firstName,
          this.state.lastName,
          this.state.email,
          this.state.password
        )
        .catch((error) => {
          console.log("error: ", error.message);
          this.setState({
            errorMessage: error.message,
            modalVisible: true,
          });
          // set state and have modal pop up
        });
    }
  }
  validateInput() {
    //let validator = require("email-validator");
    let modalVisible;
    if (
      this.state.email === "" ||
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.password === "" ||
      this.state.confirmPassword === ""
    ) {
      this.setState({ errorMessage: "Please fill out all fields." });
      modalVisible = true;
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        errorMessage: "Password and confirm password do not match",
      });
      modalVisible = true;
    } else if (!this.validate({ email: { email: true } })) {
      this.setState({
        errorMessage: "Please enter a valid email.",
      });
      modalVisible = true;
    } else {
      modalVisible = false;
    }
    this.setState({ modalVisible });
    return !modalVisible;
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <DismissKeyboard>
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
          </View>
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor="#003f5c"
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              ref={(input) => {
                this.passwordTextInput = input;
              }}
              onSubmitEditing={() => this.confirmPasswordTextInput.focus()}
              blurOnSubmit={false}
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
              ref={(input) => {
                this.confirmPasswordTextInput = input;
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              this.submit();
            }}
            style={styles.wideBtn}
          >
            <Text style={styles.buttonText}>Create Account</Text>
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
      </DismissKeyboard>
    );
  }
}
