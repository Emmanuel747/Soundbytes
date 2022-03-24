import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Button,
} from "react-native";
import React, { useState } from "react";
import { FireAuth, UserManager } from "../../backend";

let correctAttempts = 0;
const auth = new FireAuth();

export default function LoginScreen({ onSuccess }) {
  const userManager = new UserManager();

  const [username, setUsername] = useState("Empty_Username_Field");
  const [password, setPassword] = useState("Empty_Password_Field");

  return (
    <SafeAreaView style={LoginStyle.rootContainer}>
      <SafeAreaView
        //adding addtional inline style to a styleobject ~eman
        style={[LoginStyle.subContainer, {borderRadius: 12,} ]}
      >
        <View style={LoginStyle.btnContainer}>
          <Text style={LoginStyle.titleText}>
            ♪ SoundBytes ♪
          </Text>
          <TextInput
            style={LoginStyle.inputbox}
            placeholder="username"
            onChangeText={(username) => setUsername(username)}
          />
          <TextInput
            style={LoginStyle.inputbox}
            secureTextEntry={true}
            placeholder="password"
            onChangeText={(password) => setPassword(password)}
          />
          {/*This 'enter' button will take in the inputted username and password 
            and check the database for a profile by calling Validate()*/}

          <Button
            onPress={() => {
              if (Validate(username, password)) {
                onSuccess();
              }
            }}
            title="Login"
          />
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
}

//This function passes the username and password inputs to the firebase authenticator, aka Fire.ts
//True authentication not yet implemented.
const Validate = (username, password) => {
  /* if (
        username.localeCompare("hello") == 0 &&
        password.localeCompare("goodbye") == 0
    ) {
        console.log(
            "You entered the right name and password " +
                correctAttempts +
                " times"
        );
        correctAttempts = correctAttempts + 1;
    } */

  if (auth.authenticateUser(username, password)) {
    return true;
  }
};

const LoginStyle = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    /*   backgroundColor: "#61E5F9", */
  },
  subContainer: {
    width: 350,
    height: 375,
    borderColor: "#000000",
    borderWidth: 4,
    justifyContent: "center",

  },
  btnContainer: {
    position: "absolute",
    top: -90,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 35,
    padding: 15,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  inputbox: {
    height: 60,
    width: 320,
    margin: 12,
    borderWidth: 3,
    borderRadius: 15,
    padding: 8,
    fontSize: 24,
    color: "black",
  }
});
