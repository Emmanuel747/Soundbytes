import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable } from "react-native";
import { GlobalFeedComposer, PostManager } from "../../backend";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import PostStyles from './StyleSheets/PostStyles.jsx';
import BtnStyles from './StyleSheets/BtnStyles.jsx';

export default function Post({ userName, profileImg, msgContent, i }) {

  const [isPlaying, setPlayingStatus] = useState(true);
  const playOrPause = () => {
    if (isPlaying === true) {
      setPlayingStatus(false)
    } else setPlayingStatus(true)
  }

  const playIcon = 
    <Pressable
      onPress={() => {
        playOrPause();
      }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? '#b8ab67'
            : 'rgb(46, 66, 219)'
        },
        BtnStyles.btnWrapper
      ]}>
      {({ pressed }) => (
        <Text style={styles.text}>
          {pressed ? 'Pressed!' : 'Press Me'}
        </Text>
      )}
      <AntDesignIcon
        style={BtnStyles.icon}
        name='playcircleo'
        size={40}
        color='rgb(46, 66, 219)'
      />
    </Pressable>
    ;

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
    <>
      <View style={PostStyles.subContainer}>
        {playIcon}
        <Text> {msgContent} {i} </Text>
        {profileImg}
      </View>
    </>
  );
}
