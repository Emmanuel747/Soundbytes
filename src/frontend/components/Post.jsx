import { FlatList, ScrollView, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

import { GlobalFeedComposer, PostManager } from "../../backend";
import PostStyle from "./PostStyles";

export default function Post({ userName, profileImg, msgContent }) {
    const playIcon = (
        <Icon
            style={PostStyle.icon}
            name='playcircleo'
            size={60}
            color='blue'
        />
    );

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

    //Function to dynamically render post components
    let renderFeed = () => {
        let renderedFeed = [];
        for (let i = 15; i > 0; i--) {
            renderedFeed.push(
                <View key={i} style={PostStyle.subContainer}>
                    {playIcon}
                    <Text>
                        {" "}
                        {"Sleep is for the weak"} {i}{" "}
                    </Text>
                </View>
            );
        }
        return renderedFeed;
    };

    return (
        //ScrollView works as just a wrapper. FlatList has better performance
        //but requires props and data objects to work. I will try to upgrade later. ~eman
        <>
            {/*SoundByte Feed Section:
        - utilizes element varible created above
        - need to add onPress functionality  
      */}
            <ScrollView style={PostStyle.rootContainer}>
                <View key={-1} style={PostStyle.subContainer}>
                    {playIcon}
                    <Text> {"Sleep is for the weak"} [test div] </Text>
                </View>

                {renderFeed()}
            </ScrollView>
        </>
    );
}
