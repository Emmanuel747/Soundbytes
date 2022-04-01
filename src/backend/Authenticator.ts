// TODO - these should all be pretty self-explanatory

import { FireDB, FireAuth } from "./Fire";
import { Database } from "../backend/storage/Database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

var auth = FireAuth;
class Authenticator implements IAuthenticator {
  database = new Database();

  async signUp(
    username: string,
    email: string,
    password: string
  ): Promise<string> {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Signed in
    const newUser: User = {
      username: username,
      pfpURL: "",
      following: [],
      followers: [],
      posts: [],
    };
    const uid = userCredential.user.uid;

    this.database.makeUser(newUser, uid);

    return uid;
  }

  async signIn(email: string, password: string): Promise<string> {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const uid = userCredential.user.uid;

    return uid;
  }

  signOut(): void {
    auth.signOut().then(function () {
      console.log("sign out was successful.");
    });
  }
}
