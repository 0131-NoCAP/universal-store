import * as React from "react";
import { View } from "react-native";
import { landingPageStyles as styles } from "../constants/Styles";
import {
  CreditCardInput,
  LiteCreditCardInput,
} from "react-native-credit-card-input";
// import DismissKeyboard from "../components/DismissKeyboard";

export default function PaymentMethodScreen() {
  return (
    // <DismissKeyboard>
      <View>
        <CreditCardInput onChange={() => {}} allowScroll />
      </View>
    /* </DismissKeyboard> */
  );
}
