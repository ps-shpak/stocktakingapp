// package: stocktakingapi
// file: api.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as api_pb from "./api_pb";

interface IBackendService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    saveItem: IBackendService_ISaveItem;
    loadItem: IBackendService_ILoadItem;
    listItems: IBackendService_IListItems;
    disposeItems: IBackendService_IDisposeItems;
    transferItems: IBackendService_ITransferItems;
    listOwners: IBackendService_IListOwners;
    addOwners: IBackendService_IAddOwners;
    saveOwner: IBackendService_ISaveOwner;
    authorize: IBackendService_IAuthorize;
}

interface IBackendService_ISaveItem extends grpc.MethodDefinition<api_pb.SaveItemRequest, api_pb.SaveItemResponse> {
    path: string; // "/stocktakingapi.Backend/SaveItem"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.SaveItemRequest>;
    requestDeserialize: grpc.deserialize<api_pb.SaveItemRequest>;
    responseSerialize: grpc.serialize<api_pb.SaveItemResponse>;
    responseDeserialize: grpc.deserialize<api_pb.SaveItemResponse>;
}
interface IBackendService_ILoadItem extends grpc.MethodDefinition<api_pb.LoadItemRequest, api_pb.LoadItemResponse> {
    path: string; // "/stocktakingapi.Backend/LoadItem"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.LoadItemRequest>;
    requestDeserialize: grpc.deserialize<api_pb.LoadItemRequest>;
    responseSerialize: grpc.serialize<api_pb.LoadItemResponse>;
    responseDeserialize: grpc.deserialize<api_pb.LoadItemResponse>;
}
interface IBackendService_IListItems extends grpc.MethodDefinition<api_pb.ListItemsRequest, api_pb.ListItemsResponse> {
    path: string; // "/stocktakingapi.Backend/ListItems"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.ListItemsRequest>;
    requestDeserialize: grpc.deserialize<api_pb.ListItemsRequest>;
    responseSerialize: grpc.serialize<api_pb.ListItemsResponse>;
    responseDeserialize: grpc.deserialize<api_pb.ListItemsResponse>;
}
interface IBackendService_IDisposeItems extends grpc.MethodDefinition<api_pb.DisposeItemsRequest, api_pb.DisposeItemsResponse> {
    path: string; // "/stocktakingapi.Backend/DisposeItems"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.DisposeItemsRequest>;
    requestDeserialize: grpc.deserialize<api_pb.DisposeItemsRequest>;
    responseSerialize: grpc.serialize<api_pb.DisposeItemsResponse>;
    responseDeserialize: grpc.deserialize<api_pb.DisposeItemsResponse>;
}
interface IBackendService_ITransferItems extends grpc.MethodDefinition<api_pb.TransferItemsRequest, api_pb.TransferItemsResponse> {
    path: string; // "/stocktakingapi.Backend/TransferItems"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.TransferItemsRequest>;
    requestDeserialize: grpc.deserialize<api_pb.TransferItemsRequest>;
    responseSerialize: grpc.serialize<api_pb.TransferItemsResponse>;
    responseDeserialize: grpc.deserialize<api_pb.TransferItemsResponse>;
}
interface IBackendService_IListOwners extends grpc.MethodDefinition<api_pb.ListOwnersRequest, api_pb.ListOwnersResponse> {
    path: string; // "/stocktakingapi.Backend/ListOwners"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.ListOwnersRequest>;
    requestDeserialize: grpc.deserialize<api_pb.ListOwnersRequest>;
    responseSerialize: grpc.serialize<api_pb.ListOwnersResponse>;
    responseDeserialize: grpc.deserialize<api_pb.ListOwnersResponse>;
}
interface IBackendService_IAddOwners extends grpc.MethodDefinition<api_pb.AddOwnersRequest, api_pb.AddOwnersResponse> {
    path: string; // "/stocktakingapi.Backend/AddOwners"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.AddOwnersRequest>;
    requestDeserialize: grpc.deserialize<api_pb.AddOwnersRequest>;
    responseSerialize: grpc.serialize<api_pb.AddOwnersResponse>;
    responseDeserialize: grpc.deserialize<api_pb.AddOwnersResponse>;
}
interface IBackendService_ISaveOwner extends grpc.MethodDefinition<api_pb.SaveOwnerRequest, api_pb.SaveOwnerResponse> {
    path: string; // "/stocktakingapi.Backend/SaveOwner"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.SaveOwnerRequest>;
    requestDeserialize: grpc.deserialize<api_pb.SaveOwnerRequest>;
    responseSerialize: grpc.serialize<api_pb.SaveOwnerResponse>;
    responseDeserialize: grpc.deserialize<api_pb.SaveOwnerResponse>;
}
interface IBackendService_IAuthorize extends grpc.MethodDefinition<api_pb.AuthorizeRequest, api_pb.AuthorizeResponse> {
    path: string; // "/stocktakingapi.Backend/Authorize"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<api_pb.AuthorizeRequest>;
    requestDeserialize: grpc.deserialize<api_pb.AuthorizeRequest>;
    responseSerialize: grpc.serialize<api_pb.AuthorizeResponse>;
    responseDeserialize: grpc.deserialize<api_pb.AuthorizeResponse>;
}

