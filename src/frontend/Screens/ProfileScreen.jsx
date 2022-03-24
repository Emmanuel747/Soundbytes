import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { FireDB } from "../../backend";
import Feed from "../components/Feed";
import ProfileHeader from "../components/ProfileHeader";
import { ProfileFeedComposer } from "../../backend";

export default function ProfileScreen() {
    // const db = new FireDB();
    // const getUserProfile = () => {
    //     // Call fireDB.getUserProfile()
    //     throw new Error("Method not implemented.");
    // };
    // const updateUserProfile = () => {
    //     // Call fireDB.updateUserProfile()
    //     throw new Error("Method not implemented.");
    // };

    return (
        <View>
            <ProfileHeader
                userName='@badmamajama420'
                statusMsg='I make great life decisions'
            />
            <ScrollView>
                <Feed
                    feedFactory={new ProfileFeedComposer("@badmamajama420")}
                />
            </ScrollView>
        </View>
    );
}
