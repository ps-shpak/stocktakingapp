import { autobind } from "core-decorators";
import { observable } from "mobx";
import { Owner } from "./Owner";
import { BackendClient, SaveItemRequest, OwnerSpec } from "../../api";

// TODO: connect Store and View
@autobind
export class AddProductStore {
    @observable category = "";
    @observable ownerId = "";
    @observable price = 0;
    @observable place = "";
    @observable description = "";

    @observable availableOwners: Owner[] = [];

    async loadAvailableOwners(): Promise<void> {
        const owners = await BackendClient.getInstance().listOwners();
        this.availableOwners = owners.map((owner: OwnerSpec) => {
            return new Owner(owner.id, owner.name);
        });
    }

    async addProduct(): Promise<void> {
        const req = new SaveItemRequest();
        req.spec.category = this.category;
        req.spec.ownerId = this.ownerId;
        req.spec.price = this.price;
        req.spec.place = this.place;
        req.spec.description = this.description;
        await BackendClient.getInstance().saveItem(req);
    }
}
