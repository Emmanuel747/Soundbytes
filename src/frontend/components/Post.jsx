import { FlatList, ScrollView, View, Text, Image } from "react-native";
import { GlobalFeedComposer, PostManager } from "../../backend";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import PostStyles from './CSSRoutes';

export default function Post({ userName, profileImg, msgContent, i }) {
  const playIcon = <AntDesignIcon
    style={PostStyles.icon}
    name='playcircleo'
    size={60}
    color='blue'
  />;

  const feedComposer = new GlobalFeedComposer();
  const postManager = new PostManager();

  const getFeed = () => {
    // Call feedComposer.composeFeed()
    throw new Error("Method not implemented.");
  };
  const commentOnPost = () => {
    // Redirect to Recording page
    throw new Error("Method not implemented.");
  };
  const likePost = () => {
    // Call postManager.updatePost
    throw new Error("Method not implemented.");
  };

  return (
    <View key={i} style={PostStyles.subContainer}>
      {playIcon}
      <Text>"Sleep is for the weak " {i}</Text>
    </View>
  );
}
