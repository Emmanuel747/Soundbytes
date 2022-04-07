import { useContext } from "react";
import { useParams } from "react-router";
import { ProfileFeedComposer, Database } from "../../backend";
import { Feed, IconButton, TextInput } from "../components";
import { UserContext } from "../hooks/UserContext";
import useProtectedRoute from "../hooks/useProtectedRoute";
import useAsync from "../hooks/useAsync";
import { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import '../Styles/GenericStyles.scss';

import SearchBar from "../components/SearchBar";

// const SearchBar = () => {


//     return (
//         <div>
//             <TextInput
//                 style={{
//                     border: "10px",
//                     borderStyle: "solid",
//                     borderWidth: 1,
//                     borderColor: "black",
//                     borderRadius: 5,
//                 }}
//                 placeHolder='Search Users'
//             />
//         </div>
//     );
// };

const HomeScreenButton = () => {
    return (
        <Link to='/feed'>
            <AiFillHome style={{ fontSize: "64px" }} />
        </Link>
    );
};

const UserDetails = ({ username, pfpURL, followerCount, followingCount }) => {
    return (
        <div className='flex flex-col items-center overflow-hidden textFont'>
            <img style={{ maxWidth: "11rem", borderRadius: "150/2", borderWidth: 2, borderColor: "black" }} 
              src={pfpURL} alt='ProfileImg' 
            />
            <h3>{username}</h3>
            <div className='flex flex-row justify-center gap-x-10'>
                <p>Following: {followingCount}</p>
                <p>Followers: {followerCount}</p>
            </div>
        </div>
    );
};

const PersonalProfile = () => {
    const { currentUsername, currentUID } = useContext(UserContext);
    const [pfpURL, setPfpURL] = useState(""); // Could probably set this to a default pfp
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    const getUser = async () => {
        const user = await new Database().getUser(currentUID);
        setFollowerCount(user.followers.length);
        setFollowingCount(user.following.length);
        setPfpURL(user.pfpURL);
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className='flex flex-col'>
            <UserDetails
                username={currentUsername}
                pfpURL={pfpURL}
                followerCount={followerCount}
                followingCount={followingCount}
            />
            <Feed feedFactory={new ProfileFeedComposer(currentUID)} />
        </div>
    );
};

const OtherProfile = ({ username }) => {
    const [pfpURL, setPfpURL] = useState(""); // Could probably set this to a default pfp
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [composer, setComposer] = useState();

    const getUID = async () =>
        await new Database().getUIDfromUsername(username);

    const getUser = async (uid) => {
        const user = await new Database().getUser(uid);
        setFollowerCount(user.followers.length);
        setFollowingCount(user.following.length);
        setPfpURL(user.pfpURL);
    };

    const getComposer = (uid) => setComposer(new ProfileFeedComposer(uid));

    useEffect(() => {
        getUID().then((uid) => {
            getUser(uid);
            getComposer(uid);
        });
    }, []);

    return (
        <div className='flex flex-col'>
            <UserDetails
                username={username}
                pfpURL={pfpURL}
                followerCount={followerCount}
                followingCount={followingCount}
            />
            {composer && <Feed feedFactory={composer} />}
        </div>
    );
};

export default function ProfilePage() {
    useProtectedRoute();
    const { username } = useParams();

    return (
        <div>
            <SearchBar />
            {/* <HomeScreenButton /> */}
            {username ? (
                <OtherProfile username={username} />
            ) : (
                <PersonalProfile />
            )}
        </div>
    );
}
