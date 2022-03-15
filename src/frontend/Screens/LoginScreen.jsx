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

export default function LoginScreen() {
  const userManager = new UserManager();
  const auth = new FireAuth();

  const [username, setUsername] = useState("Empty_Username_Field");
  const [password, setPassword] = useState("Empty_Password_Field");

  return (

    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{
        width: 350,
        height: 380,
        borderColor: '#000000',
        borderWidth: 2,
        borderRadius: 9,
        justifyContent: 'center',
      }}>
        <View
          style={{
            position: "absolute",
            top: -90,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 35, padding: 15, fontWeight: 'bold', justifyContent: "center", alignItems: "center", }}>♪ SoundBytes ♪</Text>
          <TextInput
            style={{
              height: 60,
              width: 320,
              margin: 12,
              borderWidth: 3,
              padding: 10,
              fontSize: 24,
              color: "red",
            }}
            placeholder='username'
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
              color: "blue",
            }}
            placeholder='password'
            onChangeText={(password) => setPassword(password)}
          />
          {/*This 'enter' button will take in the inputted username and password and check the database for a profile by calling Validate()*/}

          <Button
            onPress={() => Validate(username, password)}
            title='Login'
          />

        </View>
      </SafeAreaView>
    </SafeAreaView>

  );
}

{
  /*Called upon pressing the enter button on the login page.
  TODO: Check if the username and password has a match to a user profile in the database.
*/
}
const Validate = (username, password) => {
  if (
    username.localeCompare("hello") == 0 &&
    password.localeCompare("goodbye") == 0
  ) {
    console.log(
      "You entered the right name and password " +
      correctAttempts +
      " times"
    );
    correctAttempts = correctAttempts + 1;
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

    backgroundColor: 'black',
  },
});
