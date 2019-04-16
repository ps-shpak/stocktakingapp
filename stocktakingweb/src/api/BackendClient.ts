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
    private backend: pb.BackendClient;

    constructor() {
        const backendEndpoint = process.env['BACKEND_HOST'] || "localhost:8081";
        this.backend = new pb.BackendClient(backendEndpoint, null, null);
    }

    public authorize(request: AuthorizeRequest): Promise<AuthorizeResponse> {
        return this.invoke(request, this.backend.authorize);
    }

    public listItems(request: ListItemsRequest): Promise<ListItemsResponse> {
        return this.invoke(request, this.backend.listItems);
    }

    public transferItems(request: TransferItemsRequest): Promise<TransferItemsResponse> {
        return this.invoke(request, this.backend.transferItems);
    }

    public disposeItems(request: DisposeItemsRequest): Promise<DisposeItemsResponse> {
        return this.invoke(request, this.backend.disposeItems);
    }

    public saveItem(request: SaveItemRequest): Promise<SaveItemResponse> {
        return this.invoke(request, this.backend.saveItem);
    }

    public loadItem(request: LoadItemRequest): Promise<LoadItemResponse> {
        return this.invoke(request, this.backend.loadItem);
    }

    public addOwners(request: AddOwnersRequest): Promise<AddOwnersResponse> {
        return this.invoke(request, this.backend.addOwners);
    }

    public saveOwner(request: SaveOwnerRequest): Promise<SaveOwnerResponse> {
        return this.invoke(request, this.backend.saveOwner);
    }

    public listOwners(request: ListOwnersRequest): Promise<ListOwnersResponse> {
        return this.invoke(request, this.backend.listOwners)
    }

    private invoke<Req, Res>(req: Req, method: (req: Req, metadata: grpcWeb.Metadata | null, callback: (error: grpcWeb.Error, res: Res) => void) => grpcWeb.ClientReadableStream<Res>): Promise<Res> {
        return new Promise((resolve: Function, reject: Function) => {
            method.call(this.backend, req, null, (error: grpcWeb.Error, res: Res): void => {
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

