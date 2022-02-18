import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
    const handleClick = () => {
        console.log("clicked");
    };

    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <View style={{ backgroundColor: "#ff0000" }}>
                <Text style={styles.text}>Dumb text</Text>
            </View>
            <Button title='button' onClick={handleClick} />
            <StatusBar style='auto' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#fff",
    },
});
