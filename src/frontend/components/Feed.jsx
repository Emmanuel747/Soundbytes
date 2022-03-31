import Post from "./Post";

export default function Feed({ feedFactory }) {
    const getFeed = () =>
        feedFactory
            .composeFeed()
            .map((post_data, i) => <Post post={post_data} key={i} />);
    return (
        <div className='border border-black'>
            <p>Feed</p>
            {getFeed()}
        </div>
    );
}
