import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
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
        <View>
            <ProfileHeader
                userName='@badmamajama420'
                statusMsg='I make great life decisions'
            />
            <ScrollView>
                <Post msgContent={string} />
                <Image
                    source={{
                        uri: "https://i.vimeocdn.com/portrait/58832_300x300.jpg",
                    }}
                    style={{ width: 120, resizeMode: "center", margin: 5 }}
                />
            </ScrollView>
        </View>
    );
}
