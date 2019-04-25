// This file represents models for the backend REST API
// See `stocktakingapi/api.proto` or `stocktakingbackend/api.swagger.json`.

export enum ItemGroupingMethod {
    ByCategory = "ByCategory",
    ByOwner = "ByOwner",
}

export enum ItemKind {
    Equipment = "equipment",
    License = "license",
}

export class ItemSpec {
    kind = '';
    category = '';
    place = '';
    ownerId = '';
    price = 0;
    description = '';
}

export class LoadItemResponse {
    displayName = '';
    ownerName = '';
    spec = new ItemSpec();
}

export class ItemGroupNode {
    name = '';
    items: ItemNode[] = [];
}

export class ItemNode {
    id = '';
    displayName = '';
    ownerName= '';
}

export class TransferItemsRequest {
    ids: string[] = [];
    ownerId = '';
}

export class SaveItemRequest{
    id: string | undefined;
    spec = new ItemSpec();
}

export class SaveItemResponse {
    id = '';
}

export class AddOwnersRequestOwner {
    name = '';
    email = '';
}

export class OwnerSpec {
    id = '';
    name = '';
    email = '';
    mayLogin = false;
}
