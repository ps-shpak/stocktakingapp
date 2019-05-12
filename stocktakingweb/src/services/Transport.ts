import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ICreateUser } from "./RequestInterfaces";
import * as qs from "qs";
import { ApiPaths } from "../config";

export class Transport {
    private readonly instance: AxiosInstance;

    constructor() {
        this.instance = axios.create();
    }

    async createUser(data: ICreateUser): Promise<AxiosResponse<void>> {
        return this.instance.post(ApiPaths.OWNERS, qs.stringify(data));
    }
}
