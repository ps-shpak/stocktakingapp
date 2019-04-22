// This file represents models for the backend REST API
// See `stocktakingapi/api.proto` or `stocktakingbackend/api.swagger.json`.

export enum ItemGroupingMethod {
    ByCategory = "ByCategory",
    ByOwner = "ByOwner",
}

export class ItemSpec {
    category: string = '';
    place: string = '';
    ownerId: string = '';
    price: number = 0;
    description: string = '';
}

export class LoadItemResponse {
    displayName: string = '';
    ownerName: string = '';
    spec: ItemSpec = new ItemSpec();
}

export class ItemGroupNode {
    name: string = '';
    items: ItemNode[] = [];
}

export class ItemNode {
    id: string = '';
    displayName: string = '';
    ownerName: string = '';
}

export class TransferItemsRequest {
    ids: string[] = [];
    ownerId: string = '';
}

export class SaveItemRequest{
    id: string | undefined;
    spec: ItemSpec = new ItemSpec();
}

export class SaveItemResponse {
    id: string = '';
}

export class AddOwnersRequestOwner {
    name: string = '';
    email: string = '';
}

export class OwnerSpec {
    id: string = '';
    name: string = '';
    email: string = '';
    mayLogin: boolean = false;
}
