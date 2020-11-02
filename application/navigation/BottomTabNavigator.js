import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import PaymentMethodScreen from "../screens/PaymentMethodScreen";
import ScanScreen from "../screens/ScanScreen";
import AccountScreen from "../screens/AccountScreen";
import CartScreen from "../screens/CartScreen";
import { CartContext } from "../providers/cart";

const INITIAL_ROUTE_NAME = "Home";
const BottomTab = createBottomTabNavigator();

const cartContext = {
  items: []
}

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({
    headerTitle: getHeaderTitle(route),
    headerTitleStyle: getHeaderTitleStyle(route),
  });

  return (
    <CartContext.Provider value = {cartContext}>
      <BottomTab.Navigator
        initialRouteName={INITIAL_ROUTE_NAME}
        tabBarOptions={{
          showLabel: false,
        }}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="home" />
            ),
          }}
        />
        <BottomTab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="account" />
            ),
          }}
        />

        <BottomTab.Screen
          name="Scan"
          component={ScanScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="barcode-scan" />
            ),
          }}
        />
        <BottomTab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} name="cart" />
            ),
          }}
        />

      </BottomTab.Navigator>
    </CartContext.Provider>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "lucky";
    case "Account":
      return "Account Details";
    case "Scan":
      return "Scan Item";
    default:
      return "Nothing Yet";
  }
}

function getHeaderTitleStyle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  const homeStyle = {
    fontFamily: "pacifico",
    fontSize: 32,
    color: "#9c27b0",
    textAlign: "center",
    height: 70,
  };
  const otherStyle = {};
  return routeName === "Home" ? homeStyle : otherStyle;
}
