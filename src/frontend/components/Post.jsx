import { Database } from "../../backend";
import useAsync from "../hooks/useAsync";

export default function Post({ post }) {
    const date = new Date(parseInt(post.timestamp));
    /*const genUser = async () => {
        const currUser = await new Database().getUser(post.uid);
        return currUser.map((userData) => <User user={userData} />);
    };
    const postUser = useAsync(genUser); tried to do something similar to feed but nope*/
    return (
        <div className="bg-slate-300 border border-slate-600 p-4 ">
            <h4 className="text-center">{post.title}</h4>
            <p>{"Username"}</p>
            <p>{date.toLocaleDateString("en-US")}</p>
            <p>
                {"Likes: "}
                {post.likes}
            </p>
            <audio src="#" controls="controls"></audio>
        </div>
    );
}
