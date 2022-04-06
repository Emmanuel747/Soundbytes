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

import "../Styles/ProfilePage.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SearchBar = () => {
    const getAllUsernames = () => {
        // Call something like Database.getAllUsernames()
    };

    return (
        <div>
            <TextInput
                style={{
                    border: "10px",
                    borderStyle: "solid",
                    borderWidth: 1,
                    borderColor: "black", 
                    borderRadius: 5,      
                }}                        
                placeHolder='Search Users'
            />
        </div>
    );
};


const HomeScreenButton = () => {

    return( 
        <div> 
            <Link to='/feed'><AiFillHome style={{ fontSize: "64px" }} /></Link>
        </div>
    );
};

const PersonalProfile = () => {
    const { currentUsername, currentUID } = useContext(UserContext);

    return (
        <div className='flex flex-col headerContainer'>
            <img
                className='self-center userProfileImg'
                style={{ maxWidth: "10rem" }}
                src='https://cdn.discordapp.com/attachments/178196683727962112/953082990806831176/unknown.png'
            />
            <div className='text-center'>
                <h3>{currentUsername}</h3>
                <h4>{'"I make great life decisions"'}</h4>
            </div>        
            <button onClick={() => HandleFollow(currentUsername, currentUID)}>  
                Follow 
                </button>
            <div className='flex justify-around'>
                <p>Followers: {50}</p>
                <p>Following: {17}</p>
            </div>
            <Feed feedFactory={new ProfileFeedComposer(currentUID)} />
        </div>
    );
};

const OtherProfile = ({ username }) => {
    const getUID = async () => {
        const db = new Database();
        const uid = await db.getUIDfromUsername(username);

        return uid;
    };
    const uid = useAsync(getUID);

    return (
        <>
            <div classname='flex flex-col'>
            <img
                className='self-center'
                style={{ maxWidth: "10rem" }}
                src='https://cdn.discordapp.com/attachments/178196683727962112/953082990806831176/unknown.png'
            />
            </div>
            <div className='text-center'>
                <h3>{username}</h3>
                <h4>{'"implement user bio'}</h4>
            </div>
            
            <Feed feedFactory={new ProfileFeedComposer(uid)} />
        </>
    );
};

const FollowButton = () => {

// /*new Database().editUser(new Database().getUser(uid), uid) I'm just going to make a separate function for the follow button so it doesn't get too cluttered in the profile div. -miguel 1:06am 4/5/22
    <div className="flex justify-center followButton">
            <button onClick={() => HandleFollow()}>  
            Follow 
        </button>
    </div>
}

const HandleFollow = (following, currentUID) => {
    return(
        new Database().editUser(following, currentUID)
    );
}

export default function ProfilePage() {
    useProtectedRoute();
    const { username } = useParams();

    return (
        <div>
            <SearchBar />
            <HomeScreenButton />
            {username ? (
                <OtherProfile username={username} />
            ) : (
                <PersonalProfile />
            )}
        </div>
    );
}
