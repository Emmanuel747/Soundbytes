import { View, Text, Image } from "react-native";
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
  let post = {

    profileImg: 'https://scontent-hou1-1.xx.fbcdn.net/v/t1.6435-9/99247284_112192983841397_2650530713291456512_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=AaH9L8WMwgkAX8QfOQg&tn=s87eJZUFrT0lUneX&_nc_ht=scontent-hou1-1.xx&oh=00_AT_3hcU5XRd4lCkzl-6H8hg63eK2WGFrXpQWap3Z8dGzUg&oe=625AEB60',

  }

  let Image_URL = {uri: post.profileImg};
  return (
    <View style={PostStyles.subContainer}>
      {playIcon}
      <Text> {msgContent} {i} </Text>

      <Image source={{uri: 'https://scontent-hou1-1.xx.fbcdn.net/v/t1.6435-9/99247284_112192983841397_2650530713291456512_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=AaH9L8WMwgkAX8QfOQg&tn=s87eJZUFrT0lUneX&_nc_ht=scontent-hou1-1.xx&oh=00_AT_3hcU5XRd4lCkzl-6H8hg63eK2WGFrXpQWap3Z8dGzUg&oe=625AEB60'}} style = {{height: 400, resizeMode : 'stretch', margin: 5 }} />
      {profileImg}
    </View>
  );
}
