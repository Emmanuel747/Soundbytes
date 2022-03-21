import React, { useState, useEffect } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { GlobalFeedComposer, PostManager } from "../../backend";
import Icon from "react-native-vector-icons/Ionicons";
import PostStyles from "./StyleSheets/PostStyles.jsx";
import BtnStyles from "./StyleSheets/BtnStyles.jsx";
import colors from "../colors";

const PlayIcon = ({ onPress, isPlaying }) => (
    <View
        style={{
            width: 60,
            height: 60,
            borderRadius: 60,
            borderColor: isPlaying ? colors.active : colors.disabled,
            borderWidth: 1,
            overflow: "visible",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isPlaying ? "white" : "white",
        }}>
        <Icon
            onPress={onPress}
            name={isPlaying ? "pause" : "play"}
            size={25}
            color={isPlaying ? colors.active : colors.disabled}
            style={{
                padding: 5,
                textAlign: "center",
            }}
        />
    </View>
);

export default function Post({ userName, profileImg, msgContent }) {
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleIsPlaying = () => setIsPlaying(!isPlaying);

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
        <View style={PostStyles.subContainer}>
            <PlayIcon isPlaying={isPlaying} onPress={toggleIsPlaying} />
            <View>
                <Text>{msgContent}</Text>
                <Text style={{ fontSize: 12 }}>- {userName}</Text>
            </View>
            {profileImg}
        </View>
    );
}
