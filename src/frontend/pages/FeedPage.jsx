import { useContext } from "react";

import { GlobalFeedComposer, LocalFeedComposer } from "../../backend";
import { Feed } from "../components";
import { UserContext } from "../hooks/UserContext";
import useProtectedRoute from "../hooks/useProtectedRoute";

import "../Styles/FeedPage.scss"

export default function FeedPage() {
    // useProtectedRoute();
    const { currentUser } = useContext(UserContext);

  return (
    <div className="RootContainer">
      <div className="title text-center p-3">
        <h1 className="font-mono tracking-widest">Feed Page</h1>
      </div>
      <div className="feedContainer">
        <div className="globalFeedContainer p-2">
          <h2>Global Feed</h2>
          <Feed feedFactory={new GlobalFeedComposer()} />
        </div>
        <div className="localFeedContainer p-2">
          <h2>Local Feed</h2>
          <Feed feedFactory={new LocalFeedComposer(currentUser)} />
        </div>
      </div>
    </div>
  );
}
