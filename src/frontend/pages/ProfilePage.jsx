import { useContext } from "react";
import { useParams } from "react-router";
import { ProfileFeedComposer, Database } from "../../backend";
import { Feed, IconButton, TextInput } from "../components";
import { UserContext } from "../hooks/UserContext";
import useProtectedRoute from "../hooks/useProtectedRoute";
import useAsync from "../hooks/useAsync";

const SearchBar = () => {
    const getAllUsernames = () => {
        // Call something like Database.getAllUsernames()
    };

    return (
        <div>
            <TextInput placeHolder='Search Users' />
            <IconButton icon='' />
        </div>
    );
};

const YourProfile = ({ user }) => {
    return (
        <>
            <h3>{"<YOUR USERNAME>"}</h3>
            <h4>{"<BIO?>"}</h4>
            <Feed feedFactory={new ProfileFeedComposer()} />
        </>
    );
};

const OtherProfile = ({ username, uid }) => {
    return (
        <>
            <h3>{username}</h3>
            <h4>{"<BIO?>"}</h4>
            <Feed feedFactory={new ProfileFeedComposer(uid)} />
        </>
    );
};

export default function ProfilePage() {
    // useProtectedRoute();
    const { username } = useParams();
    const { currentUser } = useContext(UserContext);

    const getUID = async () => {
        const db = new Database();
        const uid = await db.getUIDfromUsername(username);

        return uid;
    };
    const uid = useAsync(getUID);

    return (
        <div>
            <SearchBar />
            <h1>Profile</h1>
            {username ? (
                <OtherProfile username={username} uid={uid} />
            ) : (
                <YourProfile user={currentUser} />
            )}
        </div>
    );
}
