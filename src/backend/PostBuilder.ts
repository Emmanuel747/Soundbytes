// TODO

import { removeTypeDuplicates } from "@babel/types";
import { doc, updateDoc } from "firebase/firestore";
import { FireDB } from "./Fire";
import { Database } from "./storage/Database";
import { MediaStorage } from "./storage/MediaStorage";

class PostBuilder implements IPostBuilder {
    async makePost(title: string, file: Blob, uid: string): Promise<PID> {
        // Call MediaStorage.upload and MediaStorage.getLink.
        // Create a Post object, then call Database.makePost.
        // likes are 0, replies are an empty array, create a timestamp

        const now = Date.now().toString();
        const firePath = `sounds/${uid}-${now}`;

        // Upload media
        const ms = new MediaStorage();

        ms.upload(firePath, file);
        const url = await ms.getLink(firePath);

        // Upload data to Firestore
        const post: Post = {
            title: title,
            uid: uid,
            audioURL: url,
            timestamp: now,
            likes: 0,
            replies: [],
            deleted: false,
        };

        const pid = await new Database().makePost(post);
        return pid;
    }

    async makeReply(
        parentPID: PID,
        parentUID: UID,
        title: string,
        file: Blob,
        uid: UID
    ): Promise<void> {
        // Call makePost, then append reply
        // to parent post's replies list.

        const newPID = await this.makePost(title, file, uid);

        await new Database().editPost(
            { replies: [newPID] },
            parentPID,
            parentUID
        );
    }

    async editLikes(uid: UID, pid: PID, delta: number): Promise<void> {
        // Get likes from database,
        // update likes with likes + delta
        // create post editable object, create object with just likes +/- 1

        await new Database().editPost({ likes: delta }, pid, uid);
    }
}

export { PostBuilder };
