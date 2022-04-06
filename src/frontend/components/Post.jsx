import { Database } from "../../backend";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { UserContext } from "../hooks/UserContext";
import { useState, useContext, useEffect } from "react";

export default function Post({ post }) {
    const { currentUID } = useContext(UserContext);
    const [user, setUser] = useState();
    const [likedPost, setLikedPost] = useState(false);
    const [otherUsername, setOtherUsername] = useState("");
    const [otherPFP, setOtherPFP] = useState("");

    const getTimestamp = () =>
        new Date(parseInt(post.timestamp)).toLocaleDateString("en-US");

    const getUser = async () => {
        const user = await new Database.getUser(currentUID);
        setUser(user);

        const tempPID = "";

        // Set the like indicator to the correct one
        setLikedPost(user.likedPosts.includes(tempPID));
    };

    const getOtherUser = async () => {
        const other = await new Database.getUser(post.uid);
        setOtherPFP(other.pfpURL);
        setOtherUsername(other.username);
    };

    const handleLikes = async () => {
        const db = new Database();
        const tempPID = "";

        // See if the user had already liked it
        // TODO

        // Update user's liked posts
        const currentLikes = user.likedPosts;
        currentLikes.push(tempPID);

        await db.editUser({ likedPosts: currentLikes }, currentUID);
    };

    useEffect(() => {
        getUser();
        getOtherUser();
    }, []);

    return (
        <div className='p-4 border bg-slate-300 border-slate-600 '>
            <h4 className='text-center'>{post.title}</h4>
            <p className='username'>{otherUsername}</p>
            {/* <img src={otherPFP} alt="profile picture" /> */}
            <p>{getTimestamp()}</p>
            <p>
                <div
                    onClick={() => {
                        handleLikes();
                    }}>
                    {<AiOutlineLike style={{ fontSize: "32px" }} />}
                    {post.likes}
                </div>
            </p>
            <audio src={post.audioURL} controls></audio>
        </div>
    );
}
