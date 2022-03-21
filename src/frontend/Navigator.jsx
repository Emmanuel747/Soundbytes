import React, { useState, useEffect } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "react-native-vector-icons/FontAwesome5";

import LoginScreen from "./screens/LoginScreen";
import FeedScreen from "./screens/FeedScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RecordingScreen from "./screens/RecordingScreen";

import colors from "./colors";

// Look into this for how to do the login auth flow
// https://reactnavigation.org/docs/auth-flow
// and this for the two tabs on the feed page
// https://reactnavigation.org/docs/screen-options-resolution -Z

const Tab = createBottomTabNavigator();

const Screens = {
    Feed: {
        name: "Feed",
        component: FeedScreen,
        icons: {
            normal: "list-ul",
            focused: "list-ul",
        },
    },
    Recording: {
        name: "Recording",
        component: RecordingScreen,
        options: {
            tabBarIcon: ({ focused, color, size }) => (
                <RecordButton focused={focused} color={color} size={size} />
            ),
        },
        icons: {
            normal: "microphone",
            focused: "microphone",
        },
    },
    Profile: {
        name: "Profile",
        component: ProfileScreen,
        options: {},
        icons: {
            normal: "user-alt",
            focused: "user-alt",
        },
    },
};

const RecordButton = ({ focused, color, size }) => {
    return (
        <View
            style={{
                backgroundColor: focused ? "white" : colors.primary,
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                alignItems: "center",
                width: 90,
                height: 90,
                elevation: 10,
                borderRadius: 200,
            }}>
            <Icon name='microphone' color={color} size={size * 1.5} />
        </View>
    );
};

export default function Navigator() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={Screens.Feed.name}
                screenOptions={({ route }) => ({
                    tabBarHideOnKeyboard: true,
                    headerTitleAlign: "center",
                    tabBarActiveTintColor: colors.active,
                    tabBarInactiveTintColor: colors.disabled,
                    // headerStyle: {},
                    // headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        height: 60,
                        padding: 0,
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        let screen = Screens[route.name];
                        if (screen)
                            return (
                                <Icon
                                    name={
                                        focused
                                            ? screen.icons.focused
                                            : screen.icons.normal
                                    }
                                    size={size}
                                    color={color}
                                />
                            );

                        // This is for the login page, since it is not defined in Screens
                        return <Icon name='lock' size={size} color={color} />;
                    },
                })}>
                {isSignedIn ? (
                    Object.entries(Screens).map(([key, val], i) => (
                        <Tab.Screen
                            name={key}
                            component={val.component}
                            options={val.options}
                            key={i} // Need key for rendering lists
                        />
                    ))
                ) : (
                    <Tab.Screen
                        name='Login'
                        children={({ props }) => (
                            <LoginScreen
                                {...props}
                                onSuccess={() => setIsSignedIn(true)}
                            />
                        )}
                    />
                )}
            </Tab.Navigator>
        </NavigationContainer>
    );
}
