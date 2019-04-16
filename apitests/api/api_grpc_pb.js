// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var api_pb = require('./api_pb.js');

function serialize_stocktakingapi_AddOwnersRequest(arg) {
  if (!(arg instanceof api_pb.AddOwnersRequest)) {
    throw new Error('Expected argument of type stocktakingapi.AddOwnersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_AddOwnersRequest(buffer_arg) {
  return api_pb.AddOwnersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocktakingapi_AddOwnersResponse(arg) {
  if (!(arg instanceof api_pb.AddOwnersResponse)) {
    throw new Error('Expected argument of type stocktakingapi.AddOwnersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_AddOwnersResponse(buffer_arg) {
  return api_pb.AddOwnersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocktakingapi_AuthorizeRequest(arg) {
  if (!(arg instanceof api_pb.AuthorizeRequest)) {
    throw new Error('Expected argument of type stocktakingapi.AuthorizeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_AuthorizeRequest(buffer_arg) {
  return api_pb.AuthorizeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocktakingapi_AuthorizeResponse(arg) {
  if (!(arg instanceof api_pb.AuthorizeResponse)) {
    throw new Error('Expected argument of type stocktakingapi.AuthorizeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_AuthorizeResponse(buffer_arg) {
  return api_pb.AuthorizeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocktakingapi_DisposeItemsRequest(arg) {
  if (!(arg instanceof api_pb.DisposeItemsRequest)) {
    throw new Error('Expected argument of type stocktakingapi.DisposeItemsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_DisposeItemsRequest(buffer_arg) {
  return api_pb.DisposeItemsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocktakingapi_DisposeItemsResponse(arg) {
  if (!(arg instanceof api_pb.DisposeItemsResponse)) {
    throw new Error('Expected argument of type stocktakingapi.DisposeItemsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_DisposeItemsResponse(buffer_arg) {
  return api_pb.DisposeItemsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocktakingapi_ListItemsRequest(arg) {
  if (!(arg instanceof api_pb.ListItemsRequest)) {
    throw new Error('Expected argument of type stocktakingapi.ListItemsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_ListItemsRequest(buffer_arg) {
  return api_pb.ListItemsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocktakingapi_ListItemsResponse(arg) {
  if (!(arg instanceof api_pb.ListItemsResponse)) {
    throw new Error('Expected argument of type stocktakingapi.ListItemsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_ListItemsResponse(buffer_arg) {
  return api_pb.ListItemsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocktakingapi_ListOwnersRequest(arg) {
  if (!(arg instanceof api_pb.ListOwnersRequest)) {
    throw new Error('Expected argument of type stocktakingapi.ListOwnersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_ListOwnersRequest(buffer_arg) {
  return api_pb.ListOwnersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocktakingapi_ListOwnersResponse(arg) {
  if (!(arg instanceof api_pb.ListOwnersResponse)) {
    throw new Error('Expected argument of type stocktakingapi.ListOwnersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_ListOwnersResponse(buffer_arg) {
  return api_pb.ListOwnersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocktakingapi_LoadItemRequest(arg) {
  if (!(arg instanceof api_pb.LoadItemRequest)) {
    throw new Error('Expected argument of type stocktakingapi.LoadItemRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_LoadItemRequest(buffer_arg) {
  return api_pb.LoadItemRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocktakingapi_LoadItemResponse(arg) {
  if (!(arg instanceof api_pb.LoadItemResponse)) {
    throw new Error('Expected argument of type stocktakingapi.LoadItemResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_LoadItemResponse(buffer_arg) {
  return api_pb.LoadItemResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocktakingapi_SaveItemRequest(arg) {
  if (!(arg instanceof api_pb.SaveItemRequest)) {
    throw new Error('Expected argument of type stocktakingapi.SaveItemRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_SaveItemRequest(buffer_arg) {
  return api_pb.SaveItemRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocktakingapi_SaveItemResponse(arg) {
  if (!(arg instanceof api_pb.SaveItemResponse)) {
    throw new Error('Expected argument of type stocktakingapi.SaveItemResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_SaveItemResponse(buffer_arg) {
  return api_pb.SaveItemResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocktakingapi_SaveOwnerRequest(arg) {
  if (!(arg instanceof api_pb.SaveOwnerRequest)) {
    throw new Error('Expected argument of type stocktakingapi.SaveOwnerRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_SaveOwnerRequest(buffer_arg) {
  return api_pb.SaveOwnerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocktakingapi_SaveOwnerResponse(arg) {
  if (!(arg instanceof api_pb.SaveOwnerResponse)) {
    throw new Error('Expected argument of type stocktakingapi.SaveOwnerResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_SaveOwnerResponse(buffer_arg) {
  return api_pb.SaveOwnerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocktakingapi_TransferItemsRequest(arg) {
  if (!(arg instanceof api_pb.TransferItemsRequest)) {
    throw new Error('Expected argument of type stocktakingapi.TransferItemsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_TransferItemsRequest(buffer_arg) {
  return api_pb.TransferItemsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_stocktakingapi_TransferItemsResponse(arg) {
  if (!(arg instanceof api_pb.TransferItemsResponse)) {
    throw new Error('Expected argument of type stocktakingapi.TransferItemsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_stocktakingapi_TransferItemsResponse(buffer_arg) {
  return api_pb.TransferItemsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var BackendService = exports.BackendService = {
  // Creates new or saves existing item
  saveItem: {
    path: '/stocktakingapi.Backend/SaveItem',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.SaveItemRequest,
    responseType: api_pb.SaveItemResponse,
    requestSerialize: serialize_stocktakingapi_SaveItemRequest,
    requestDeserialize: deserialize_stocktakingapi_SaveItemRequest,
    responseSerialize: serialize_stocktakingapi_SaveItemResponse,
    responseDeserialize: deserialize_stocktakingapi_SaveItemResponse,
  },
  // Returns full information for item with given ID
  loadItem: {
    path: '/stocktakingapi.Backend/LoadItem',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.LoadItemRequest,
    responseType: api_pb.LoadItemResponse,
    requestSerialize: serialize_stocktakingapi_LoadItemRequest,
    requestDeserialize: deserialize_stocktakingapi_LoadItemRequest,
    responseSerialize: serialize_stocktakingapi_LoadItemResponse,
    responseDeserialize: deserialize_stocktakingapi_LoadItemResponse,
  },
  // Lists items tree grouped by category or owner
  listItems: {
    path: '/stocktakingapi.Backend/ListItems',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.ListItemsRequest,
    responseType: api_pb.ListItemsResponse,
    requestSerialize: serialize_stocktakingapi_ListItemsRequest,
    requestDeserialize: deserialize_stocktakingapi_ListItemsRequest,
    responseSerialize: serialize_stocktakingapi_ListItemsResponse,
    responseDeserialize: deserialize_stocktakingapi_ListItemsResponse,
  },
  // Disposes items with given IDs
  // Disposed item never appears in any listing,
  //  but remains accessible by ID
  disposeItems: {
    path: '/stocktakingapi.Backend/DisposeItems',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.DisposeItemsRequest,
    responseType: api_pb.DisposeItemsResponse,
    requestSerialize: serialize_stocktakingapi_DisposeItemsRequest,
    requestDeserialize: deserialize_stocktakingapi_DisposeItemsRequest,
    responseSerialize: serialize_stocktakingapi_DisposeItemsResponse,
    responseDeserialize: deserialize_stocktakingapi_DisposeItemsResponse,
  },
  // Transfers ownership to given user for items with given IDs
  transferItems: {
    path: '/stocktakingapi.Backend/TransferItems',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.TransferItemsRequest,
    responseType: api_pb.TransferItemsResponse,
    requestSerialize: serialize_stocktakingapi_TransferItemsRequest,
    requestDeserialize: deserialize_stocktakingapi_TransferItemsRequest,
    responseSerialize: serialize_stocktakingapi_TransferItemsResponse,
    responseDeserialize: deserialize_stocktakingapi_TransferItemsResponse,
  },
  // Lists all available owners
  listOwners: {
    path: '/stocktakingapi.Backend/ListOwners',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.ListOwnersRequest,
    responseType: api_pb.ListOwnersResponse,
    requestSerialize: serialize_stocktakingapi_ListOwnersRequest,
    requestDeserialize: deserialize_stocktakingapi_ListOwnersRequest,
    responseSerialize: serialize_stocktakingapi_ListOwnersResponse,
    responseDeserialize: deserialize_stocktakingapi_ListOwnersResponse,
  },
  // Adds new owners and returns list of results/errors
  addOwners: {
    path: '/stocktakingapi.Backend/AddOwners',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.AddOwnersRequest,
    responseType: api_pb.AddOwnersResponse,
    requestSerialize: serialize_stocktakingapi_AddOwnersRequest,
    requestDeserialize: deserialize_stocktakingapi_AddOwnersRequest,
    responseSerialize: serialize_stocktakingapi_AddOwnersResponse,
    responseDeserialize: deserialize_stocktakingapi_AddOwnersResponse,
  },
  // Saves existing owner with given ID.
  saveOwner: {
    path: '/stocktakingapi.Backend/SaveOwner',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.SaveOwnerRequest,
    responseType: api_pb.SaveOwnerResponse,
    requestSerialize: serialize_stocktakingapi_SaveOwnerRequest,
    requestDeserialize: deserialize_stocktakingapi_SaveOwnerRequest,
    responseSerialize: serialize_stocktakingapi_SaveOwnerResponse,
    responseDeserialize: deserialize_stocktakingapi_SaveOwnerResponse,
  },
  // Attempts to authorize user in this service
  // Authorization uses only email - caller must validate email
  //  before calling this method (e.g. sign in with Google).
  // Errors:
  //  - UnknownId - no such email registered in service
  //  - AuthForbidden - email belongs to owner which cannot service itself
  authorize: {
    path: '/stocktakingapi.Backend/Authorize',
    requestStream: false,
    responseStream: false,
    requestType: api_pb.AuthorizeRequest,
    responseType: api_pb.AuthorizeResponse,
    requestSerialize: serialize_stocktakingapi_AuthorizeRequest,
    requestDeserialize: deserialize_stocktakingapi_AuthorizeRequest,
    responseSerialize: serialize_stocktakingapi_AuthorizeResponse,
    responseDeserialize: deserialize_stocktakingapi_AuthorizeResponse,
  },
};

exports.BackendClient = grpc.makeGenericClientConstructor(BackendService);
