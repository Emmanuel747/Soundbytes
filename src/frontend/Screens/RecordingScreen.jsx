import { useState, useEffect } from "react";
import {
    View,
    Button,
    Text,
    TextInput,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import { Audio } from "expo-av";

import { PostManager } from "../../backend";

import Icon from "react-native-vector-icons/FontAwesome5";
import colors from "../colors";

const RecordButton = ({ canRecord, setRecordingURI }) => {
    const [recording, setRecording] = useState();

    async function startRecording() {
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

    async function stopRecording() {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordingURI(uri);
    }

    return (
        <Button
            title={recording ? "Stop Recording" : "Start Recording"}
            disabled={canRecord}
            onPress={recording ? stopRecording : startRecording}>
            <Icon
                name={recording ? "stop" : "microphone"}
                size={40}
                color='black'
                style={styles.record}
            />
        </Button>
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

    return <Button disabled={!recordingURI} title='Play' onPress={playSound} />;
};

export default function RecordingScreen() {
    const [title, setTitle] = useState("");
    const [recordingURI, setRecordingURI] = useState("");

    const postManager = new PostManager();
    const createPost = () => {
        // Call postManager.createPost()
        throw new Error("Method not implemented.");
    };

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={(text) => setTitle(text)}
                placeholder='Title'
                style={styles.textbox}
            />
            <RecordButton
                setRecordingURI={setRecordingURI}
                canRecord={recordingURI ? true : false}
            />
            <PlaybackButton recordingURI={recordingURI} />
            <Button
                disabled={!recordingURI}
                title='clear'
                onPress={() => setRecordingURI("")}
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
        backgroundColor: colors.error,
        aspectRatio: 1,
        textAlign: "center",
        borderRadius: 100,
        padding: 30,
    },
    textbox: {
        borderColor: "black",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderWidth: 1,
        fontSize: 24,
        width: "100%",
    },
});
