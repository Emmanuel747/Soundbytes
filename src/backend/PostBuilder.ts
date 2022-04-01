// TODO

class PostBuilder implements IPostBuilder {
    makePost(title: string, file: Blob, uid: string, username: string): void {
        // Call MediaStorage.upload and MediaStorage.getLink.
        // Create a Post object, then call Database.makePost.
        throw new Error("Method not implemented.");
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
        throw new Error("Method not implemented.");
    }

    editLikes(uid: UID, pid: PID, delta: number): void {
        // Get likes from database,
        // Update likes with likes + delta
        // Append pid to likedPosts on user
        throw new Error("Method not implemented.");
    }
}

export { PostBuilder };
