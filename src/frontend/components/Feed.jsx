import Post from "./Post";
import PostStyles from "./PostStyles";

export default function Feed({ feedFactory }) {
    const createListOfPosts = () => {
        const postData = feedFactory.getFeed();

        // The attributes for post below are temporary
        // bc props for Post probably are going to change
        // change in the future
        return postData.map((post) => (
            <Post
                userName={post.username}
                profileImg={post.profileImg}
                msgContent={post.msgContent}
            />
        ));
    };

    return (
        //ScrollView works as just a wrapper. FlatList has better performance
        //but requires props and data objects to work. I will try to upgrade later. ~eman
        <>
            {/*SoundByte Feed Section:
        - utilizes element varible created above
        - need to add onPress functionality  
      */}
            <ScrollView style={PostStyles.rootContainer}>
                {createListOfPosts()}
            </ScrollView>
        </>
    );
}
