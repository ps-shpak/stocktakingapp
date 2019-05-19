import { TItemKind } from "../config";

export interface ICreateUserData {
    name: string;
    email: string;
}

export interface ICreateUser {
    owners: ICreateUserData[];
}

export interface ICreateProductData {
    id?: string;
    spec: {
        kind: TItemKind;
        category: string;
        place: string;
        owner_id: string;
        price: number;
        description: string;
    };
}
