import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import { Authenticator } from "../../backend";
import "../Styles/AuthPage.scss";

export default function AuthPage({ userData, setUserData, isAuth, setIsAuth }) {
    // userInput varible states ~Eman April 5, 2022
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [email, setEmail] = useState("");
    const [errMsgText, setErrMsgText] = useState("");

    const [emailIn, setEmailIn] = useState("");
    const [passwordIn, setPasswordIn] = useState("");

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

    // Sign in and sign up functions ~Eman April 6, 2022
    const navigate = useNavigate();
    const handleSignIn = async (e, emailIn, passwordIn) => {
        e.preventDefault();
        // setCurrentUsername(username);
        try {
            await new Authenticator().signIn(emailIn, passwordIn);
            setErrMsgText("Welcome back!");
            setTimeout(function () {
                navigate("/feed");
            }, 1500);
        } catch (err) {
            setErrMsgText("" + err);
            console.log(err);
        }
    };
    const handleSignUp = async (e, username, password, email) => {
        e.preventDefault();
        // setCurrentUsername(username);
        if (repassword === password) {
            try {
                const uid = await new Authenticator().signUp(
                    username,
                    email,
                    password
                );

                if (uid) {
                    setErrMsgText("Thank you for signing up! Please Login");
                    rmBounceL();
                    navigate("/feed");
                } else setErrMsgText("Something went wrong");
            } catch (err) {
                setErrMsgText("" + err);
                console.log(err);
            }
        } else setErrMsgText("Minimum 6 characters or Passwords Do not Match.");
        e.preventDefault();
    };
    return (
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
                                handleSignIn(e, emailIn, passwordIn);
                            }}>
                            <fieldset className='forms_fieldset'>
                                <div className='forms_field'>
                                    <input
                                        type='email'
                                        className='forms_field-input'
                                        required
                                        onChange={(e) => {
                                            setEmailIn(e.target.value);
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
                                        onChange={(e) => {
                                            setPasswordIn(e.target.value);
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
                                        onChange={(e) => {
                                            setUsername(e.target.value);
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
                                        onChange={(e) => {
                                            setEmail(e.target.value);
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
                                        onChange={(e) => {
                                            setPassword(e.target.value);
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
