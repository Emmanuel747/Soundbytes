// Complete

import { Database } from "./storage/Database";

// Abstract Factory Pattern

class AbstractFeedComposer implements IFeedComposer {
    database: IDatabase = new Database();

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
    uid: UID;

    constructor(uid: UID) {
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
        // Get feed composed of just a specific user's posts
        return (await this.database.getPostsFromUsers([this.uid])) as Feed;
    }
}

export { GlobalFeedComposer, LocalFeedComposer, ProfileFeedComposer };
