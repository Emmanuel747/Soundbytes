import { useState } from "react";

import { View, ScrollView, Button, Text } from "react-native";
import Post from "../components/Post";
import Feed from "../components/Feed";

import { GlobalFeedComposer, LocalFeedComposer } from "../../backend";

export default function FeedScreen() {
    // const feedComposer = new GlobalFeedComposer();
    // const postManager = new PostManager();

    // const getFeed = () => {
    //     // Call feedComposer.composeFeed()
    //     throw new Error("Method not implemented.");
    // };
    // const commentOnPost = () => {
    //     // Redirect to Recording page
    //     throw new Error("Method not implemented.");
    // };
    // const likePost = () => {
    //     // Call postManager.updatePost
    //     throw new Error("Method not implemented.");
    // };

    const [isOnGlobalFeed, setIsOnGlobalFeed] = useState(false);

    const showGlobalFeed = (state) => setIsOnGlobalFeed(state);

    return (
        <ScrollView>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-around",
                }}>
                <Button
                    title='Local Feed'
                    disabled={!isOnGlobalFeed}
                    onPress={() => showGlobalFeed(false)}
                />
                <Button
                    title='Global Feed'
                    disabled={isOnGlobalFeed}
                    onPress={() => showGlobalFeed(true)}
                />
            </View>
            <Text style={{ textAlign: "center" }}>
                {isOnGlobalFeed ? "GLOBAL" : "LOCAL"}
            </Text>

            {isOnGlobalFeed ? (
                <Feed feedFactory={new GlobalFeedComposer()} />
            ) : (
                <Feed feedFactory={new LocalFeedComposer()} />
            )}

            {/* <Feed feedFactory={new LocalFeedComposer()} /> */}
        </ScrollView>
    );
}
