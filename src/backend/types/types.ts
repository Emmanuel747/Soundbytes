type Post = {
    pid: string;
    title: string;
    creator: string;
    audio: File; // Temporary
    timestamp: string;
    likes: number;
    replies: [Post]; // Maybe temporary
};

type Feed = [Post];

// Make type for user, profile details
