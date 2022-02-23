import { View, Text } from "react-native";

import { GlobalFeedComposer, PostManager } from "../../backend";

export default function FeedScreen() {
    const feedComposer = new GlobalFeedComposer();
    const postManager = new PostManager();

    const getFeed = () => {
        // Call feedComposer.composeFeed()
        throw new Error("Method not implemented.");
    };

    const commentOnPost = () => {
        // Redirect to Recording page
        throw new Error("Method not implemented.");
    };

    const likePost = () => {
        // Call postManager.updatePost
        throw new Error("Method not implemented.");
    };

    return (
        <View>
            <Text>Feed</Text>
        </View>
    );
}
