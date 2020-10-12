import { StyleSheet } from "react-native";
import { logoColor } from "./Colors"

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
    color: '#9c27b0',
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
  wideBtn: {
    width: "80%",
    backgroundColor: "#27B09B",
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
    color: "#27B09B",
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
    backgroundColor: "#27B09B",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const headerStyles = StyleSheet.create({
  home: {
    fontFamily: "pacifico",
    fontSize: 32,
    color: logoColor,
    textAlign: "center",
    height: 70,
  }
});

const scanScreenStyles = StyleSheet.create({
  camera: {
    flex: 1
  },
  view2: {
    flex: 3,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'stretch'
  },
  view3: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'left',
    // justifyContent: 'left',
    borderBottomWidth: 1,
    padding: 5,
    margin: 'auto'
  },
  itemAddedHeader: {
    fontSize: 20,
    fontWeight: "bold"
  },
  view4: {
    alignItems: 'center',
    flex: 8,
    justifyContent: 'center',
    margin: 'auto'
  },
  itemAdded: {
    fontSize: 20,
    textAlign: 'center',
    margin: 'auto'
  },
  itemAddedImage: {
    width: 100,
    height: 100
  },
  view5: {
    fontSize: 20,
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    margin: 'auto'
  },
  view6: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: logoColor
  }
});

export { landingPageStyles, scanScreenStyles, headerStyles };
