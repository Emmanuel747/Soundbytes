import { useContext } from "react";

import { GlobalFeedComposer, LocalFeedComposer } from "../../backend";
import { Feed } from "../components";
import { UserContext } from "../hooks/UserContext";
import useProtectedRoute from "../hooks/useProtectedRoute";

export default function FeedPage() {
    useProtectedRoute();
    const { currentUser } = useContext(UserContext);

    return (
        <div>
            <h1>Feed Page</h1>
            <div>
                <h2>Global Feed</h2>
                <Feed feedFactory={new GlobalFeedComposer()} />
            </div>
            <div>
                <h2>Local Feed</h2>
                <Feed feedFactory={new LocalFeedComposer(currentUser)} />
            </div>
        </div>
    );
}
