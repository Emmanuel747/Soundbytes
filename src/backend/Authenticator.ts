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

        // Generate random profile picture
        const getRandomColor = () => {
            const colors: string[] = [
                "blue",
                "green",
                "orange",
                "purple",
                "red",
                "yellow",
            ];
            const i = Math.floor(Math.random() * colors.length);
            return colors[i];
        };
        // const pfpURL = "https://picsum.photos/200";
        const pfpURL = `https://firebasestorage.googleapis.com/v0/b/notify-soundbytes.appspot.com/o/images%2Fpfp-${getRandomColor()}.png?alt=media&token=4ade9de8-9f89-40c3-a9ff-9a75f73fc175`;

        // Create new User object
        const uid = userCredential.user.uid;
        const newUser: User = {
            username: username,
            pfpURL: pfpURL,
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
