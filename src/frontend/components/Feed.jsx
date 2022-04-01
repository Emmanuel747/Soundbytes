import useAsync from "../hooks/useAsync";
import Post from "./Post";

export default function Feed({ feedFactory }) {
    const genFeed = async () => {
        const feedData = await feedFactory.composeFeed();
        return feedData.map((postData, i) => <Post post={postData} key={i} />);
    };
    const posts = useAsync(genFeed);

    return (
        <div className='border border-black'
          style={{
            padding:'10px', 
            backgroundColor: '#0f467e6c',
            minWidth: '355px'
          }}
        >
            <p 
              style={{textAlign:'center', padding: '5px'}}
            >Feed</p>
            {posts}
        </div>
    );
}
