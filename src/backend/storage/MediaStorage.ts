import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { FireStorage } from "../Fire";

class MediaStorage implements IMediaStorage {
    async getLink(path: string): Promise<string> {
        // The reference link for images and audio files
        const mediaRef = ref(FireStorage, path);
        return await getDownloadURL(mediaRef);
    }

    async upload(path: string, file: Blob): Promise<void> {
        // Upload images and audio files the server
        const mediaRef = ref(FireStorage, path);
        await uploadBytes(mediaRef, file);
    }
}

export { MediaStorage };
