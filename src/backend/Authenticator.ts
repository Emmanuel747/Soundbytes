// TODO - these should all be pretty self-explanatory

import { FireDB, FireAuth } from "./Fire";

class Authenticator implements IAuthenticator {
    signUp(username: string, email: string, password: string): string {
        throw new Error("Method not implemented.");
    }

    signIn(username: string, password: string): string {
        throw new Error("Method not implemented.");
    }

    signOut(): void {
        throw new Error("Method not implemented.");
    }
}
