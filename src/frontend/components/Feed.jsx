import useAsync from "../hooks/useAsync";
import Post from "./Post";

export default function Feed({ feedFactory }) {
    const genFeed = async () => {
        const feedData = await feedFactory.composeFeed();
        return feedData.map((postData, i) => <Post post={postData} key={i} />);
    };
    const posts = useAsync(genFeed);

    return (
        <div className='border border-black'>
            <p>Feed</p>
            {posts}
        </div>
    );
}
