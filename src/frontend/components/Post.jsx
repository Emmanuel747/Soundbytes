import { Database, GeneralFeedComposer } from "../../backend";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { UserContext } from "../hooks/UserContext";
import { useState, useContext, useEffect } from "react";
import { TiArrowForward } from "react-icons/ti";
import { useNavigate } from "react-router";
import Feed from "./Feed";

export default function Post({ post }) {
    const { currentUID } = useContext(UserContext);
    const [user, setUser] = useState();
    const [likedPost, setLikedPost] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [otherUsername, setOtherUsername] = useState("");
    const [otherPFP, setOtherPFP] = useState("");

    const getTimestamp = () =>
        new Date(parseInt(post.timestamp)).toLocaleDateString("en-US");

    const getUser = async () => {
        const user = await new Database().getUser(currentUID);
        setUser(user);

        // Set the like indicator to the correct one
        setLikedPost(user.likedPosts.includes(post.pid));
    };

    const getOtherUser = async () => {
        const other = await new Database().getUser(post.uid);
        setOtherPFP(other.pfpURL);
        setOtherUsername(other.username);
    };

    const handleLikes = async () => {
        const db = new Database();

        // See if the user had already liked it
        const currentLikes = user.likedPosts;
        let delta = 0;

        if (currentLikes.includes(post.pid)) {
            // Post is already liked, so unlike it
            delta--;
            setLikedPost(false);
            currentLikes.splice(currentLikes.indexOf(post.pid), 1);
        } else {
            // Post not liked yet, so like it
            setLikedPost(true);
            delta++;
            currentLikes.push(post.pid);
        }

        const currentLikeCount = likeCount + delta;

        setLikeCount(currentLikeCount);

        // Update user's liked posts
        await db.editUser({ likedPosts: currentLikes }, currentUID);
        await db.editPost({ likes: delta }, post.pid, post.uid);
    };

    const navigate = useNavigate();
    const handleReply = () => navigate(`/recording/${post.pid}/${post.uid}`);

    useEffect(() => {
        getUser();
        getOtherUser();
        setLikeCount(post.likes);
    }, []);

  return (
    <div className=' emanWidth p-2  shadow bg-slate-500'>
      <div className='post p-3 text-black font-serif'>
        <img
          style={{ borderRadius: "50%", width: 80, height: 80 }}
          src={otherPFP}
          alt='Profile'
        />
        <p className='text-left font-bold'>@{otherUsername}</p>
        <h4 className='font-medium'>{post.title ? post.title : "Untitled"}</h4>

        <div className="flex flex-row justify-items-stretch">
          <div className="flex flex-row" onClick={handleLikes}>
            <div onClick={() => setLikedPost(!likedPost)}>
              {likedPost ? (
                <AiFillLike style={{ fontSize: 32 }} />
              ) : (
                <AiOutlineLike style={{ fontSize: 32 }} />
              )}
              {/*Let's just like count visible in the final product. likedPost ? "LIKED" : "NOT LIKED"*/}
            </div>
            <p>{likeCount}</p>
          </div>
          <TiArrowForward
            onClick={handleReply}
            style={{ fontSize: 32, }}
          />
        </div>
        <div className="flex flex-row">
          <audio src={post.audioURL} controls></audio>
          <p>{getTimestamp()}</p>
        </div>
      </div>

      {post.replies.length > 0 && (
        <div className='replies'>
          <Feed feedFactory={new GeneralFeedComposer(post.replies)} />
        </div>
      )}
    </div>
  );
}
