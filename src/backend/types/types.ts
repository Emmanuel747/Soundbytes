type UID = string;
type PID = string;

type User = {
    username: string;
    pfpURL: string;
    following: User[];
    followers: User[];
    posts: Feed;
};

type UserEditable = {
    pfpURL?: string;
    following?: UID[];
    followers?: UID[];
    posts?: Feed;
};

type Post = {
    title: string;
    creator: UID; // Might need to be User
    audioURL: string;
    timestamp: string;
    likes: number;
    replies: Feed;
};

type PostEditable = {
    likes?: number;
    replies?: Feed;
};

type Feed = Post[] | PID[];
