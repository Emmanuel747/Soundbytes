// Complete

import { Database } from "./storage/Database";

// Abstract Factory Pattern

class AbstractFeedComposer implements IFeedComposer {
    database: IDatabase;

    constructor() {
        this.database = new Database();
    }

    composeFeed(): Promise<Feed> {
        throw new Error("Method not implemented.");
    }
}

class GlobalFeedComposer extends AbstractFeedComposer {
    async composeFeed(): Promise<Feed> {
        // Get all posts from the database
        return (await this.database.getAllPosts()) as Feed;
    }
}

class LocalFeedComposer extends AbstractFeedComposer {
    uid: string;

    constructor(uid: string) {
        super();
        this.uid = uid;
    }

    async composeFeed(): Promise<Feed> {
        // Get current user's following list: UID[]
        // from Database.getUser, and then return all their posts
        const following = (await this.database.getUser(this.uid)).following;
        return this.database.getPostsFromUsers(following);
    }
}

class ProfileFeedComposer extends LocalFeedComposer {
    async composeFeed(): Promise<Feed> {
        // Return Database.getPostsFromUsers([currentUID])
        // Note: the function expects an array,
        // so just have the one UID in the array
        return (await this.database.getPostsFromUsers([this.uid])) as Feed;
    }
}

export { GlobalFeedComposer, LocalFeedComposer, ProfileFeedComposer };
