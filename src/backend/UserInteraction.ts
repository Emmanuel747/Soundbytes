import { Database } from "./storage/Database";

class UserInteraction implements IUserInteraction {
    async getUsers(db: Database, uid1: UID, uid2: UID): Promise<[User, User]> {
        const user1 = await db.getUser(uid1);
        const user2 = await db.getUser(uid2);

        return [user1, user2];
    }

    async changeFollowing(
        db: Database,
        following: UID[],
        followingUID: UID,
        followers: UID[],
        followersUID: UID
    ): Promise<void> {
        await db.editUser({ following: following }, followingUID);
        await db.editUser({ followers: followers }, followersUID);
    }

    async follow(myUID: UID, otherUID: UID): Promise<void> {
        const db = new Database();

        const [myUser, otherUser] = await this.getUsers(db, myUID, otherUID);

        // Add other user to 'my' following list
        // Add current user to 'their' followers list
        const myFollowing = myUser.following;
        const otherFollowers = otherUser.followers;

        myFollowing.push(otherUID);
        otherFollowers.push(myUID);

        // Upload changes
        await this.changeFollowing(
            db,
            myFollowing,
            myUID,
            otherFollowers,
            otherUID
        );
    }

    async unfollow(myUID: UID, otherUID: UID): Promise<void> {
        const db = new Database();

        const [myUser, otherUser] = await this.getUsers(db, myUID, otherUID);

        // Remove other user from 'my' following list
        // Remove current user from 'their' followers list
        const myFollowing = myUser.following;
        const otherFollowers = otherUser.followers;

        myFollowing.splice(myFollowing.indexOf(otherUID), 1);
        otherFollowers.splice(otherFollowers.indexOf(myUID), 1);

        // Upload changes
        await this.changeFollowing(
            db,
            myFollowing,
            myUID,
            otherFollowers,
            otherUID
        );
    }
}

export { UserInteraction };
