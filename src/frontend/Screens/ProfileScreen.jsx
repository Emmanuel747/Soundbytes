import { View, Text } from "react-native";
import { FireDB } from "../../backend";

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

    return (
        <View>
            <Text>Profile</Text>
        </View>
    );
}
