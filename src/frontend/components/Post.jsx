export default function Post({ post }) {
    return (
        <div className='p-4 border bg-slate-300 border-slate-600 '>
            <h4 className='text-center'>{post.title}</h4>
            <p>{post.uid}</p>
            <p>{post.timestamp}</p>
            <p>{post.likes}</p>
            {/* <p>{post.replies}</p> */}
            <audio src={post.audioURL} controls='controls'></audio>
        </div>
    );
}
