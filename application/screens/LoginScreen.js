import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../providers/auth';
import { landingPageStyles as styles} from '../constants/Styles';

export default class LoginScreen extends React.Component {

  // Instance variables
  state = {
    email:'',
    setEmail:'',
    password:'',
    setPassword:''
  }

  static contextType = AuthContext;

  render(){
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>lucky</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.context.signIn(this.state.email, this.state.password)}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("RegistrationScreen")}
        >
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>


      </View>
    );
  }
}
