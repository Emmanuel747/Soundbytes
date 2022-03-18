import { View, Text, StyleSheet, Image } from "react-native";
import { FireDB } from "../../backend";
import Post from "../components/Post";
import ProfileHeader from "../components/ProfileHeader";

export default function ProfileScreen() {
    const db = new FireDB();

    const getUserProfile = () => {
        // Call fireDB.getUserProfile()
        throw new Error("Method not implemented.");
    };

    const updateUserProfile = () => {
        // Call fireDB.updateUserProfile()
        throw new Error("Method not implemented.");
    };
    const string = "Testing Proptext";

    return (
        <>
            <ProfileHeader
                userName={"@badmamajama420"}
                statusMsg={'"I make great life decisions"'}
            />
            <Post msgContent={string} />
        <Image
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
        </>
    );
}
