import { View, Text, Image, TouchableHighlight } from "react-native";
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import PostStyle from './PostStyles';

export default function ProfileHeader({userName, profileImg, statusMsg, msgContent, followers, following}) {
  //Icon / Button varibles
  const homeIcon = <Icon style={PostStyle.icon2} name="home" size={25} color="blue" />;
  const menuIcon = <Icon style={PostStyle.icon2} name="menufold" size={25} color="blue" />
  
  //API request
  const getFeed = () => {
      // Call feedComposer.composeFeed()
      throw new Error("Method not implemented.");
  };

  //react State managment practice
  const [count, setCounter] = useState(0);
  const [followCount, setFollowCount] = useState(100);
  const [moreStuff, setMoreStuff] = useState();

  //dummy count functions for following
  const setCount = () => {
    setCounter(count + 1);
  };
  const minusFollowing = () => {
    setFollowCount(followCount - 1);
  };

  return (
    //ScrollView works as just a wrapper. FlatList has better performance
    //but requires props and data objects to work. I will try to upgrade later. ~eman
    <>
      <View>
        <View style={PostStyle.headerBtnContainer}>
          {homeIcon} 
          {menuIcon}
        </View>
        {/* Header: middle section */}
        <View style={PostStyle.imgContainer}>
          <Image
            style={PostStyle.Logo}
            source={{ uri: 'https://cdn.discordapp.com/attachments/178196683727962112/953082990806831176/unknown.png' }}
            size={50}
          />
          <Text style={{ textAlign: 'center' }}> {userName} </Text>
          <Text style={PostStyle.centerRowAligment}>{statusMsg}</Text>
          <View style={PostStyle.subInfo}>
            <Text onPress={() => {setCount()}}> Followers: {count}</Text>
            <Text onPress={() => {minusFollowing()}}> Following: {followCount} </Text>
          </View>
        </View>
      </View>
    </>
  );
}