import { View, Text } from "react-native";
import { FireAuth, UserManager } from "../../backend";

export default function LoginScreen() {
    const userManager = new UserManager();
    const auth = new FireAuth();

    const createUser = () => {
        // Call userManager.createUser(user)
        throw new Error("Method not implemented.");
    };

    const authUser = () => {
        // Call auth.authenticateUser();
        throw new Error("Method not implemented.");
    };

    return (
        <View>
            <Text>Login</Text>
        </View>
    );
}
