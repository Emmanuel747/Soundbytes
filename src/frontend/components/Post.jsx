import { Database } from "../../backend";
import useAsync from "../hooks/useAsync";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

export default function Post({ post }) {
    const date = new Date(parseInt(post.timestamp));
    /*const genUser = async () => {
        const currUser = await new Database().getUser(post.uid);
        return currUser.map((userData) => <User user={userData} />);
    };
    const postUser = useAsync(genUser); tried to do something similar to feed but nope*/

    const HandleLikes = () => {
        new Database().editPost(post, post)
        console.log(post);
        post.likes = post.likes + 1;
        // console.log(new Database.getUser(uid));
    }

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
            <audio src="#" controls="controls"></audio>
        </div>
    );
}
