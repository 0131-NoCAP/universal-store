import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../providers/auth';

import { landingPageStyles as styles} from '../constants/Styles';
export default function AccountScreen() {
    const authContext = React.useContext(AuthContext)
  return (

  <View style={{flex: 1, alignItems:'center'}}>
    <View style={{flex: 2}}/>
    <TouchableOpacity
      onPress={() => authContext.signOut()}
      style={styles.wideBtn}
    >
      <Text style={styles.buttonText}>Log Out</Text>
    </TouchableOpacity>
  </View>


  );
}
