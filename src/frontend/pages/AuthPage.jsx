import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextInput, TextButton } from "../components";
import { UserContext } from "../hooks/UserContext";

// import "../Styles/AuthPage.scss";

function EmanAuthPage({ userData, setUserData, isAuth, setIsAuth }) {
    const navigate = useNavigate();
    const { currentUID, setCurrentUID, currentUsername, setCurrentUsername } =
        useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [email, setEmail] = useState("");

    // const authBtns = document.getElementById('authBtn');
    const [errMsgText, setErrMsgText] = useState("");

    // Trigger functions for the bounce animation ~Eman, April 1, 2022
    const rmBounceR = () => {
        setErrMsgText("");
        const userForms = document.getElementById("user_options-forms");
        userForms.classList.remove("bounceRight");
        userForms.classList.add("bounceLeft");
    };
    const rmBounceL = () => {
        setErrMsgText("");
        //Create a delay/wait until DOM fully loaded before running the array.
        //And then make this a global varible again. ~Eman April 1, 2022
        const userForms = document.getElementById("user_options-forms");
        userForms.classList.remove("bounceLeft");
        userForms.classList.add("bounceRight");
    };
    const handleSignIn = (e, email, password) => {
        // Set all UserContext variables and call something
        // like signInWithEmailAndPassword() from Authenticator
        e.preventDefault();
        setCurrentUsername(username);
        //Hardcoded user account (Delete Later).
        if (email === "test@gmail.com") {
            try {
                //Insert Auth checker from Backend HERE <---

                setIsAuth(true);
                setUserData({
                    username: username,
                    email: email,
                });
                navigate("/feed");
            } catch (err) {
                setErrMsgText("" + err);
                console.log(err);
            }
        } else {
            setErrMsgText("Please type 'test@gmail.com' into username field");
        }
    };

    const handleSignUp = (e, username, password, email) => {
        // Set all UserContext variables and call something
        // like signUpWithEmailAndPassword() from Authenticator
        e.preventDefault();
        setCurrentUsername(username);

        if (repassword === password) {
            try {
                //Auth User functions goes HERE <---
                setTimeout(function () {
                    rmBounceL();
                    navigate("/");
                }, 2000);
                setErrMsgText("Thank you for signing up.");
            } catch (err) {
                setErrMsgText("" + err);
                console.log(err);
            }
        } else setErrMsgText("Minimum 6 characters or Passwords Do not Match.");
        e.preventDefault();
    };

    const devLogin = () => {
        setCurrentUsername("Test Man");
        setIsAuth(true);
        setUserData({
            username: "Dev Man",
            email: "test@gmail.com",
        });
        navigate("/feed");
    };

    return (
        // <div>
        //     <h1>Auth Page</h1>
        //     <div>
        //         <h2>Sign In</h2>
        //         <TextInput placeHolder='Username' setText={setUsername} />
        //         <TextInput inputType='password' placeHolder='Password' />
        //         <TextButton title='Submit' onClick={handleSignIn} />
        //     </div>
        //     <div>
        //         <h2>Sign Up</h2>
        //         <TextInput inputType='email' placeHolder='Email' />
        //         <TextInput placeHolder='Username' setText={setUsername} />
        //         <TextInput inputType='password' placeHolder='Password' />
        //         <TextButton title='Submit' onClick={handleSignUp} />
        //     </div>
        // </div>
        <section className='user'>
            <div className='user_options-container'>
                <div className='user_options-text'>
                    <div className='user_options-unregistered'>
                        <h2 className='user_unregistered-title'>
                            Don't have a SoundBytes🎙 account?
                        </h2>
                        <p className='user_unregistered-text'>
                            Join SoundBytes🎙 now and start posting today!
                        </p>
                        <button
                            className='user_unregistered-signup'
                            id='signup-button'
                            onClick={rmBounceR}>
                            Sign up
                        </button>
                    </div>

                    <div className='user_options-registered'>
                        <h2 className='user_registered-title'>
                            Have a SoundBytes🎙 account?
                        </h2>
                        <p className='user_registered-text'>
                            Already have an Account? Login Here.
                        </p>
                        <button
                            className='user_registered-login'
                            id='login-button'
                            onClick={rmBounceL}>
                            Login
                        </button>
                    </div>
                </div>

                <div className='user_options-forms' id='user_options-forms'>
                    <div className='user_forms-login'>
                        <h2 className='forms_title'>Login</h2>
                        <div id='errMsg' style={{ color: "#ff0808" }}>
                            {errMsgText}
                        </div>

                        {/* The Login Form */}
                        <form
                            className='forms_form'
                            onSubmit={(e) => {
                                handleSignIn(e, username, password);
                            }}>
                            <fieldset className='forms_fieldset'>
                                <div className='forms_field'>
                                    <input
                                        type='email'
                                        className='forms_field-input'
                                        required
                                        onChange={(event) => {
                                            setUsername(event.target.value);
                                        }}
                                    />
                                    <label className='forms_field-label'>
                                        Email
                                    </label>
                                </div>
                                <div className='forms_field'>
                                    <input
                                        type='password'
                                        className='forms_field-input'
                                        minLength='6'
                                        required
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                        }}
                                    />
                                    <label className='forms_field-label'>
                                        Password
                                    </label>
                                </div>
                            </fieldset>
                            <div className='forms_buttons'>
                                <button
                                    type='button'
                                    className='forms_buttons-forgot'>
                                    Forgot password?
                                </button>
                                {/* Button for logging in with hardcoded test account  */}
                                <button
                                    type='button'
                                    className='forms_buttons-forgot'
                                    style={{ color: "red" }}
                                    onClick={devLogin}>
                                    DevTool: Login w/ TestUser
                                </button>
                                <input
                                    type='submit'
                                    value='Login'
                                    className='forms_buttons-action'
                                />
                            </div>
                        </form>
                    </div>
                    <div className='user_forms-signup'>
                        <h2 className='forms_title'>Sign Up</h2>
                        <div id='errMsg' style={{ color: "#ff0808" }}>
                            {errMsgText}
                        </div>

                        {/* The Sign Up Form */}
                        <form
                            className='forms_form'
                            onSubmit={(e) => {
                                handleSignUp(e, username, password, email);
                            }}>
                            <fieldset className='forms_fieldset'>
                                <div className='forms_field'>
                                    <input
                                        type='text'
                                        className='forms_field-input'
                                        required
                                        onChange={(event) => {
                                            setUsername(event.target.value);
                                        }}
                                    />
                                    <label className='forms_field-label'>
                                        Username
                                    </label>
                                </div>
                                <div className='forms_field'>
                                    <input
                                        type='email'
                                        className='forms_field-input'
                                        required
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                        }}
                                    />
                                    <label className='forms_field-label'>
                                        Email
                                    </label>
                                </div>
                                <div className='forms_field'>
                                    <input
                                        type='password'
                                        className='forms_field-input'
                                        required
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                        }}
                                    />
                                    <label className='forms_field-label'>
                                        Password
                                    </label>
                                </div>
                                <div className='forms_field'>
                                    <input
                                        type='password'
                                        className='forms_field-input'
                                        required
                                        onChange={(e) => {
                                            setRepassword(e.target.value);
                                        }}
                                    />
                                    <label className='forms_field-label'>
                                        Confirm Password
                                    </label>
                                </div>
                            </fieldset>
                            <div className='forms_buttons'>
                                <input
                                    type='submit'
                                    value='Sign up'
                                    className='forms_buttons-action'
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function AuthPage() {
    const navigate = useNavigate();
    const { setCurrentUID, setCurrentUsername } = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSignIn = (email, password) => {
        // Set all UserContext variables and call something
        // like signInWithEmailAndPassword() from Authenticator
    };

    const handleSignUp = (username, password, email) => {
        // Set all UserContext variables and call something
        // like signUpWithEmailAndPassword() from Authenticator
    };

    return (
        <div>
            <h1>Auth Page</h1>
            <form>
                <h2>Sign In</h2>
                <TextInput placeHolder='Username' setText={setUsername} />
                <TextInput inputType='password' placeHolder='Password' />
                <TextButton title='Submit' onClick={handleSignIn} />
            </form>
            <form>
                <h2>Sign Up</h2>
                <TextInput inputType='email' placeHolder='Email' />
                <TextInput placeHolder='Username' setText={setUsername} />
                <TextInput inputType='password' placeHolder='Password' />
                <TextButton title='Submit' onClick={handleSignUp} />
            </form>
        </div>
    );
}
