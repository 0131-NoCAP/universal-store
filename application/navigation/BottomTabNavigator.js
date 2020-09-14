import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import ScanScreen from '../screens/ScanScreen';
import BlankScreen from '../screens/BlankScreen';
import AccountScreen from '../screens/AccountScreen';

const INITIAL_ROUTE_NAME = 'Home';
const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route),
                          headerTitleStyle: getHeaderTitleStyle(route)});

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        showLabel: false
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="home" />,
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="account" />,
        }}
      />
      <BottomTab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="barcode-scan" />,
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={BlankScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="cart" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'lucky';
    case 'Account':
      return "Account Details";
    case 'Scan':
      return "Scan Item";
    default:
      return "Nothing Yet";
  }
}

function getHeaderTitleStyle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  const homeStyle = {fontFamily: 'pacifico',
                     fontSize: 32,
                     color: '#9c27b0',
                     textAlign: 'center',
                     height: 70};
  const otherStyle = {}
  return (routeName === 'Home') ? homeStyle : otherStyle;
}
