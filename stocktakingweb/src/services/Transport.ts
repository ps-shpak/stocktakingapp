import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ICreateUser } from "./RequestInterfaces";
import { ApiPaths } from "../config";
import { IGetUserData } from "./ResponseInterfaces";

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
}
