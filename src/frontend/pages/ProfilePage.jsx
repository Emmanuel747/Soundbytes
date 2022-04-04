import { useContext, } from "react";
import { useParams } from "react-router";
import { ProfileFeedComposer, Database } from "../../backend";
import { Feed, IconButton, TextInput } from "../components";
import { UserContext } from "../hooks/UserContext";
import useProtectedRoute from "../hooks/useProtectedRoute";
import useAsync from "../hooks/useAsync";
import React, { useState, useEffect } from "react";

import { IconName } from "react-icons/ai";

import '../Styles/ProfilePage.scss';

const SearchBar = () => {
    const getAllUsernames = () => {
        // Call something like Database.getAllUsernames()
    };

    return (
        <div>
            <TextInput placeHolder='Search Users' />
            <IconName AiFillHome='' />
        </div>
    );
};

const YourProfile = ({ user }) => {
	return (
        
		<div className="headerContainer flex flex-col">
			<img className="userProfileImg self-center"
                    style={{maxWidth: "10rem"}}
					src="https://cdn.discordapp.com/attachments/178196683727962112/953082990806831176/unknown.png"
			/>
			<div className="profileContainer text-center flex-col justify-center items-center">    
				<h3>{"Badmamajama420"}</h3> 
				<h4>{"\"I make great life decisions\""}</h4>
					
			</div>
            <div className="followerContainer flex flex-row self-center"> 
            <p onClick={() => {
                //displayAllFollowers(); 
                //displayAllFollowers() is a function that could theoretically show a dropdown list of your followers
            }}> Followers: {50}
            </p> 
            <p onClick={() => {
                //displayAllFollowing();
                //displayAllFollowing(); is a function that could theoretically show a dropdown list of your followers
            }}> Following: {17} 
            </p>
            </div>
            <Feed feedFactory={new ProfileFeedComposer()} />         
		</div>
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
            {username ? (
                <OtherProfile username={username} uid={uid} />
            ) : (
                <YourProfile user={currentUser} />
            )}
        </div>
    );
}
