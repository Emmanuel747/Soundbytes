import { View, Text } from "react-native";
import { PostManager } from "../../backend";

export default function RecordingScreen() {
    const postManager = new PostManager();

    const createPost = () => {
        // Call postManager.createPost()
        throw new Error("Method not implemented.");
    };

    return (
        <View>
            <Text>Recording</Text>
        </View>
    );
}
