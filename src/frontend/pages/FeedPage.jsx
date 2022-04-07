import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { GlobalFeedComposer, LocalFeedComposer } from "../../backend";
import { Feed } from "../components";
import { UserContext } from "../hooks/UserContext";
import useProtectedRoute from "../hooks/useProtectedRoute";

import "../Styles/FeedPage.scss";

export default function FeedPage() {
    useProtectedRoute();
    const { currentUID } = useContext(UserContext);

    return (
        <div className='RootContainer black-content'>
            <div className='p-3 text-center title'>
                <h1 className='font-mono tracking-widest'>Feed Page</h1>
            </div>
            <div className='text-center feedContainer'>
                <div className='p-2 globalFeedContainer'>
                    <h2>Global Feed</h2>
                    <Feed feedFactory={new GlobalFeedComposer()} />
                </div>
                <div className='p-2 text-center localFeedContainer'>
                    <h2>Local Feed</h2>
                    <Feed feedFactory={new LocalFeedComposer(currentUID)} />
                </div>
            </div>
        </div>
    );
}
