import { View, Text, Image, StyleSheet } from "react-native";
import { PostManager } from "../../backend";
export default function RecordingScreen() {
    const postManager = new PostManager();

    const createPost = () => {
        // Call postManager.createPost()
        throw new Error("Method not implemented.");
    };
// note: eman look up stuff for img 
    return (
        <View style={styles.container}>
            <Image onPress={() => {createPost()}} 
                style={styles.logo} source={{uri: 'https://images.squarespace-cdn.com/content/v1/614aadf6877b2634485954d0/b90c27ad-592e-4a7c-879b-00af65a421dc/voice.png?format=750w'}} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 50,
      backgroundColor: 'lightgrey',
      flexDirection: 'row',
      alignItems: "center",
      textAlign: 'center',
      paddingHorizontal: 10,
      justifyContent: "center"
    },
    logo: {
      width: 500,
      height: 500
    }
  });
