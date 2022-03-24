interface IFeedComposer {
    database: IDatabase;
    composeFeed(): Feed;
}

interface IDatabase {
    getFeedData(): Object;
    getUserProfile(): Object;
    updateUserProfile(user: any): void;
    createPost(post: Post): void;
    updatePost(post: Post): void;
}

interface IAuthenticator {
    authenticateUser(username: String, password: String): void;
    updateProfile(details: Object): void;
}

interface IUserManager {
    validator: IValidator;
    database: IDatabase;
    submitOnValid(user: any): void;
    updateUser(user: any): void;
    createUser(user: any): void;
}

interface IValidator {
    validate(data: any): boolean;
}

interface IPostManager {
    createPost(title: string, recording): void;
    updatingPost(post: Post): void;
}
