import { FireAuth } from "./Fire";
import { Database } from "../backend/storage/Database";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

class Authenticator implements IAuthenticator {
    database: IDatabase = new Database();

    async signUp(
        username: string,
        email: string,
        password: string
    ): Promise<UID> {
        // Authenticate user
        const userCredential = await createUserWithEmailAndPassword(
            FireAuth,
            email,
            password
        );

        updateProfile(userCredential.user, { displayName: username });

        // Create new User object
        const uid = userCredential.user.uid;
        const newUser: User = {
            username: username,
            pfpURL: "https://picsum.photos/200",
            following: [],
            followers: [],
            posts: [],
            likedPosts: [],
        };

        // Update Database
        this.database.makeUser(newUser, uid);
        return uid;
    }

    async signIn(email: string, password: string): Promise<UID> {
        // Authenticate user
        const userCredential = await signInWithEmailAndPassword(
            FireAuth,
            email,
            password
        );

        return userCredential.user.uid;
    }

    signOut(): void {
        FireAuth.signOut();
    }
}

export { Authenticator };
