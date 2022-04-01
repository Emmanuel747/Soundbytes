import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { TextInput, TextButton } from "../components";
import { UserContext } from "../hooks/UserContext";

import '../Styles/AuthPage.scss';

export default function AuthPage() {
  const navigate = useNavigate();
    const { currentUID, setCurrentUID, currentUsername, setCurrentUsername } =
      useContext(UserContext);

    const userForms = document.getElementById('user_options-forms');
    const authBtns = document.getElementById('authBtn');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [email, setEmail] = useState("");
    const [errMsgText, setErrMsgText] = useState("");

    const rmBounceR = () => {
      setErrMsgText("");
      userForms.classList.remove('bounceRight');
      userForms.classList.add('bounceLeft');
    }
    const rmBounceL = () => {
      setErrMsgText("");
      userForms.classList.remove('bounceLeft');
      userForms.classList.add('bounceRight');
    }

    
    const handleSignIn = (e, email, password) => {
      // Set all UserContext variables and call something
      // like signInWithEmailAndPassword() from Authenticator
      e.preventDefault();
      setCurrentUsername(username);
      
      //Hardcoded user account.
      if (email === 'test@gmail.com') {
        try {
  
          //Insert Auth checker from Backend HERE <---

          navigate('/Feed');
        } catch (err) {
          setErrMsgText("" + err);
          console.log(err);
        }
      } else {
        setErrMsgText("Please type 'test@gmail.com' into username field");
      }
    };

    const handleSignUp = ( e, username, password, email) => {
        // Set all UserContext variables and call something
        // like signUpWithEmailAndPassword() from Authenticator
        e.preventDefault();
        setCurrentUsername(username);

        if (repassword === password) {
          try {

            //Auth User functions goes HERE <---
            setTimeout(function() {
              rmBounceL();
              navigate('/');

            }, 2000);
            setErrMsgText("Thank you for signing up.");
            
          } catch (err) {
            setErrMsgText("" + err);
            console.log(err);
          }
        } else 
          setErrMsgText("Minimum 6 characters or Passwords Do not Match.");
          e.preventDefault();
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
        <section class="user">
        <div class="user_options-container">
          <div class="user_options-text">
            <div class="user_options-unregistered">
              <h2 class="user_unregistered-title">Don't have a SoundBytes🎙 account?</h2>
              <p class="user_unregistered-text">
                Join SoundBytes🎙 now and start posting today!
              </p>
              <button class="user_unregistered-signup" id="signup-button"
                onClick={rmBounceR}
              >
                Sign up
              </button>
            </div>
  
            <div class="user_options-registered">
              <h2 class="user_registered-title">Have a SoundBytes🎙 account?</h2>
              <p class="user_registered-text">
                Already have an Account? Login Here.
              </p>
              <button 
                class="user_registered-login" 
                id="login-button"
                onClick={rmBounceL}
              >
                Login
              </button>
            </div>
          </div>
  
          <div class="user_options-forms" id="user_options-forms">
            <div class="user_forms-login">
              <h2 class="forms_title">Login</h2>
              <div id="errMsg" style={{color: '#ff0808'}} > {errMsgText} </div> 
  
              {/* The Login Form */}
              <form class="forms_form" onSubmit={(e) => {handleSignIn( e, username, password)}}>
                <fieldset class="forms_fieldset">
                  <div class="forms_field">
                    <input type="email" class="forms_field-input" required 
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                    />
                    <label class="forms_field-label">Email</label>
                  </div>
                  <div class="forms_field">
                    <input type="password" class="forms_field-input" minLength="6" required 
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                    <label class="forms_field-label">Password</label>
                  </div>
                </fieldset>
                <div class="forms_buttons">
                  <button type="button" class="forms_buttons-forgot">
                    Forgot password?
                  </button>
                  <input
                    type="submit"
                    value="Login"
                    class="forms_buttons-action"
                    id="authBtn"                 
                  />
                </div>
              </form>
            </div>
            <div class="user_forms-signup">
              <h2 class="forms_title">Sign Up</h2>
              <div id="errMsg" style={{color: '#ff0808'}}> {errMsgText} </div>
  
              {/* The Sign Up Form */}
              <form class="forms_form" onSubmit={(e) => {handleSignUp( e, username, password, email)}}>
                <fieldset class="forms_fieldset">
                  <div class="forms_field">
                    <input type="text" class="forms_field-input" required 
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }} 
                    />
                    <label class="forms_field-label"> Username </label>
                  </div>
                  <div class="forms_field">
                    <input type="email" class="forms_field-input" required 
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }} 
                    />
                    <label class="forms_field-label"> Email </label>
                  </div>
                  <div class="forms_field">
                    <input type="password" class="forms_field-input" required 
                      onChange={(event) => {
                        setPassword(event.target.value);                     
                      }} 
                    />
                    <label class="forms_field-label">Password</label>
                  </div>
                  <div class="forms_field">
                    <input type="password" class="forms_field-input" required
                      onChange={(e) => {
                        setRepassword(e.target.value);
                      }}
                    />
                    <label class="forms_field-label">Confirm Password</label>
                  </div>
                </fieldset>
                <div class="forms_buttons">
                  <input
                    type="submit"
                    value="Sign up"
                    class="forms_buttons-action"
                    id="authBtn"              
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
}
