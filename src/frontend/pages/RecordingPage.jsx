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
  const [isRecordingValid, setRecordingValid] = useState(false);
  const [blob, setBlob] = useState();
  const [blobURL, setBlobURL] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [FeedbackMsg, setFeedbackMsg] = useState("Your SoundByte🎵");
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [recordTime, setRecordTime] = useState(0);

  {/* recordTimer Function for Min audio length */ }
  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setRecordTime((recordTime) => recordTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    if (recordTime > 1) {
      setRecordTime(0);
    }
    setIsActive(true);
    setIsPaused(false);
  };
  // const handlePauseResume = () => {
  //   setIsPaused(!isPaused);
  // };
  const handleReset = () => {
    setIsActive(false);
    if (recordTime > 4 && title !== "") {
      setRecordingValid(true);
    } else setRecordingValid(false)
  };

  const startRecording = () => {
    if (!isBlocked) {
      handleStart();
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };
  const stopRecording = () => {
    handleReset();
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
    e.preventDefault();
    if (isRecordingValid) {
      try {
        const pb = new PostBuilder();
        await pb.makePost(title, blob, currentUID);
        setFeedbackMsg("Upload Success!")
        navigate("/feed");
      } catch (err) {
        setFeedbackMsg(err);
        console.log(err);
      }
    } else if (title === "") {
      setFeedbackMsg("Error: Title your SoundByte🎙");
      setTimeout(function () {
        setFeedbackMsg("");
      }, 3000)
    } else {
      setFeedbackMsg("Error: SoundByte must be at least 5 seconds!");
      setTimeout(function () {
        setFeedbackMsg("");
      }, 3000)
    }
  };
  const uploadReply = async (e) => {
    e.preventDefault();
    const pb = new PostBuilder();
    pb.makeReply(parentPID, parentUID, title, blob, currentUID).then(() =>
      navigate("/feed")
    );
  };

  return (
    <div className=" recordBody fill-height text-center flex flex-col" >
      <div className="recordHeader parent">
        <h1 className="flex parent flex-col text-center eman">
          {parentPID && parentUID ? "Reply to a SoundByte🎙" : "Create a SoundByte🎙"}
        </h1>
      </div>

      <form className='h-screen'>
        <div className=" titleInput text-input">
          <input
            required
            type="text"
            id="input1"
            placeholder="SoundByte🎵 Title"
            onChange={(event) => (setTitle(event.target.value))} />
          <label for="input1">SoundByte Name🎤</label>
        </div>

        <div className="recordBtnContainer">
          <div>
            <TextButton className="text-center eman"
              title={isRecording ? "Stop Recording" : "Start Recording"}
            />
          </div>
          <input type="checkbox" name="checkbox" className="checkbox" id="checkbox" />
          {/* Record Start & Stop Button ~Eman April 7, 2022 */}
          <label
            for="checkbox"
            onClick={isRecording ? stopRecording : startRecording}
          > </label>
        </div>

        <div className="recordingStatusMsg" >{FeedbackMsg}
          <div className="counterStatus"> Recording Length:
            {recordTime > 4 ?
              <span className="sub valid"> {recordTime} </span>
              :
              <span className="sub invalid"> {recordTime} </span>
            }
            seconds</div>
        </div>
        {/* Audio Player ~Eman April 7, 2022 */}
        <div className="audioPlayerContainer">
          <audio className="flex" src={blobURL} controls='controls' />
        </div>

        {/* <UploadBtn /> */}
        <button
          type="submit"
          onClick={(e) => parentPID && parentUID ? uploadReply(e) : uploadPost(e)}
        >
          <UploadBtn />
        </button>
      </form>

    </div>


  );
}