export const BackendService: IBackendService;

export interface IBackendServer {
    saveItem: grpc.handleUnaryCall<api_pb.SaveItemRequest, api_pb.SaveItemResponse>;
    loadItem: grpc.handleUnaryCall<api_pb.LoadItemRequest, api_pb.LoadItemResponse>;
    listItems: grpc.handleUnaryCall<api_pb.ListItemsRequest, api_pb.ListItemsResponse>;
    disposeItems: grpc.handleUnaryCall<api_pb.DisposeItemsRequest, api_pb.DisposeItemsResponse>;
    transferItems: grpc.handleUnaryCall<api_pb.TransferItemsRequest, api_pb.TransferItemsResponse>;
    listOwners: grpc.handleUnaryCall<api_pb.ListOwnersRequest, api_pb.ListOwnersResponse>;
    addOwners: grpc.handleUnaryCall<api_pb.AddOwnersRequest, api_pb.AddOwnersResponse>;
    saveOwner: grpc.handleUnaryCall<api_pb.SaveOwnerRequest, api_pb.SaveOwnerResponse>;
    authorize: grpc.handleUnaryCall<api_pb.AuthorizeRequest, api_pb.AuthorizeResponse>;
}

export interface IBackendClient {
    saveItem(request: api_pb.SaveItemRequest, callback: (error: grpc.ServiceError | null, response: api_pb.SaveItemResponse) => void): grpc.ClientUnaryCall;
    saveItem(request: api_pb.SaveItemRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.SaveItemResponse) => void): grpc.ClientUnaryCall;
    saveItem(request: api_pb.SaveItemRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.SaveItemResponse) => void): grpc.ClientUnaryCall;
    loadItem(request: api_pb.LoadItemRequest, callback: (error: grpc.ServiceError | null, response: api_pb.LoadItemResponse) => void): grpc.ClientUnaryCall;
    loadItem(request: api_pb.LoadItemRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.LoadItemResponse) => void): grpc.ClientUnaryCall;
    loadItem(request: api_pb.LoadItemRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.LoadItemResponse) => void): grpc.ClientUnaryCall;
    listItems(request: api_pb.ListItemsRequest, callback: (error: grpc.ServiceError | null, response: api_pb.ListItemsResponse) => void): grpc.ClientUnaryCall;
    listItems(request: api_pb.ListItemsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.ListItemsResponse) => void): grpc.ClientUnaryCall;
    listItems(request: api_pb.ListItemsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.ListItemsResponse) => void): grpc.ClientUnaryCall;
    disposeItems(request: api_pb.DisposeItemsRequest, callback: (error: grpc.ServiceError | null, response: api_pb.DisposeItemsResponse) => void): grpc.ClientUnaryCall;
    disposeItems(request: api_pb.DisposeItemsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.DisposeItemsResponse) => void): grpc.ClientUnaryCall;
    disposeItems(request: api_pb.DisposeItemsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.DisposeItemsResponse) => void): grpc.ClientUnaryCall;
    transferItems(request: api_pb.TransferItemsRequest, callback: (error: grpc.ServiceError | null, response: api_pb.TransferItemsResponse) => void): grpc.ClientUnaryCall;
    transferItems(request: api_pb.TransferItemsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.TransferItemsResponse) => void): grpc.ClientUnaryCall;
    transferItems(request: api_pb.TransferItemsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.TransferItemsResponse) => void): grpc.ClientUnaryCall;
    listOwners(request: api_pb.ListOwnersRequest, callback: (error: grpc.ServiceError | null, response: api_pb.ListOwnersResponse) => void): grpc.ClientUnaryCall;
    listOwners(request: api_pb.ListOwnersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.ListOwnersResponse) => void): grpc.ClientUnaryCall;
    listOwners(request: api_pb.ListOwnersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.ListOwnersResponse) => void): grpc.ClientUnaryCall;
    addOwners(request: api_pb.AddOwnersRequest, callback: (error: grpc.ServiceError | null, response: api_pb.AddOwnersResponse) => void): grpc.ClientUnaryCall;
    addOwners(request: api_pb.AddOwnersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.AddOwnersResponse) => void): grpc.ClientUnaryCall;
    addOwners(request: api_pb.AddOwnersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.AddOwnersResponse) => void): grpc.ClientUnaryCall;
    saveOwner(request: api_pb.SaveOwnerRequest, callback: (error: grpc.ServiceError | null, response: api_pb.SaveOwnerResponse) => void): grpc.ClientUnaryCall;
    saveOwner(request: api_pb.SaveOwnerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.SaveOwnerResponse) => void): grpc.ClientUnaryCall;
    saveOwner(request: api_pb.SaveOwnerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.SaveOwnerResponse) => void): grpc.ClientUnaryCall;
    authorize(request: api_pb.AuthorizeRequest, callback: (error: grpc.ServiceError | null, response: api_pb.AuthorizeResponse) => void): grpc.ClientUnaryCall;
    authorize(request: api_pb.AuthorizeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.AuthorizeResponse) => void): grpc.ClientUnaryCall;
    authorize(request: api_pb.AuthorizeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.AuthorizeResponse) => void): grpc.ClientUnaryCall;
}

