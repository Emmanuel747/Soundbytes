import { FireDB } from "./Fire";

// Potential Abstract Factory

class GlobalFeedComposer implements IFeedComposer {
    database: IDatabase = new FireDB();

    composeFeed(): Feed {
        throw new Error("Method not implemented.");
    }
}

class PersonalFeedComposer implements IFeedComposer {
    database: IDatabase = new FireDB();

    composeFeed(): Feed {
        throw new Error("Method not implemented.");
    }
}
