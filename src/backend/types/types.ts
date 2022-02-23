type Post = {
    title: string;
    audio: File; // Temporary
    likes: number;
    comments: [Post]; // Maybe temporary
};

type Feed = [Post];

// Make type for user, profile details
