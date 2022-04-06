import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authenticator } from "../../backend";

import { TextInput, TextButton } from "../components";
import { UserContext } from "../hooks/UserContext";

import "../Styles/AuthPage.scss";

export default function oldAuthPage() {
  const navigate = useNavigate();
  // const { setCurrentUID, setCurrentUsername } = useContext(UserContext);

  // Set Sign Up state
  const [upUsername, setUpUsername] = useState("");
  const [upEmail, setUpEmail] = useState("");
  const [upPassword, setUpPassword] = useState("");

  // Set Sign In state
  const [inEmail, setInEmail] = useState("");
  const [inPassword, setInPassword] = useState("");

  const handleSignIn = async (e) => {
    // Set all UserContext variables and call something
    // like signInWithEmailAndPassword() from Authenticator
    e.preventDefault();
    new Authenticator()
      .signIn(inEmail, inPassword)
      // .then((uid) => {
      //     setCurrentUID(uid);
      //     setCurrentUsername(upUsername);
      // })
      .then(() => navigate("/feed"))
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSignUp = async (e) => {
    // Set all UserContext variables and call something
    // like signUpWithEmailAndPassword() from Authenticator
    e.preventDefault();
    try {
      const uid = await new Authenticator().signUp(
        upUsername,
        upEmail,
        upPassword
      );
      // setCurrentUID(uid);
      // setCurrentUsername(upUsername);

      navigate("/feed");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Auth Page</h1>
      <form>
        <h2>Sign In</h2>
        <TextInput
          inputType='email'
          placeHolder='Email'
          setText={setInEmail}
        />
        <TextInput
          inputType='password'
          placeHolder='Password'
          setText={setInPassword}
        />
        <TextButton title='Submit' onClick={handleSignIn} />
      </form>
      <form>
        <h2>Sign Up</h2>
        <TextInput
          inputType='email'
          placeHolder='Email'
          setText={setUpEmail}
        />
        <TextInput placeHolder='Username' setText={setUpUsername} />
        <TextInput
          inputType='password'
          placeHolder='Password'
          setText={setUpPassword}
        />
        <TextButton title='Submit' onClick={handleSignUp} />
      </form>
    </div>
  );
}


