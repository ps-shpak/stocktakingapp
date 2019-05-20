import { IBasicUser } from "../components/autocomplete";

export interface IGetUserData extends IBasicUser {
    email: string;
    may_login?: boolean;
}
