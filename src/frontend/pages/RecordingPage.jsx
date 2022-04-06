import { useState, useEffect } from "react";
import { useContext } from "react";

import MicRecorder from "mic-recorder-to-mp3";

import { PostBuilder } from "../../backend/";
import { TextButton, TextInput } from "../components";
import { UserContext } from "../hooks/UserContext";
import useProtectedRoute from "../hooks/useProtectedRoute";
import { useParams } from "react-router";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export default function RecordingPage() {
    useProtectedRoute();
    const { parentPID, parentUID } = useParams();
    const { currentUID } = useContext(UserContext);

    const [title, setTitle] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [blob, setBlob] = useState();
    const [blobURL, setBlobURL] = useState("");
    const [isBlocked, setIsBlocked] = useState(false);

    const startRecording = () => {
        if (isBlocked) console.log("Permission Denied");
        else {
            Mp3Recorder.start()
                .then(() => {
                    setIsRecording(true);
                })
                .catch((e) => console.error(e));
        }
    };

    const stopRecording = () => {
        Mp3Recorder.stop()
            .getMp3()
            .then(([buffer, blob]) => {
                setBlob(blob);
                setBlobURL(URL.createObjectURL(blob));
                setIsRecording(false);
            })
            .catch((e) => console.error(e));
    };

    useEffect(() => {
        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
        navigator.getUserMedia(
            { audio: true },
            () => {
                console.log("Permission Granted");
                setIsBlocked(false);
            },
            () => {
                console.log("Permission Denied");
                setIsBlocked(true);
            }
        );
    }, []);

    const uploadPost = async () => {
        const pb = new PostBuilder();
        await pb.makePost(title, blob, currentUID);
    };

    const uploadReply = async () => {
        const pb = new PostBuilder();
        await pb.makeReply(parentPID, parentUID, title, blob, currentUID);
    };

    return (
        <div>
            <h1>Recording</h1>
            <h3>
                {parentPID && parentUID ? "Reply to post" : "Make a new post"}
            </h3>
            <TextInput placeHolder='Title' setText={setTitle} />
            <TextButton
                onClick={isRecording ? stopRecording : startRecording}
                title={isRecording ? "Stop Recording" : "Start Recording"}
            />
            <audio src={blobURL} controls='controls' />
            <TextButton
                onClick={parentPID && parentUID ? uploadReply : uploadPost}
                title='Upload'
            />
        </div>
    );
}
