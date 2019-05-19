import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ICreateProductData, ICreateUser } from "./RequestInterfaces";
import { ApiPaths, TItemGroupinMethod, TItemKind } from "../config";
import { IGetItems, IGetUserData } from "./ResponseInterfaces";

export class Transport {
    private readonly instance: AxiosInstance;

    constructor() {
        this.instance = axios.create();
    }

    async createUser(data: ICreateUser): Promise<AxiosResponse<void>> {
        return this.instance.post(ApiPaths.OWNERS, data);
    }

    async getUserList(): Promise<AxiosResponse<IGetUserData>> {
        return this.instance.get(ApiPaths.OWNERS);
    }

    async getUser(id: string): Promise<AxiosResponse<IGetUserData>> {
        return this.instance.get(ApiPaths.OWNER_ID.replace(":id", id));
    }

    async deleteUser(id: string): Promise<AxiosResponse<void>> {
        return this.instance.delete(ApiPaths.OWNER_ID.replace(":id", id));
    }

    async changeUser(data: IGetUserData): Promise<AxiosResponse<void>> {
        return this.instance.put(ApiPaths.OWNER, data);
    }

    async getItems(groupingMethod: TItemGroupinMethod, kind: TItemKind): Promise<AxiosResponse<IGetItems>> {
        return this.instance.get(ApiPaths.ITEMS, {
            params: {
                grouping_method: groupingMethod,
                kind
            }
        });
    }

    async createProduct(data: ICreateProductData): Promise<AxiosResponse<void>> {
        return this.instance.put(ApiPaths.ITEM, data);
    }
}
