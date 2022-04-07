type UID = string;
type PID = string;

type User = {
    username: string;
    pfpURL: string;
    following: UID[];
    followers: UID[];
    posts: Feed;
    likedPosts: PID[];
};

type UserEditable = {
    pfpURL?: string;
    following?: UID[];
    followers?: UID[];
    likedPosts?: PID[];
};

type Post = {
    pid: PID;
    title: string;
    uid: UID;
    audioURL: string;
    timestamp: string;
    likes: number;
    isReply: boolean;
    replies: PID[];
};

type PostEditable = {
    likes?: number;
    replies?: PID[];
};

type Feed = Post[];
type getAllUsernames = [];
