export interface ICreateUserData {
    name: string;
    email: string;
}

export interface ICreateUser {
    owners: ICreateUserData[];
}
