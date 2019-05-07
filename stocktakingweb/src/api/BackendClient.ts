import {
    LoadItemResponse,
    ItemSpec,
    ItemKind,
    ItemGroupingMethod,
    ItemGroupNode,
    ItemNode,
    TransferItemsRequest,
    SaveItemRequest,
    SaveItemResponse,
    AddOwnersRequestOwner,
    OwnerSpec,
} from './models'

export class BackendClient {
    private static _instance: BackendClient = new BackendClient();

    private constructor() {
        if (BackendClient._instance){
            throw new Error("instantiation failed: use BackendClient.getInstance() instead of new BackendClient().");
        }
    }

    public static getInstance(): BackendClient {
        return BackendClient._instance
    }

    public async listItems(kind: ItemKind, groupingMethod: ItemGroupingMethod): Promise<ItemGroupNode[]> {
        const url = new URL('/stocktaking/items');
        url.searchParams.set('kind', kind);
        url.searchParams.set('grouping_method', groupingMethod);

        const response = await fetch(url.href);
        const groups: ItemGroupNode[] = [];
        const responseJSON = await response.json();
        for (const groupObj of responseJSON['results']) {
            const group = new ItemGroupNode();
            group.name = groupObj['name'];
            group.items = [];
            for (const itemObj of groupObj['items']) {
                const item = new ItemNode();
                item.displayName = itemObj['display_name'];
                item.ownerName = itemObj['owner_name'];
                item.id = itemObj['id'];
                group.items.push(item);
            }
            groups.push(group);
        }

        return groups;
    }

    public async transferItems(request: TransferItemsRequest): Promise<void> {
        await fetch('/stocktaking/items/owner', {
            method: "PATCH",
            body: JSON.stringify({
                ids: request.ids,
                owner_id: request.ownerId,
            })
        });
    }

    public async disposeItems(ids: string[]): Promise<void> {
        const url = new URL('/stocktaking/items');
        for (const id of ids) {
            url.searchParams.append("ids", id);
        }
        await fetch(url.href, {
            method: "DELETE",
        });
    }

    public async saveItem(request: SaveItemRequest): Promise<SaveItemResponse> {
        const response = await fetch('/stocktaking/item', {
            method: "PUT",
            body: JSON.stringify({
                id: request.id,
                spec: this.serializeSpec(request.spec),
            })
        });

        const result = new SaveItemResponse();
        const responseJSON = await response.json();
        result.id = responseJSON['id'];
        return result;
    }

    public async loadItem(id: string): Promise<LoadItemResponse> {
        const url = new URL('/stocktaking/item');
        url.searchParams.set('id', id);

        const response = await fetch(url.href);
        const responseJSON = await response.json();
        const result = new LoadItemResponse();
        result.displayName = responseJSON['display_name'];
        result.ownerName = responseJSON['owner_name'];
        result.spec = this.parseItemSpec(responseJSON['spec']);

        return result;
    }

    public async addOwners(owners: AddOwnersRequestOwner[]): Promise<string[]> {
        const requestItems: any[] = [];
        for (let owner of owners) {
            requestItems.push({
                name: owner.name,
                email: owner.email,
            })
        }
        const response = await fetch('/stocktaking/owners', {
            method: "POST",
            body: JSON.stringify({
                owners: requestItems,
            })
        });

        const result: string[] = [];
        const responseJSON = await response.json();
        for (let owner of responseJSON['owners']) {
            result.push(owner['id']);
        }
        return result;
    }

    public async saveOwner(request: OwnerSpec): Promise<void> {
        await fetch('/stocktaking/owner', {
            method: "PUT",
            body: JSON.stringify({
                id: request.id,
                name: request.name,
                email: request.email,
                may_login: request.mayLogin,
            })
        });
    }

    public async listOwners(): Promise<OwnerSpec[]> {
        const response = await fetch('/stocktaking/owners');
        const owners: OwnerSpec[] = [];
        const responseJSON = await response.json();
        console.log('listOwners responseJSON:', responseJSON);
        for (const obj of responseJSON['results']) {
            const owner = new OwnerSpec();
            owner.id = obj['user_id'];
            owner.name = obj['name'];
            owner.email = obj['email'];
            owner.mayLogin = obj['may_login'];
            owners.push(owner);
        }
        console.log('listOwners owners:', JSON.stringify(owners));

        return owners;
    }

    public async authorize(email: string): Promise<string> {
        const url = new URL('/auth/token');
        url.searchParams.set('email', email);
        const response = await fetch(url.href);
        const responseJSON = await response.json();
        return responseJSON['id'];
    }

    private serializeSpec(spec: ItemSpec): object {
        return {
            kind: spec.kind,
            category: spec.category,
            place: spec.place,
            owner_id: spec.ownerId,
            price: spec.price,
            description: spec.description,
        }
    }

    private parseItemSpec(obj: object): ItemSpec {
        const spec = new ItemSpec();
        spec.kind = obj['kind'];
        spec.category = obj['category'];
        spec.place = obj['place'];
        spec.ownerId = obj['owner_id'];
        spec.price = obj['price'];
        spec.description = obj['description'];
        return spec;
    }
}
