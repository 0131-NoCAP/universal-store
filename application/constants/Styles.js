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
    color: "#906bff",
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
    color: "#906bff",
    fontSize: 11,
  },
  wideBtn: {
    width: "80%",
    backgroundColor: "#906bff",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  disabledButton: {
    width: "80%",
    backgroundColor: "#C8C8C8",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
  },
  signupText: {
    marginTop: 20,
    color: "#906bff",
  },
  registerText: {
    marginBottom: 20,
    color: "#27B09B",
    fontSize: 18,
  },
  registerPageHead: {
    marginBottom: 35,
  },
  errorText: {
    color: "red",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#906bff",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  removeAddButton: {
    borderRadius: 20, 
    backgroundColor: '#bbb', 
    height: 25, 
    width: 25, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8, 
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5

  },
  cartStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#9c27b0',
    backgroundColor: '#27B09B'
  },
  containerItemStyle: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff'
  },
  imageCartStyle: {
    width: 50,
    height: 50,
    marginRight: 20
  },
  textCartStyle: {
    flex: 2,
    justifyContent: 'center'
  },
  counterCartStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
});

export { landingPageStyles };
