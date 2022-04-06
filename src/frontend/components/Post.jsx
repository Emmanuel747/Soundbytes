import { Database } from "../../backend";
import useAsync from "../hooks/useAsync";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

export default function Post({ post }) {
    const date = new Date(parseInt(post.timestamp));
 

    const HandleLikes = () => {
        // new Database().editPost(post, post)
        // console.log(post);
        // post.likes = post.likes + 1;
        console.log(post.uid)
        let user = new Database.getUser(post.uid);
        console.log(user)
    }
    console.log(post);
    // audioURL: 'https://firebasestorage.googleapis.com/v0/b/notify…=media&token=c806eb71-0d63-428c-bc58-cf9ee3e9857a', replies: Array(0), uid: 'WM7kGbC1u0gBctjWeg3FFoxdGjJ2', title: '', likes: 0, …}
    //   audioURL: "https://firebasestorage.googleapis.com/v0/b/notify-soundbytes.appspot.com/o/sounds%2FWM7kGbC1u0gBctjWeg3FFoxdGjJ2-1649120941153?alt=media&token=c806eb71-0d63-428c-bc58-cf9ee3e9857a"
    //   likes: 0
    //   replies: Array(0)
    //   length: 0
    //   [[Prototype]]: Array(0)
    //   timestamp: "1649120941153"
    //   title: ""
    //   uid: "WM7kGbC1u0gBctjWeg3FFoxdGjJ2"

    return (
        <div className="bg-slate-300 border border-slate-600 p-4 ">
            <h4 className="text-center">{post.title}</h4>
            <p className="username">{}</p>
            <p>{date.toLocaleDateString("en-US")}</p>
            <p>
                <div onClick={() =>{HandleLikes()}}>
                {<AiOutlineLike style={{ fontSize: "32px" }}  />}
                {post.likes}
                </div>
                
            </p>
            <audio src={post.audioURL} controls="controls"></audio>
        </div>
    );
}
