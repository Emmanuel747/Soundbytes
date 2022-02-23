import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import Navigator from "./src/frontend/Navigator";

export default function App() {
    return (
        <View style={{ height: "100%" }}>
            <Navigator />
            <StatusBar />
        </View>
    );
}

const styles = StyleSheet.create({});
