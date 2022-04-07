import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";
import useProtectedRoute from "../hooks/useProtectedRoute";

import { PostBuilder } from "../../backend/";
import MicRecorder from "mic-recorder-to-mp3";
import { TextButton, TextInput, UploadBtn } from "../components";

import "../Styles/RecordingPage.scss";

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
    const [FeedbackMsg, setFeedbackMsg] = useState("Try typing something in here!");

    const startRecording = () => {
      if (!isBlocked) {
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

    const navigate = useNavigate();
    const uploadPost = async (e) => {
      e.PreventDefault();
        const pb = new PostBuilder();
        try {
          await pb.makePost(title, blob, currentUID);
          setFeedbackMsg("Upload Success!")
          navigate("/feed"); 
        } catch (err) {
          setFeedbackMsg(err);
          console.log(err);
        }
    };
    const uploadReply = async () => {
        const pb = new PostBuilder();
        await pb.makeReply(parentPID, parentUID, title, blob, currentUID);
    };

    return (
      <div className=" recordBody fill-height text-center flex flex-col" >
        <div className="recordHeader parent">
          <h1 className="flex parent flex-col text-center "> Recording </h1>
          <p clasName="line"> {parentPID && parentUID ? "Reply to post" : "Make a new post"} </p>
        </div>

        <form className="h-screen">
          {/* <TextInput
            className="flex flex-col text-center" placeHolder='Title' 
          /> */}
          <div className=" titleInput text-input">
            <input 
              require 
              type="text" 
              id="input1" 
              placeholder={FeedbackMsg}
              onChange={(event) => (setTitle(event.target.value))} />
            <label for="input1">SoundByte Name🎤</label>
          </div>
          <div className="recordBtnContainer">
            <input type="checkbox" name="checkbox" className="checkbox" id="checkbox" />
            <label 
              for="checkbox"
              onClick={ isRecording ? stopRecording : startRecording }
            > </label>
            <div>
              <TextButton className="text-center"
                title={ isRecording ? "Stop Recording" : "Start Recording" }
              />
            </div>
          </div>
          <div className="audioPlayerContainer">
            <audio className="flex " src={blobURL} controls='controls' />
          </div>

          {/* <UploadBtn /> */}
          <TextButton
            type="submit"
            onClick={(e) => parentPID && parentUID ? uploadReply(e) : uploadPost(e)}
            title='Upload'
          />
        </form>


        <div className="h-55 flex flex-col justify-center">

        </div>
      </div>
  );
}
