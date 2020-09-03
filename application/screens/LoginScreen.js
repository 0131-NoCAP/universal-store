import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { AuthContext } from '../providers/auth';

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
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>lucky</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            value={this.email}
            onChangeText={this.setEmail}
          />
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            value={this.password}
            onChangeText={this.setPassword}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.context.signIn(this.email, this.password)}
          style={styles.loginBtn}
        >
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontFamily: 'pacifico',
    fontSize:120,
    color:"#9c27b0",
    marginBottom:60
  },
  inputView:{
    width:"80%",
    backgroundColor:"#fff",
    borderRadius:25,
    borderBottomColor:"black",
    borderBottomWidth:1,
    borderLeftColor:"black",
    borderLeftWidth:1,
    borderRightColor:"black",
    borderRightWidth:1,
    borderTopColor:"black",
    borderTopWidth:1,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black"
  },
  forgot:{
    textAlign:"left",
    alignSelf:"stretch",
    color:"#27B09B",
    fontSize:11,
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#27B09B",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  },
  signupText:{
    marginTop:20,
    color:"#27B09B"
  }
});
