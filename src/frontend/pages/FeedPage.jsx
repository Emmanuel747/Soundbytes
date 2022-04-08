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
    <div className='black-content'>
      <div className='p-3 text-center title'>
        <h1 className='font-mono tracking-widest'>Feed Page</h1>
      </div>
      <div className='text-center feedContainer'>
        <div className='p-2 global'>
          <h2>Global Feed</h2>
          <div className='emanFlex border border-black p-3, bg-slate-600'>
            <Feed feedFactory={new GlobalFeedComposer()} />
          </div>
        </div>
        <div className='p-2 text-center local'>
          <h2>Local Feed</h2>
          <div className='emanFlex border border-black p-3, bg-slate-600'>
            <Feed feedFactory={new LocalFeedComposer(currentUID)} />
          </div>
        </div>
      </div>
    </div>
  );
}
