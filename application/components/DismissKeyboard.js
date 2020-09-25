import { Keyboard, TouchableWithoutFeedback } from "react-native";
import * as React from "react";

export default DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
