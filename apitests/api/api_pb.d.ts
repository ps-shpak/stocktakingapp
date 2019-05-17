// package: stocktakingapi
// file: api.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class ItemSpec extends jspb.Message { 
    getKind(): string;
    setKind(value: string): void;

    getCategory(): string;
    setCategory(value: string): void;

    getPlace(): string;
    setPlace(value: string): void;

    getOwnerId(): string;
    setOwnerId(value: string): void;

    getPrice(): number;
    setPrice(value: number): void;

    getDescription(): string;
    setDescription(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ItemSpec.AsObject;
    static toObject(includeInstance: boolean, msg: ItemSpec): ItemSpec.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ItemSpec, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ItemSpec;
    static deserializeBinaryFromReader(message: ItemSpec, reader: jspb.BinaryReader): ItemSpec;
}

export namespace ItemSpec {
    export type AsObject = {
        kind: string,
        category: string,
        place: string,
        ownerId: string,
        price: number,
        description: string,
    }
}

export class SaveItemRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    hasSpec(): boolean;
    clearSpec(): void;
    getSpec(): ItemSpec | undefined;
    setSpec(value?: ItemSpec): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SaveItemRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SaveItemRequest): SaveItemRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SaveItemRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SaveItemRequest;
    static deserializeBinaryFromReader(message: SaveItemRequest, reader: jspb.BinaryReader): SaveItemRequest;
}

export namespace SaveItemRequest {
    export type AsObject = {
        id: string,
        spec?: ItemSpec.AsObject,
    }
}

export class SaveItemResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SaveItemResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SaveItemResponse): SaveItemResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SaveItemResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SaveItemResponse;
    static deserializeBinaryFromReader(message: SaveItemResponse, reader: jspb.BinaryReader): SaveItemResponse;
}

export namespace SaveItemResponse {
    export type AsObject = {
        id: string,
    }
}

export class LoadItemRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoadItemRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LoadItemRequest): LoadItemRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoadItemRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoadItemRequest;
    static deserializeBinaryFromReader(message: LoadItemRequest, reader: jspb.BinaryReader): LoadItemRequest;
}

export namespace LoadItemRequest {
    export type AsObject = {
        id: string,
    }
}

export class LoadItemResponse extends jspb.Message { 
    getDisplayName(): string;
    setDisplayName(value: string): void;

    getOwnerName(): string;
    setOwnerName(value: string): void;


    hasSpec(): boolean;
    clearSpec(): void;
    getSpec(): ItemSpec | undefined;
    setSpec(value?: ItemSpec): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoadItemResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LoadItemResponse): LoadItemResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoadItemResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoadItemResponse;
    static deserializeBinaryFromReader(message: LoadItemResponse, reader: jspb.BinaryReader): LoadItemResponse;
}

export namespace LoadItemResponse {
    export type AsObject = {
        displayName: string,
        ownerName: string,
        spec?: ItemSpec.AsObject,
    }
}

export class ItemTreeNode extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getDisplayName(): string;
    setDisplayName(value: string): void;

    getOwnerName(): string;
    setOwnerName(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ItemTreeNode.AsObject;
    static toObject(includeInstance: boolean, msg: ItemTreeNode): ItemTreeNode.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ItemTreeNode, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ItemTreeNode;
    static deserializeBinaryFromReader(message: ItemTreeNode, reader: jspb.BinaryReader): ItemTreeNode;
}

export namespace ItemTreeNode {
    export type AsObject = {
        id: string,
        displayName: string,
        ownerName: string,
    }
}

export class ItemTreeGroup extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    clearItemsList(): void;
    getItemsList(): Array<ItemTreeNode>;
    setItemsList(value: Array<ItemTreeNode>): void;
    addItems(value?: ItemTreeNode, index?: number): ItemTreeNode;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ItemTreeGroup.AsObject;
    static toObject(includeInstance: boolean, msg: ItemTreeGroup): ItemTreeGroup.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ItemTreeGroup, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ItemTreeGroup;
    static deserializeBinaryFromReader(message: ItemTreeGroup, reader: jspb.BinaryReader): ItemTreeGroup;
}

export namespace ItemTreeGroup {
    export type AsObject = {
        name: string,
        itemsList: Array<ItemTreeNode.AsObject>,
    }
}

export class ListItemsRequest extends jspb.Message { 
    getGroupingMethod(): ItemGroupingMethod;
    setGroupingMethod(value: ItemGroupingMethod): void;

    getKind(): string;
    setKind(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListItemsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListItemsRequest): ListItemsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListItemsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListItemsRequest;
    static deserializeBinaryFromReader(message: ListItemsRequest, reader: jspb.BinaryReader): ListItemsRequest;
}

