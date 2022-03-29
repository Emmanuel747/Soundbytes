// TODO

// Abstract Factory Pattern

class AbstractFeedComposer implements IFeedComposer {
    composeFeed(): Feed {
        throw new Error("Method not implemented.");
    }
}

class GlobalFeedComposer extends AbstractFeedComposer {
    composeFeed(): Feed {
        // Return Database.getAllPosts()
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
        // Get current user's following list: UID[]
        // from Database.getUser
        // Return Database.getPostsFromUsers(following)
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
    // Might be necessary
    // user: string;

    // constructor(user: string) {
    //     super();
    //     this.user = user;
    // }

    composeFeed(): Feed {
        // Return Database.getPostsFromUsers([currentUID])
        // Note: the function expects an array,
        // so just have the one UID in the array
        return [
            {
                title: "Title from Profile",
                creator: "Zeke",
                timestamp: "1/1/22 10:42:36",
                likes: 0,
            },
        ] as Feed;
    }
}

export { GlobalFeedComposer, LocalFeedComposer, ProfileFeedComposer };
