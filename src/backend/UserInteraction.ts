class UserInteraction implements IUserInteraction {
    follow(myUID: string, otherUID: string): void {
        throw new Error("Method not implemented.");
    }
    unfollow(myUID: string, otherUID: string): void {
        throw new Error("Method not implemented.");
    }
}

export { UserInteraction };
