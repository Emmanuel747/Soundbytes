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
    posts?: Feed;
    likedPosts: PID[];
};

type Post = {
    title: string;
    uid: UID;
    audioURL: string;
    timestamp: string;
    likes: number;
    replies: Feed;
    deleted: boolean;
};

type PostEditable = {
    likes?: number;
    replies?: Feed;
    deleted?: boolean;
};

type Feed = Post[];
