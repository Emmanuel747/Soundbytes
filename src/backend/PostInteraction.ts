class PostInteraction implements IPostInteraction {
    handleLike(uid: UID, pid: PID, likeStatus: boolean): void {
        throw new Error("Method not implemented.");
    }
    handleReply(postPID: PID, parentPID: PID): void {
        throw new Error("Method not implemented.");
    }
}

export { PostInteraction };
