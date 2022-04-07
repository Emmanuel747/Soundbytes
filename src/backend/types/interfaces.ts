interface IFeedComposer {
    composeFeed(): Promise<Feed>;
}

interface IDatabase {
    getPost(pid: PID): Promise<Post>;
    makePost(post: Post): Promise<PID>;
    editPost(post: PostEditable, pid: PID, uid: UID): void;

    getUser(uid: UID): Promise<User>;
    makeUser(user: User, uid: UID): void;
    editUser(user: UserEditable, uid: UID): void;

    getUIDfromUsername(username: string): Promise<UID>;
    getAllPosts(): Promise<Post[]>;
    getPostsFromUsers(uids: UID[]): Promise<Post[]>;
    getAllUsernames(): Promise<string[]>;
}

interface IMediaStorage {
    getLink(path: string): Promise<string>;
    upload(path: string, file: Blob): void;
}

interface IPostBuilder {
    makePost(title: string, file: Blob, uid: UID, isReply: boolean): void;
    makeReply(
        parentPID: PID,
        parentUID: UID,
        title: string,
        file: Blob,
        uid: UID
    ): void;
    editLikes(uid: UID, pid: PID, delta: number): void;
}

interface IAuthenticator {
    signUp(username: string, email: string, password: string): Promise<UID>;
    signIn(email: string, password: string): Promise<UID>;
    signOut(): void;
}

interface IUserInteraction {
    follow(myUID: UID, otherUID: UID): void;
    unfollow(myUID: UID, otherUID: UID): void;
}
