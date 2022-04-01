interface IFeedComposer {
  composeFeed(): Promise<Feed>;
}

interface IDatabase {
  getPost(pid: PID): Promise<Post>;
  makePost(post: Post): void;
  editPost(post: PostEditable, pid: PID): void;

  getUser(uid: UID): Promise<User>;
  makeUser(user: User, uid: UID): void;
  editUser(user: UserEditable, uid: UID): void;

  getUIDfromUsername(username: string): Promise<UID>;
  getAllPosts(): Promise<Post[]>;
  getPostsFromUsers(uids: UID[]): Promise<Post[]>;
  getAllUsernames(): Promise<any[]>;
}

interface IMediaStorage {
  getLink(path: string): Promise<string>;
  upload(path: string, file: Blob): void;
}

interface IPostBuilder {
  makePost(title: string, file: Blob, uid: UID, username: string): void;
  makeReply(
    parentPID: PID,
    title: string,
    file: Blob,
    uid: UID,
    username: string
  ): void;
  editLikes(pid: PID, delta: number): void;
}

interface IAuthenticator {
  signUp(username: string, email: string, password: string): Promise<UID>;
  signIn(email: string, password: string): Promise<UID>;
  signOut(): void;
}
