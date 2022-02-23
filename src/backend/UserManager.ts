class UserManager implements IUserManager {
    validator: IValidator;
    database: IDatabase;

    submitOnValid(user: any): void {
        if (this.validator.validate(user)) this.updateUser(user);
    }

    createUser(user: any): void {
        throw new Error("Method not implemented.");
    }

    updateUser(user: any): void {
        throw new Error("Method not implemented.");
    }
}

export { UserManager };
