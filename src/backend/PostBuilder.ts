// TODO

import { removeTypeDuplicates } from "@babel/types";
import { Database } from "./storage/Database";
import { MediaStorage } from "./storage/MediaStorage";

class PostBuilder implements IPostBuilder {
    database: IDatabase;
    mediaStorage: IMediaStorage; 

    constructor() {
        this.database = new Database();
        this.mediaStorage = new MediaStorage();
    }

    makePost(title: string, file: Blob, uid: string, username: string): void {
        // Call MediaStorage.upload and MediaStorage.getLink.
        // Create a Post object, then call Database.makePost.
        // likes are 0, replies are an empty array, create a timestamp
        likes: 0;
        replies: Array<Post>();
        timestamp: 0;

        this.mediaStorage.upload(this.mediaStorage.path, this.mediaStorage.file);
        this.mediaStorage.getLink(this.mediaStorage.path, this.mediaStorage.file);

        post: Database.getPost(title);
        this.database.makePost(post);

        // throw new Error("Method not implemented.");
    }

    makeReply(
        parentPID: PID,
        title: string,
        file: Blob,
        uid: UID,
        username: string
    ): void {
        // Call makePost, then append reply
        // to parent post's replies list.
        
        replies.push(this.database.makePost(post));
        
        // throw new Error("Method not implemented.");
    }

    editLikes(uid: UID, pid: PID, delta: number): void {
        // Get likes from database,
        // update likes with likes + delta
        // create post editable object, create object with just likes +/- 1
        
        

        // throw new Error("Method not implemented.");
    }
}

export { PostBuilder };
