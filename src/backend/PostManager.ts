class PostManager implements IPostManager {
    createPost(title, recording): void {
        console.log("Post titled '" + title + "' has been created")
    }
    updatingPost(post: Post): void {
        throw new Error("Method not implemented.");
    }
}

export { PostManager };
