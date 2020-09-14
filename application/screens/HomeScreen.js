import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { landingPageStyles as styles} from '../constants/Styles';

import { MonoText } from '../components/StyledText';

export default function HomeScreen() {

  return (

    <View style={{flex: 1, alignItems:'center'}}>
      <View style={{flex: 1}}/>
      <Text style={{flex: 2, fontSize: 50, padding: 20, textAlign:'center'}}>
        <Text>Welcome, and thank you for shopping with </Text>
        <Text style={{fontFamily: 'pacifico', color: '#9c27b0'}}>lucky</Text>
      </Text>
      <View style={{flex: 2}}/>

    </View>
  );
}
