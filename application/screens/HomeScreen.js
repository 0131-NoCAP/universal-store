import * as React from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flex: 1 }} />
      <Text style={{ flex: 2, fontSize: 50, padding: 20, textAlign: "center" }}>
        <Text>Welcome, and thank you for shopping with </Text>
        <Text style={{ fontFamily: "pacifico", color: "#9c27b0" }}>lucky</Text>
      </Text>
      <View style={{ flex: 2 }} />
    </View>
  );
}
