import { useContext } from "react";
import { useParams } from "react-router";
import { ProfileFeedComposer, Database } from "../../backend";
import { Feed, IconButton, TextInput } from "../components";
import { UserContext } from "../hooks/UserContext";
import useProtectedRoute from "../hooks/useProtectedRoute";
import useAsync from "../hooks/useAsync";
import React, { useState, useEffect } from "react";

import { AiFillHome } from "react-icons/ai";

import "../Styles/ProfilePage.scss";

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
                    borderColor: "black", //This styling does not work, but I am
                    borderRadius: 5,
                }} //too tired to figure that out tonight.
                placeHolder='Search Users'
            />
            <AiFillHome style={{ fontSize: "64px" }} />
        </div>
    );
};

const YourProfile = ({ user, uid }) => {
    return (
        <div className='flex flex-col headerContainer'>
            <img
                className='self-center userProfileImg'
                style={{ maxWidth: "10rem" }}
                src='https://cdn.discordapp.com/attachments/178196683727962112/953082990806831176/unknown.png'
            />
            <div className='flex-col items-center justify-center text-center profileContainer'>
                <h3>{"Badmamajama420"}</h3>
                <h4>{'"I make great life decisions"'}</h4>
            </div>
            <div className='flex justify-around followerContainer'>
                <p
                    onClick={() => {
                        //implement displayAllFollowers();
                    }}>
                    {" "}
                    Followers: {50}
                </p>
                <p
                    onClick={() => {
                        //implement displayAllFollowing();
                    }}>
                    {" "}
                    Following: {17}
                </p>
            </div>
            <Feed feedFactory={new ProfileFeedComposer(uid)} />
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
            <h3>{username}</h3>
            <h4>{"<BIO?>"}</h4>
            <Feed feedFactory={new ProfileFeedComposer(uid)} />
        </>
    );
};

export default function ProfilePage() {
    // useProtectedRoute();
    const { username } = useParams();
    const { currentUser, currentUID } = useContext(UserContext);

    return (
        <div>
            <SearchBar />
            {username ? (
                <OtherProfile username={username} />
            ) : (
                <YourProfile user={currentUser} uid={currentUID} />
            )}
        </div>
    );
}