export namespace ListItemsRequest {
    export type AsObject = {
        groupingMethod: ItemGroupingMethod,
        kind: string,
    }
}

export class ListItemsResponse extends jspb.Message { 
    clearResultsList(): void;
    getResultsList(): Array<ItemTreeGroup>;
    setResultsList(value: Array<ItemTreeGroup>): void;
    addResults(value?: ItemTreeGroup, index?: number): ItemTreeGroup;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListItemsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListItemsResponse): ListItemsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListItemsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListItemsResponse;
    static deserializeBinaryFromReader(message: ListItemsResponse, reader: jspb.BinaryReader): ListItemsResponse;
}

export namespace ListItemsResponse {
    export type AsObject = {
        resultsList: Array<ItemTreeGroup.AsObject>,
    }
}

export class DisposeItemsRequest extends jspb.Message { 
    clearIdsList(): void;
    getIdsList(): Array<string>;
    setIdsList(value: Array<string>): void;
    addIds(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DisposeItemsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DisposeItemsRequest): DisposeItemsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DisposeItemsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DisposeItemsRequest;
    static deserializeBinaryFromReader(message: DisposeItemsRequest, reader: jspb.BinaryReader): DisposeItemsRequest;
}

export namespace DisposeItemsRequest {
    export type AsObject = {
        idsList: Array<string>,
    }
}

export class DisposeItemsResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DisposeItemsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DisposeItemsResponse): DisposeItemsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DisposeItemsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DisposeItemsResponse;
    static deserializeBinaryFromReader(message: DisposeItemsResponse, reader: jspb.BinaryReader): DisposeItemsResponse;
}

export namespace DisposeItemsResponse {
    export type AsObject = {
    }
}

export class TransferItemsRequest extends jspb.Message { 
    clearIdsList(): void;
    getIdsList(): Array<string>;
    setIdsList(value: Array<string>): void;
    addIds(value: string, index?: number): string;

    getOwnerId(): string;
    setOwnerId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransferItemsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: TransferItemsRequest): TransferItemsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransferItemsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransferItemsRequest;
    static deserializeBinaryFromReader(message: TransferItemsRequest, reader: jspb.BinaryReader): TransferItemsRequest;
}

export namespace TransferItemsRequest {
    export type AsObject = {
        idsList: Array<string>,
        ownerId: string,
    }
}

export class TransferItemsResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransferItemsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: TransferItemsResponse): TransferItemsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransferItemsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransferItemsResponse;
    static deserializeBinaryFromReader(message: TransferItemsResponse, reader: jspb.BinaryReader): TransferItemsResponse;
}

export namespace TransferItemsResponse {
    export type AsObject = {
    }
}

export class ListOwnersRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListOwnersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListOwnersRequest): ListOwnersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListOwnersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListOwnersRequest;
    static deserializeBinaryFromReader(message: ListOwnersRequest, reader: jspb.BinaryReader): ListOwnersRequest;
}

export namespace ListOwnersRequest {
    export type AsObject = {
    }
}

export class ListOwnersResponse extends jspb.Message { 
    clearResultsList(): void;
    getResultsList(): Array<ListOwnersResponse.Result>;
    setResultsList(value: Array<ListOwnersResponse.Result>): void;
    addResults(value?: ListOwnersResponse.Result, index?: number): ListOwnersResponse.Result;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListOwnersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListOwnersResponse): ListOwnersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListOwnersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListOwnersResponse;
    static deserializeBinaryFromReader(message: ListOwnersResponse, reader: jspb.BinaryReader): ListOwnersResponse;
}

export namespace ListOwnersResponse {
    export type AsObject = {
        resultsList: Array<ListOwnersResponse.Result.AsObject>,
    }


    export class Result extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getName(): string;
    setName(value: string): void;

    getEmail(): string;
    setEmail(value: string): void;

    getMayLogin(): boolean;
    setMayLogin(value: boolean): void;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Result.AsObject;
        static toObject(includeInstance: boolean, msg: Result): Result.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Result, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Result;
        static deserializeBinaryFromReader(message: Result, reader: jspb.BinaryReader): Result;
    }

    export namespace Result {
        export type AsObject = {
        id: string,
        name: string,
        email: string,
        mayLogin: boolean,
        }
    }

}

export class AddOwnersRequest extends jspb.Message { 
    clearOwnersList(): void;
    getOwnersList(): Array<AddOwnersRequest.Owner>;
    setOwnersList(value: Array<AddOwnersRequest.Owner>): void;
    addOwners(value?: AddOwnersRequest.Owner, index?: number): AddOwnersRequest.Owner;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddOwnersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddOwnersRequest): AddOwnersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddOwnersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddOwnersRequest;
    static deserializeBinaryFromReader(message: AddOwnersRequest, reader: jspb.BinaryReader): AddOwnersRequest;
}

