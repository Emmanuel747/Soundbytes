// TODO

import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
} from "firebase/firestore";
import { FireDB } from "../Fire";

class Database implements IDatabase {
    getPost(pid: string): Post {
        // Simply get post by PID
        throw new Error("Method not implemented.");
    }

    makePost(post: Post): void {
        // Add a post to the 'posts' collection
        //   + the 'users' collection (users/UID/post)
        throw new Error("Method not implemented.");
    }

    editPost(post: PostEditable, pid: string): void {
        // Update doc with the changes
        // WARNING: change in bot 'users' and 'posts'
        // (We have redundant data on purpose)
        throw new Error("Method not implemented.");
    }

    getUser(uid: string): Promise<User> {
        // Simply get user by UID
        throw new Error("Method not implemented.");
    }

    makeUser(user: User, uid: string): void {
        // Add a User to the 'users' collection
        // Add username to the 'usernames' doc in 'users'
        //
        // This one will probably be odd because FireAuth stores
        // some things about the user (like password, uid,
        // and email) behind the scenes in its own database.
        // DON'T ADD THE PASSWORD
        throw new Error("Method not implemented.");
    }

    editUser(user: UserEditable, uid: string): void {
        // Update doc with the changes
        throw new Error("Method not implemented.");
    }

    async getUIDfromUsername(username: string): Promise<UID> {
        // Get users/usernames, find given username, and return UID
        const docRef = doc(FireDB, "users", "usernames");
        const usernames = await getDoc(docRef);

        if (usernames.exists()) return usernames.data().uid;
        else throw new Error("No usernames found");
    }

    async getAllPosts(): Promise<Post[]> {
        // Get every post from the server
        const postsRef = collection(FireDB, "posts");
        const allDocs = await getDocs(postsRef);

        let posts: Post[] = [];
        allDocs.forEach((doc) => {
            posts.push(doc.data() as Post);
        });

        return posts;
    }

    async getPostsFromUsers(uids: string[]): Promise<Post[]> {
        // Get a list of all posts from a list of UIDs
        const usersRef = collection(FireDB, "users");

        const posts: Post[] = [];

        uids.forEach(async (uid) => {
            const userDoc = await getDoc(doc(usersRef, uid));
            if (userDoc.exists()) posts.concat(userDoc.data() as Post[]);
        });

        return posts;
    }

    async getAllUsernames(): Promise<any[]> {
        // Grab all currently existing usernames, uid pairs
        const usernamesRef = doc(collection(FireDB, "users"), "usernames");
        const allUsernames = await getDoc(usernamesRef);
        return allUsernames.data() as any[];
    }
}

export { Database };
