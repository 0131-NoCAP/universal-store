import { StyleSheet } from "react-native";

const landingPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontFamily: "pacifico",
    fontSize: 120,
    color: "#9c27b0",
    marginBottom: 60,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderLeftColor: "black",
    borderLeftWidth: 1,
    borderRightColor: "black",
    borderRightWidth: 1,
    borderTopColor: "black",
    borderTopWidth: 1,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
  },
  forgot: {
    textAlign: "left",
    alignSelf: "stretch",
    color: "#27B09B",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#27B09B",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  disabledLoginButton: {
    width: "80%",
    backgroundColor: "#C8C8C8",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  signupText: {
    marginTop: 20,
    color: "#27B09B",
  },
  registerText: {
    marginBottom: 20,
    color: "#27B09B",
    fontSize: 18,
  },
});

export { landingPageStyles };
