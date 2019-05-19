import { IBasicUser } from "../components/autocomplete";

export interface IGetUserData extends IBasicUser {
    email: string;
    may_login?: boolean;
}

export interface IGetItems {
    results: [{
        name: string;
        items: [{
            id: string;
            display_name: string;
            owner_name: string;
        }];
    }];
}
