import { useContext } from "react";
import { useParams } from "react-router";
import { ProfileFeedComposer, Database, UserInteraction } from "../../backend";
import { Feed, IconButton, TextInput } from "../components";
import { UserContext } from "../hooks/UserContext";
import useProtectedRoute from "../hooks/useProtectedRoute";
import { useState, useEffect } from "react";
import "../Styles/GenericStyles.scss";

import SearchBar from "../components/SearchBar";

const UserDetails = ({ username, pfpURL, followerCount, followingCount }) => {
    return (
        <div className='flex flex-col items-center overflow-hidden textFont'>
            <img
                style={{
                    maxWidth: "11rem",
                    borderRadius: "150/2",
                    borderWidth: 2,
                    borderColor: "black",
                }}
                src={pfpURL}
                alt='ProfileImg'
            />
            <h3>{username}</h3>
            <div className='flex flex-row justify-center gap-x-10'>
                <p>Following: {followingCount}</p>
                <p>Followers: {followerCount}</p>
            </div>
        </div>
    );
};

const FollowButton = ({ curUID, otherUID }) => {
    const initFollowing = async () => {
        const user = await new Database().getUser(curUID);
        console.log(
            user.following,
            "in",
            otherUID,
            "==",
            user.following.includes(otherUID)
        );
        return user.following.includes(otherUID);
    };

    const [isFollowing, setIsFollowing] = useState(initFollowing);

    const toggleFollowing = () => {
        const ui = new UserInteraction();
        if (isFollowing) {
            ui.unfollow(curUID, otherUID);
            setIsFollowing(false);
        } else {
            ui.follow(curUID, otherUID);
            setIsFollowing(true);
        }
    };

    return (
        <div onClick={toggleFollowing}>
            {isFollowing ? "Unfollow" : "Follow"}
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
        <div>
            <UserDetails
                className='flex flex-col'
                username={currentUsername}
                pfpURL={pfpURL}
                followerCount={followerCount}
                followingCount={followingCount}
            />
            <div className='RootContainer'>
                <div className='feedContainer'>
                    <div className='p-2 font-mono font-bold tracking-widest feedContainer globalFeedContainer font-loader'>
                        <Feed
                            feedFactory={new ProfileFeedComposer(currentUID)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const OtherProfile = ({ username }) => {
    const { currentUID } = useContext(UserContext);
    const [pfpURL, setPfpURL] = useState(""); // Could probably set this to a default pfp
    const [UID, setUID] = useState("");
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [composer, setComposer] = useState();

    const getUID = async () =>
        await new Database().getUIDfromUsername(username);

    const getUser = async (uid) => {
        const user = await new Database().getUser(uid);
        setUID(uid);
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
        <div>
            <UserDetails
                className='flex flex-col'
                username={username}
                pfpURL={pfpURL}
                followerCount={followerCount}
                followingCount={followingCount}
            />
            <FollowButton curUID={currentUID} otherUID={UID} />
            <div className='RootContainer'>
                <div className='feedContainer'>
                    <div className='p-2 font-mono font-bold tracking-widest feedContainer globalFeedContainer font-loader'>
                        {composer && <Feed feedFactory={composer} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ProfilePage() {
    useProtectedRoute();
    const { username } = useParams();

    return (
        <div>
            <SearchBar />
            {username ? (
                <OtherProfile username={username} />
            ) : (
                <PersonalProfile />
            )}
        </div>
    );
}
