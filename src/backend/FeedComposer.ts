import { FireDB } from "./Fire";

// Potential Abstract Factory
class AbstractFeedComposer implements IFeedComposer {
    database: IDatabase;

    composeFeed(): Feed {
        throw new Error("Method not implemented.");
    }
}

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

export { GlobalFeedComposer, PersonalFeedComposer };
