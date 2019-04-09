/**
 * @fileoverview gRPC-Web generated client stub for stocktakingapi
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


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
  TransferItemsResponse} from './api_pb';

export class BackendClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials: null | { [index: string]: string; },
               options: null | { [index: string]: string; }) {
    if (!options) options = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoSaveItem = new grpcWeb.AbstractClientBase.MethodInfo(
    SaveItemResponse,
    (request: SaveItemRequest) => {
      return request.serializeBinary();
    },
    SaveItemResponse.deserializeBinary
  );

  saveItem(
    request: SaveItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: SaveItemResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stocktakingapi.Backend/SaveItem',
      request,
      metadata || {},
      this.methodInfoSaveItem,
      callback);
  }

  methodInfoLoadItem = new grpcWeb.AbstractClientBase.MethodInfo(
    LoadItemResponse,
    (request: LoadItemRequest) => {
      return request.serializeBinary();
    },
    LoadItemResponse.deserializeBinary
  );

  loadItem(
    request: LoadItemRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: LoadItemResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stocktakingapi.Backend/LoadItem',
      request,
      metadata || {},
      this.methodInfoLoadItem,
      callback);
  }

  methodInfoListItems = new grpcWeb.AbstractClientBase.MethodInfo(
    ListItemsResponse,
    (request: ListItemsRequest) => {
      return request.serializeBinary();
    },
    ListItemsResponse.deserializeBinary
  );

  listItems(
    request: ListItemsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ListItemsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stocktakingapi.Backend/ListItems',
      request,
      metadata || {},
      this.methodInfoListItems,
      callback);
  }

  methodInfoDisposeItems = new grpcWeb.AbstractClientBase.MethodInfo(
    DisposeItemsResponse,
    (request: DisposeItemsRequest) => {
      return request.serializeBinary();
    },
    DisposeItemsResponse.deserializeBinary
  );

  disposeItems(
    request: DisposeItemsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: DisposeItemsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stocktakingapi.Backend/DisposeItems',
      request,
      metadata || {},
      this.methodInfoDisposeItems,
      callback);
  }

  methodInfoTransferItems = new grpcWeb.AbstractClientBase.MethodInfo(
    TransferItemsResponse,
    (request: TransferItemsRequest) => {
      return request.serializeBinary();
    },
    TransferItemsResponse.deserializeBinary
  );

  transferItems(
    request: TransferItemsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: TransferItemsResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stocktakingapi.Backend/TransferItems',
      request,
      metadata || {},
      this.methodInfoTransferItems,
      callback);
  }

  methodInfoListOwners = new grpcWeb.AbstractClientBase.MethodInfo(
    ListOwnersResponse,
    (request: ListOwnersRequest) => {
      return request.serializeBinary();
    },
    ListOwnersResponse.deserializeBinary
  );

  listOwners(
    request: ListOwnersRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ListOwnersResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stocktakingapi.Backend/ListOwners',
      request,
      metadata || {},
      this.methodInfoListOwners,
      callback);
  }

  methodInfoAddOwners = new grpcWeb.AbstractClientBase.MethodInfo(
    AddOwnersResponse,
    (request: AddOwnersRequest) => {
      return request.serializeBinary();
    },
    AddOwnersResponse.deserializeBinary
  );

  addOwners(
    request: AddOwnersRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AddOwnersResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stocktakingapi.Backend/AddOwners',
      request,
      metadata || {},
      this.methodInfoAddOwners,
      callback);
  }

  methodInfoSaveOwner = new grpcWeb.AbstractClientBase.MethodInfo(
    SaveOwnerResponse,
    (request: SaveOwnerRequest) => {
      return request.serializeBinary();
    },
    SaveOwnerResponse.deserializeBinary
  );

  saveOwner(
    request: SaveOwnerRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: SaveOwnerResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stocktakingapi.Backend/SaveOwner',
      request,
      metadata || {},
      this.methodInfoSaveOwner,
      callback);
  }

  methodInfoAuthorize = new grpcWeb.AbstractClientBase.MethodInfo(
    AuthorizeResponse,
    (request: AuthorizeRequest) => {
      return request.serializeBinary();
    },
    AuthorizeResponse.deserializeBinary
  );

  authorize(
    request: AuthorizeRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: AuthorizeResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/stocktakingapi.Backend/Authorize',
      request,
      metadata || {},
      this.methodInfoAuthorize,
      callback);
  }

}

