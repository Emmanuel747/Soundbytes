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

var correctAttempts = 0;
const auth = new FireAuth();

export default function LoginScreen({ onSuccess }) {
  const userManager = new UserManager();

  const [username, setUsername] = useState("Empty_Username_Field");
  const [password, setPassword] = useState("Empty_Password_Field");

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView
        style={{
          width: 350,
          height: 380,
          borderColor: "#000000",
          borderWidth: 2,
          borderRadius: 9,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: -90,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 35,
              padding: 15,
              fontWeight: "bold",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            ♪ SoundBytes ♪
          </Text>
          <TextInput
            style={{
              height: 60,
              width: 320,
              margin: 12,
              borderWidth: 3,
              padding: 10,
              fontSize: 24,
              color: "black",
            }}
            placeholder="username"
            onChangeText={(username) => setUsername(username)}
          />
          <TextInput
            style={{
              height: 60,
              width: 320,
              margin: 12,
              borderWidth: 3,
              padding: 10,
              fontSize: 24,
              color: "black",
            }}
            secureTextEntry={true}
            placeholder="password"
            onChangeText={(password) => setPassword(password)}
          />
          {/*This 'enter' button will take in the inputted username and password and check the database for a profile by calling Validate()*/}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    /*   backgroundColor: "#61E5F9", */
  },
  textContainer: {
    fontSize: 34,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
  },
});
