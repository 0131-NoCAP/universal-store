import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../providers/auth";
import { createCheckout } from "../api/ApiRequestHandler";
import { landingPageStyles as styles } from "../constants/Styles";
export default function AccountScreen() {
  const authContext = React.useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flex: 2 }} />
      <TouchableOpacity
        onPress={() => authContext.signOut()}
        style={styles.wideBtn}
      >
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
