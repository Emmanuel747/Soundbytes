import { useParams } from "react-router";
import { ProfileFeedComposer, Database } from "../../backend";
import { Feed, IconButton, TextInput } from "../components";
import useProtectedRoute from "../hooks/useProtectedRoute";

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

export default function ProfilePage() {
    useProtectedRoute();
    const { username } = useParams();

    return (
        <div>
            <SearchBar />
            <h1>Profile</h1>
            <h3>{username ? username : "<YOUR USERNAME>"}</h3>
            <h4>{"<BIO?>"}</h4>
            <Feed feedFactory={new ProfileFeedComposer()} />
        </div>
    );
}
