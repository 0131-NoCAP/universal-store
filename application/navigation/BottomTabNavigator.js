import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import PaymentMethodScreen from "../screens/PaymentMethodScreen";
import ScanScreen from "../screens/ScanScreen";
import AccountScreen from "../screens/AccountScreen";
import CartScreen from "../screens/CartScreen";
import { CartContext } from "../providers/cart";
import { getStoreNames } from "../api/ApiRequestHandler";

const INITIAL_ROUTE_NAME = "Home";
const BottomTab = createBottomTabNavigator();

var cartContext = {
  items: [],
  selectedStore: 'andrew-and-david-bridal-services.myshopify.com',
  storeList: null,
}

export default function BottomTabNavigator({ navigation, route }) {
  const [ isLoading, setLoading ] = React.useState(true);

  React.useEffect(async () => {
    await getStoreNames().then(response => {
      cartContext.storeList = response;
      setLoading(false);
    });
    console.log(cartContext);
  }, []);
  // Set the header title on the parent stack navigator depending on the
  // currently active tab.
  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: getHeaderTitle(route),
      headerTitleStyle: getHeaderTitleStyle(route),
    });
  })
  if (isLoading) {
    return null;
  }

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
    case "Cart":
      return "Shopping Cart";
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
