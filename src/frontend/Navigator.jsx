//npm Packages
import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Screens
import LoginScreen from "./screens/LoginScreen";
import FeedScreen from "./screens/FeedScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RecordingScreen from "./screens/RecordingScreen";

//React Icons from installed packages [03/17/22]
import Icon from "react-native-vector-icons/AntDesign";
import IconSet2 from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import PostStyles from "./components/StyleSheets/PostStyles.jsx";

const Tab = createBottomTabNavigator();
const homeIcon = (
    <Icon style={PostStyles.icon2} name='home' size={25} color='blue' />
);

const Screens = {
    Profile: {
        name: "Profile",
        component: ProfileScreen,
        IconSet2: {
            normal: "crown",
            focused: "crown-outline",
        },
    },
    Recording: {
        name: "Recording",
        component: RecordingScreen,
    },
    Login: {
        name: "Login",
        component: LoginScreen,
    },
    Feed: {
        name: "Feed",
        component: FeedScreen,
    },
};

export default function Navigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={Screens.Feed.name} //Default Screen
                screenOptions={({ route }) => ({
                    headerTitleAlign: "center",
                    tabBarHideOnKeyboard: true,

                    // This function will handle icons within the nav bar -Miguel 3/16/22
                    // Can't use empty strings with Text component
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Profile") {
                            iconName = focused ? "profile" : "user";
                            return (
                                <Icon
                                    name={iconName}
                                    size={size}
                                    color={color}
                                />
                            );
                        }
                        if (route.name === "Recording") {
                            return (iconName = focused ? (
                                <AwesomeIcon
                                    name='microphone'
                                    size={size}
                                    color={color}
                                />
                            ) : (
                                <FeatherIcon
                                    name='mic'
                                    size={size}
                                    color={color}
                                />
                            ));
                        }
                        if (route.name === "Login") {
                            return (iconName = focused ? (
                                <Text>👀</Text>
                            ) : (
                                <Text>🔨</Text>
                            ));
                        }
                        if (route.name === "Feed") {
                            return (iconName = focused ? (
                                <Ionicons
                                    name='md-home'
                                    size={size}
                                    color={color}
                                />
                            ) : (
                                <Ionicons
                                    name='md-home-outline'
                                    size={size}
                                    color={color}
                                />
                            ));
                        }
                    },
                })}>
                {Object.entries(Screens).map(([key, val], i) => (
                    <Tab.Screen
                        name={key}
                        component={val.component}
                        key={i} // Need key for rendering lists
                    />
                ))}
            </Tab.Navigator>
        </NavigationContainer>
    );
}