export namespace AddOwnersRequest {
    export type AsObject = {
        ownersList: Array<AddOwnersRequest.Owner.AsObject>,
    }


    export class Owner extends jspb.Message { 
    getName(): string;
    setName(value: string): void;

    getEmail(): string;
    setEmail(value: string): void;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Owner.AsObject;
        static toObject(includeInstance: boolean, msg: Owner): Owner.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Owner, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Owner;
        static deserializeBinaryFromReader(message: Owner, reader: jspb.BinaryReader): Owner;
    }

    export namespace Owner {
        export type AsObject = {
        name: string,
        email: string,
        }
    }

}

export class AddOwnersResponse extends jspb.Message { 
    clearOwnersList(): void;
    getOwnersList(): Array<AddOwnersResponse.Owner>;
    setOwnersList(value: Array<AddOwnersResponse.Owner>): void;
    addOwners(value?: AddOwnersResponse.Owner, index?: number): AddOwnersResponse.Owner;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddOwnersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AddOwnersResponse): AddOwnersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddOwnersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddOwnersResponse;
    static deserializeBinaryFromReader(message: AddOwnersResponse, reader: jspb.BinaryReader): AddOwnersResponse;
}

export namespace AddOwnersResponse {
    export type AsObject = {
        ownersList: Array<AddOwnersResponse.Owner.AsObject>,
    }


    export class Owner extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


        serializeBinary(): Uint8Array;
        toObject(includeInstance?: boolean): Owner.AsObject;
        static toObject(includeInstance: boolean, msg: Owner): Owner.AsObject;
        static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
        static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
        static serializeBinaryToWriter(message: Owner, writer: jspb.BinaryWriter): void;
        static deserializeBinary(bytes: Uint8Array): Owner;
        static deserializeBinaryFromReader(message: Owner, reader: jspb.BinaryReader): Owner;
    }

    export namespace Owner {
        export type AsObject = {
        id: string,
        }
    }

}

export class SaveOwnerRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getName(): string;
    setName(value: string): void;

    getEmail(): string;
    setEmail(value: string): void;

    getMayLogin(): boolean;
    setMayLogin(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SaveOwnerRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SaveOwnerRequest): SaveOwnerRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SaveOwnerRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SaveOwnerRequest;
    static deserializeBinaryFromReader(message: SaveOwnerRequest, reader: jspb.BinaryReader): SaveOwnerRequest;
}

export namespace SaveOwnerRequest {
    export type AsObject = {
        id: string,
        name: string,
        email: string,
        mayLogin: boolean,
    }
}

export class SaveOwnerResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SaveOwnerResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SaveOwnerResponse): SaveOwnerResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SaveOwnerResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SaveOwnerResponse;
    static deserializeBinaryFromReader(message: SaveOwnerResponse, reader: jspb.BinaryReader): SaveOwnerResponse;
}

export namespace SaveOwnerResponse {
    export type AsObject = {
        id: string,
    }
}

export class LoadOwnerRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoadOwnerRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LoadOwnerRequest): LoadOwnerRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoadOwnerRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoadOwnerRequest;
    static deserializeBinaryFromReader(message: LoadOwnerRequest, reader: jspb.BinaryReader): LoadOwnerRequest;
}

export namespace LoadOwnerRequest {
    export type AsObject = {
        id: string,
    }
}

export class LoadOwnerResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): void;

    getName(): string;
    setName(value: string): void;

    getEmail(): string;
    setEmail(value: string): void;

    getMayLogin(): boolean;
    setMayLogin(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoadOwnerResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LoadOwnerResponse): LoadOwnerResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoadOwnerResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoadOwnerResponse;
    static deserializeBinaryFromReader(message: LoadOwnerResponse, reader: jspb.BinaryReader): LoadOwnerResponse;
}

export namespace LoadOwnerResponse {
    export type AsObject = {
        id: string,
        name: string,
        email: string,
        mayLogin: boolean,
    }
}

export class DeleteOwnerRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteOwnerRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteOwnerRequest): DeleteOwnerRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteOwnerRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteOwnerRequest;
    static deserializeBinaryFromReader(message: DeleteOwnerRequest, reader: jspb.BinaryReader): DeleteOwnerRequest;
}

export namespace DeleteOwnerRequest {
    export type AsObject = {
        id: string,
    }
}

export class DeleteOwnerResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteOwnerResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteOwnerResponse): DeleteOwnerResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteOwnerResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteOwnerResponse;
    static deserializeBinaryFromReader(message: DeleteOwnerResponse, reader: jspb.BinaryReader): DeleteOwnerResponse;
}

export namespace DeleteOwnerResponse {
    export type AsObject = {
    }
}

export enum ItemGroupingMethod {
    BYCATEGORY = 0,
    BYOWNER = 1,
}
