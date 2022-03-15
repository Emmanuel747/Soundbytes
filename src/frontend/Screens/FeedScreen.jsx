import { View, Text, StyleSheet } from "react-native";
import Post from './components/Post';

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
      <>

      </>
    );
}