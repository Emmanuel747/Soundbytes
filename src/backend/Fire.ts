// Temporary substitution for Firebase

class FireAuth implements IAuthenticator {
    authenticateUser(username: String, password: String): void {
        throw new Error("Method not implemented.");
    }
    updateProfile(details: Object): void {
        throw new Error("Method not implemented.");
    }
}

class FireDB implements IDatabase {
    updateUserProfile(user: any): void {
        throw new Error("Method not implemented.");
    }
    getFeedData(): Object {
        throw new Error("Method not implemented.");
    }
    getUserProfile(): Object {
        throw new Error("Method not implemented.");
    }
    createPost(post: Post): void {
        throw new Error("Method not implemented.");
    }
    updatePost(post: Post): void {
        throw new Error("Method not implemented.");
    }
}

export { FireAuth, FireDB };
