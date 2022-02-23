class UserManager implements IUserManager {
    validator: IValidator;
    database: IDatabase;

    submitOnValid(user: any): void {
        if (this.validator.validate(user)) this.updateUser(user);
    }

    updateUser(user: any): void {
        throw new Error("Method not implemented.");
    }
}
