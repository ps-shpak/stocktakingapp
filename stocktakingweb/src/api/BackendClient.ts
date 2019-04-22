import * as pb from './ApiServiceClientPb';
import * as grpcWeb from 'grpc-web';

import {
    AddOwnersRequest,
    AddOwnersResponse,
    AuthorizeRequest,
    AuthorizeResponse,
    DisposeItemsRequest,
    DisposeItemsResponse,
    ListItemsRequest,
    ListItemsResponse,
    ListOwnersRequest,
    ListOwnersResponse,
    LoadItemRequest,
    LoadItemResponse,
    SaveItemRequest,
    SaveItemResponse,
    SaveOwnerRequest,
    SaveOwnerResponse,
    TransferItemsRequest,
    TransferItemsResponse
} from './api_pb';

export class BackendClient {
    private static _instance: BackendClient = new BackendClient();
    private _backend: pb.BackendClient;

    private constructor() {
        if (BackendClient._instance){
            throw new Error("instantiation failed: use BackendClient.getInstance() instead of new BackendClient().");
        }

        const apiEndpoint = `/api`;
        this._backend = new pb.BackendClient(apiEndpoint, null, null);
        BackendClient._instance = this;
    }

    public static getInstance(): BackendClient {
        return BackendClient._instance
    }

    public authorize(request: AuthorizeRequest): Promise<AuthorizeResponse> {
        return this.invoke(request, this._backend.authorize);
    }

    public listItems(request: ListItemsRequest): Promise<ListItemsResponse> {
        return this.invoke(request, this._backend.listItems);
    }

    public transferItems(request: TransferItemsRequest): Promise<TransferItemsResponse> {
        return this.invoke(request, this._backend.transferItems);
    }

    public disposeItems(request: DisposeItemsRequest): Promise<DisposeItemsResponse> {
        return this.invoke(request, this._backend.disposeItems);
    }

    public saveItem(request: SaveItemRequest): Promise<SaveItemResponse> {
        return this.invoke(request, this._backend.saveItem);
    }

    public loadItem(request: LoadItemRequest): Promise<LoadItemResponse> {
        return this.invoke(request, this._backend.loadItem);
    }

    public addOwners(request: AddOwnersRequest): Promise<AddOwnersResponse> {
        return this.invoke(request, this._backend.addOwners);
    }

    public saveOwner(request: SaveOwnerRequest): Promise<SaveOwnerResponse> {
        return this.invoke(request, this._backend.saveOwner);
    }

    public listOwners(request: ListOwnersRequest): Promise<ListOwnersResponse> {
        return this.invoke(request, this._backend.listOwners)
    }

    private invoke<Req, Res>(req: Req, method: (req: Req, metadata: grpcWeb.Metadata | null, callback: (error: grpcWeb.Error, res: Res) => void) => grpcWeb.ClientReadableStream<Res>): Promise<Res> {
        return new Promise((resolve: Function, reject: Function) => {
            method.call(this._backend, req, null, (error: grpcWeb.Error, res: Res): void => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(res);
                }
            });
        });
    }
}

