import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import colors from "./src/frontend/colors";

import Navigator from "./src/frontend/Navigator";

export default function App() {
    return (
        <View style={{ height: "100%" }}>
            <Navigator />
            <StatusBar
                style='light'
                backgroundColor={colors.primary}
                Animation='slide'
            />
        </View>
    );
}

const styles = StyleSheet.create({});
