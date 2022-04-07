import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    setDoc,
    updateDoc,
    where,
    query,
} from "firebase/firestore";
import { FireDB } from "../Fire";

class Database implements IDatabase {
    async getPost(pid: PID): Promise<Post> {
        // Simply get post by PID
        const postDoc = await getDoc(doc(FireDB, "posts", pid));

        if (postDoc.exists()) return postDoc.data() as Post;
        else throw new Error("Post does not exist.");
    }

    async makePost(post: Post): Promise<PID> {
        // Add a post to the 'posts' collection
        const postsRef = collection(FireDB, "posts");
        const addedDoc = await addDoc(postsRef, post);

        // Add pid to the post
        post.pid = addedDoc.id;
        await updateDoc(doc(postsRef, addedDoc.id), { pid: post.pid });

        // Add a post to the 'users/uid' document
        const userRef = doc(FireDB, "users", post.uid);
        const userPosts = await this.getPostsFromUsers([post.uid]);
        userPosts.push(post);
        await updateDoc(userRef, {
            posts: userPosts,
        });

        return post.pid;
    }

    async editPost(post: PostEditable, pid: PID, uid: UID): Promise<void> {
        // Finalize PostEditable changes
        const postDetails = await this.getPost(pid);

        if (post.replies !== undefined) {
            const existingReplies = postDetails.replies;
            post.replies.concat(existingReplies);
        }

        if (post.likes !== undefined) {
            const existingLikes = postDetails.likes;
            post.likes += existingLikes;
        }

        // Update posts in both docs with the changes

        // Update 'posts/pid' document
        const postPostRef = doc(FireDB, "posts", pid);
        await updateDoc(postPostRef, post);

        // Update 'users/uid' document
        const userPostRef = doc(FireDB, "users", uid);
        const user = await getDoc(userPostRef);
        let userPosts = (user.data() as User).posts;

        if (userPosts.length > 0) {
            const indexChangedPost = userPosts.findIndex((p) => p.pid === pid);
            userPosts[indexChangedPost] = Object.assign(
                userPosts[indexChangedPost],
                post
            );
        } else {
            userPosts = Object.assign(userPosts, post);
        }

        await updateDoc(userPostRef, {
            posts: userPosts,
        });
    }

    async getUser(uid: UID): Promise<User> {
        // Simply get user by UID
        if (!uid) {
            throw new Error("No uid in Database.getUser");
        }

        const userDoc = await getDoc(doc(FireDB, "users", uid));

        if (userDoc.exists()) return userDoc.data() as User;
        else throw new Error("User does not exist.");
    }

    async makeUser(user: User, uid: UID): Promise<void> {
        // Add a User to the 'users' collection
        // Add username to the 'usernames' doc in 'users'
        const userRef = doc(FireDB, "users", uid);
        await setDoc(userRef, user);

        const usernamesRef = doc(FireDB, "users", "usernames");
        const updatedUsername = { [user.username]: uid };
        await updateDoc(usernamesRef, updatedUsername);
    }

    async editUser(user: UserEditable, uid: string): Promise<void> {
        // Update doc with the changes
        const userRef = doc(FireDB, "users", uid);
        await updateDoc(userRef, user);
    }

    async getUIDfromUsername(username: string): Promise<UID> {
        // Get 'users/usernames' document, find given username, and return UID
        const usernames = await getDoc(doc(FireDB, "users", "usernames"));

        if (usernames.exists()) return usernames.data()[username];
        else throw new Error("No usernames found.");
    }

    async getAllPosts(): Promise<Post[]> {
        // Get every post from the server
        const postsRef = collection(FireDB, "posts");
        const q = query(postsRef, where("isReply", "!=", true));
        const allDocs = await getDocs(q);

        let posts: Post[] = [];
        allDocs.forEach((doc) => {
            posts.push(doc.data() as Post);
        });

        return posts;
    }

    async getPostsFromUsers(uids: UID[]): Promise<Feed> {
        // Get a list of all posts from a list of UIDs
        const listsOfPosts: Promise<Feed>[] = uids.map(async (uid) => {
            const userDoc = await getDoc(doc(FireDB, "users", uid));
            return (userDoc.data() as User).posts.filter(
                (post) => post.isReply !== true
            );
        });

        const posts: Feed = await Promise.all(listsOfPosts).then((results) =>
            results.flat()
        );

        return posts;
    }

    async getAllUsernames(): Promise<string[]> {
        // Grab all currently existing usernames, uid pairs
        const allUsernames = await getDoc(doc(FireDB, "users", "usernames"));
        if (allUsernames.exists()) return allUsernames.data() as string[];
        else throw new Error("No usernames found.");
    }
}

export { Database };