export class BackendClient extends grpc.Client implements IBackendClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public saveItem(request: api_pb.SaveItemRequest, callback: (error: grpc.ServiceError | null, response: api_pb.SaveItemResponse) => void): grpc.ClientUnaryCall;
    public saveItem(request: api_pb.SaveItemRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.SaveItemResponse) => void): grpc.ClientUnaryCall;
    public saveItem(request: api_pb.SaveItemRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.SaveItemResponse) => void): grpc.ClientUnaryCall;
    public loadItem(request: api_pb.LoadItemRequest, callback: (error: grpc.ServiceError | null, response: api_pb.LoadItemResponse) => void): grpc.ClientUnaryCall;
    public loadItem(request: api_pb.LoadItemRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.LoadItemResponse) => void): grpc.ClientUnaryCall;
    public loadItem(request: api_pb.LoadItemRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.LoadItemResponse) => void): grpc.ClientUnaryCall;
    public listItems(request: api_pb.ListItemsRequest, callback: (error: grpc.ServiceError | null, response: api_pb.ListItemsResponse) => void): grpc.ClientUnaryCall;
    public listItems(request: api_pb.ListItemsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.ListItemsResponse) => void): grpc.ClientUnaryCall;
    public listItems(request: api_pb.ListItemsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.ListItemsResponse) => void): grpc.ClientUnaryCall;
    public disposeItems(request: api_pb.DisposeItemsRequest, callback: (error: grpc.ServiceError | null, response: api_pb.DisposeItemsResponse) => void): grpc.ClientUnaryCall;
    public disposeItems(request: api_pb.DisposeItemsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.DisposeItemsResponse) => void): grpc.ClientUnaryCall;
    public disposeItems(request: api_pb.DisposeItemsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.DisposeItemsResponse) => void): grpc.ClientUnaryCall;
    public transferItems(request: api_pb.TransferItemsRequest, callback: (error: grpc.ServiceError | null, response: api_pb.TransferItemsResponse) => void): grpc.ClientUnaryCall;
    public transferItems(request: api_pb.TransferItemsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.TransferItemsResponse) => void): grpc.ClientUnaryCall;
    public transferItems(request: api_pb.TransferItemsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.TransferItemsResponse) => void): grpc.ClientUnaryCall;
    public listOwners(request: api_pb.ListOwnersRequest, callback: (error: grpc.ServiceError | null, response: api_pb.ListOwnersResponse) => void): grpc.ClientUnaryCall;
    public listOwners(request: api_pb.ListOwnersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.ListOwnersResponse) => void): grpc.ClientUnaryCall;
    public listOwners(request: api_pb.ListOwnersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.ListOwnersResponse) => void): grpc.ClientUnaryCall;
    public addOwners(request: api_pb.AddOwnersRequest, callback: (error: grpc.ServiceError | null, response: api_pb.AddOwnersResponse) => void): grpc.ClientUnaryCall;
    public addOwners(request: api_pb.AddOwnersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.AddOwnersResponse) => void): grpc.ClientUnaryCall;
    public addOwners(request: api_pb.AddOwnersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.AddOwnersResponse) => void): grpc.ClientUnaryCall;
    public saveOwner(request: api_pb.SaveOwnerRequest, callback: (error: grpc.ServiceError | null, response: api_pb.SaveOwnerResponse) => void): grpc.ClientUnaryCall;
    public saveOwner(request: api_pb.SaveOwnerRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.SaveOwnerResponse) => void): grpc.ClientUnaryCall;
    public saveOwner(request: api_pb.SaveOwnerRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.SaveOwnerResponse) => void): grpc.ClientUnaryCall;
    public authorize(request: api_pb.AuthorizeRequest, callback: (error: grpc.ServiceError | null, response: api_pb.AuthorizeResponse) => void): grpc.ClientUnaryCall;
    public authorize(request: api_pb.AuthorizeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.AuthorizeResponse) => void): grpc.ClientUnaryCall;
    public authorize(request: api_pb.AuthorizeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.AuthorizeResponse) => void): grpc.ClientUnaryCall;
}
