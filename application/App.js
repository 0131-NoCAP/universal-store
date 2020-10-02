import * as React from "react";
import { Platform, StatusBar, StyleSheet } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";

import LandingPageNavigator from './navigation/LandingPageNavigator';
import { AuthContext } from './providers/auth';

import { login, register } from './api/mockapi';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';


Amplify.configure(awsconfig);

/**
 *  This is the entry point for the application
 */

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      let userToken;
      try {
        SplashScreen.preventAutoHide();
        userToken = await AsyncStorage.getItem("userToken");

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
          pacifico: require("./assets/fonts/Pacifico-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        dispatch({ type: "RESTORE_TOKEN", token: userToken });
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);
  // TODO: Move authContext to separate module in components
  const authContext = React.useMemo(
    () => ({
      signIn: async (email, password) => {
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        console.log("Email: " + email + " Pass: " + password)
        await Auth.signIn(email, password)
        Auth.currentSession().then(data => {
          dispatch({ type: 'SIGN_IN', token: data.accessToken.jwtToken });
        });
      },
      signOut: () => {
        dispatch({ type: "SIGN_OUT" });
        console.log("Logging out.");
      },

      signUp: async (firstName, lastName, email, password) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token
        console.log("First: " + firstName + " Last: " + lastName + " Email: " + email + " Pass: " + password);
        await Auth.signUp({
          username: email,
          password: password,
          attributes: { name: firstName + " " + lastName }
        });
        await Auth.signIn(email, password);
        Auth.currentSession().then(data => {
          dispatch({ type: 'SIGN_IN', token: data.accessToken.jwtToken });
        });

        // call register from api
      },
    }),
    []
  );

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    //console.log(process.env.REACT_APP_API_KEY);
    return (
      <AuthContext.Provider value={authContext}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <NavigationContainer
          ref={containerRef}
          initialState={initialNavigationState}
        >
          <Stack.Navigator>
            {state.userToken == null ? (
              // No token found, user isn't signed in
              <Stack.Screen
                name="SignIn"
                component={LandingPageNavigator}
                options={{
                  title: "lucky",
                  headerShown: false,
                  // When logging out, a pop animation feels intuitive
                  // You can remove this if you want the default 'push' animation
                  animationTypeForReplace: state.isSignout ? "pop" : "push",
                }}
              />
            ) : (
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
