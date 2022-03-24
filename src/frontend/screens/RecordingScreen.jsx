import { useState, useEffect } from "react";
import { View, Button, Text, TextInput, StyleSheet } from "react-native";
import { Audio } from "expo-av";

import Icon from "react-native-vector-icons/FontAwesome5";
import colors from "../colors";

import { PostManager } from "../../backend";
import useOnce from "../hooks/useOnce";

const RecordButton = ({ canRecord, setRecordingURI }) => {
  const [recording, setRecording] = useState();

  async function startRecording() {
    if (!canRecord) return;

    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.log("Failed to start recording");
    }
  }
    return (
        <View>
            {/* For some reason the icons get scooted off-center ONLY when the slash mic
                icon is displayed and the keyboard is dismissed from the screen.
                If you clear the recording (to get the regular mic icon to show up) 
                and dismiss the keyboard again, it fixes itself. :( - Z */}
      <Icon
        onPress={recording ? stopRecording : startRecording}
        name={
          canRecord ? (recording ? "stop" : "microphone") : "microphone-slash"
        }
        size={40}
        color="black"
        style={{
          backgroundColor: canRecord ? colors.error : colors.disabled,
          ...styles.record,
        }}
      />
    </View>
  );
};

const PlaybackButton = ({ recordingURI }) => {
  const [sound, setSound] = useState();

  async function playSound() {
    const { sound, status } = await Audio.Sound.createAsync({
      uri: recordingURI,
    });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          // This doesn't act right. It seems to unload before it plays??
          // Everything works until I started trying to use playbackStatus stuff - Z
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return <Button disabled={!recordingURI} title="Play" onPress={playSound} />;
};

export default function RecordingScreen() {
    const [title, setTitle] = useState("");
    const [recordingURI, setRecordingURI] = useState("");

    const postManager = useOnce(new PostManager());

    const createPost = () => {
        const post = {
            title: title,
            creator: "TempUsername",
            audio: recordingURI,
            timestamp: Date.now(),
            likes: 0,
        };

        postManager.createPost(post);

        // Clear fields
        setRecordingURI("");
        setTitle("");
    };

    return (
        <View style={styles.container}>
            <Text
                style={{
                    textAlign: "left",
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: 26,
                }}>
                Make a new post:
            </Text>
            <View style={styles.editorContainter}>
                <Text style={{ fontSize: 22 }}>Add a title: </Text>
                <TextInput
                    placeholder='Title'
                    onChangeText={(text) => setTitle(text)}
                    style={styles.textbox}
                />
                <Text style={{ fontSize: 22 }}>Record: </Text>
                <RecordButton
                    setRecordingURI={setRecordingURI}
                    canRecord={recordingURI ? false : true}
                />
                <PlaybackButton recordingURI={recordingURI} />
                <Button
                    title='Clear'
                    disabled={!recordingURI}
                    onPress={() => setRecordingURI("")}
                />
            </View>
            <Button
                title='Submit'
                onPress={createPost}
                disabled={!recordingURI || !title}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  record: {
    aspectRatio: 1,
    textAlign: "center",
    borderRadius: 100,
    padding: 30,
    width: 100,
    marginBottom: 20,
    alignSelf: "center",
  },
  textbox: {
    borderColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    fontSize: 20,
    width: "100%",
  },
  editorContainter: {
    width: "90%",
    marginVertical: 10,
  },
});
