type Post = {
    pid?: string;
    title: string;
    creator: string;
    // audio: File;
    timestamp: string;
    likes: number;
    replies?: Post[] | string[]; // Post IDs
};

type Feed = Post[] | string[];

// Make type for user, profile details
