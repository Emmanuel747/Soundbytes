import { FireDB } from ".";

// Potential Abstract Factory
class AbstractFeedComposer implements IFeedComposer {
    database: IDatabase;

    composeFeed(): Feed {
        throw new Error("Method not implemented.");
    }
}

class GlobalFeedComposer extends AbstractFeedComposer {
    // type Post = {
    //     pid?: string;
    //     title: string;
    //     creator: string;
    //     audio: File;
    //     timestamp: string;
    //     likes: number;
    //     replies?: [String]; // Post IDs
    // };

    composeFeed(): Feed {
        return [
            {
                title: "Title from Global",
                creator: "ZekeIsCool",
                timestamp: "1/1/22 10:42:31",
                likes: 0,
            },
            {
                title: "Title",
                creator: "ZekeIsCool",
                timestamp: "1/1/22 10:42:32",
                likes: 0,
            },
        ] as Feed;
    }
}

class LocalFeedComposer extends AbstractFeedComposer {
    composeFeed(): Feed {
        return [
            {
                title: "Title from Local",
                creator: "ZekeIsCool",
                timestamp: "1/1/22 10:42:33",
                likes: 0,
            },
            {
                title: "Title",
                creator: "ZekeIsCool",
                timestamp: "1/1/22 10:42:34",
                likes: 0,
            },
            {
                title: "Title",
                creator: "ZekeIsCool",
                timestamp: "1/1/22 10:42:35",
                likes: 0,
            },
        ] as Feed;
    }
}

class ProfileFeedComposer extends AbstractFeedComposer {
    // username or uid
    user: string;

    constructor(user: string) {
        super();
        this.user = user;
    }

    composeFeed(): Feed {
        return [
            {
                title: "Title from Profile",
                creator: this.user,
                timestamp: "1/1/22 10:42:36",
                likes: 0,
            },
        ] as Feed;
    }
}

export { GlobalFeedComposer, LocalFeedComposer, ProfileFeedComposer };
