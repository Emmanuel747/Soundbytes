import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProfileScreen from "./Screens/ProfileScreen";
import RecordingScreen from "./Screens/RecordingScreen";
import LoginScreen from "./Screens/LoginScreen";
import FeedScreen from "./Screens/FeedScreen";

const Tab = createBottomTabNavigator();

const Screens = {
  Profile: {
    name: "Profile",
    component: ProfileScreen,
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
        initialRouteName={Screens.Profile.name}
        screenOptions={({ route }) => ({
          headerTitleAlign: "center",
          tabBarHideOnKeyboard: true,
        })}
      >
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
