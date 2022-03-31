import { useContext, useState } from "react";

import { TextInput, TextButton } from "../components";
import { UserContext } from "../hooks/UserContext";

export default function AuthPage() {
    const { currentUID, setCurrentUID, currentUsername, setCurrentUsername } =
        useContext(UserContext);

    const [username, setUsername] = useState("");

    const handleSignIn = () => {
        // Set all UserContext variables and call something
        // like signInWithEmailAndPassword() from Authenticator
        setCurrentUsername(username);
    };

    const handleSignUp = () => {
        // Set all UserContext variables and call something
        // like signUpWithEmailAndPassword() from Authenticator
        setCurrentUsername(username);
    };

    return (
        <div>
            <h1>Auth Page</h1>
            <div>
                <h2>Sign In</h2>
                <TextInput placeHolder='Username' setText={setUsername} />
                <TextInput inputType='password' placeHolder='Password' />
                <TextButton title='Submit' onClick={handleSignIn} />
            </div>
            <div>
                <h2>Sign Up</h2>
                <TextInput inputType='email' placeHolder='Email' />
                <TextInput placeHolder='Username' setText={setUsername} />
                <TextInput inputType='password' placeHolder='Password' />
                <TextButton title='Submit' onClick={handleSignUp} />
            </div>
        </div>
    );
}
