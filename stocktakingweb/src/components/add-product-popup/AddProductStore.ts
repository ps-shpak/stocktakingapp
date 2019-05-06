import { autobind } from "core-decorators";
import { observable, autorun } from "mobx";
import { Owner } from "./Owner";
import { BackendClient, SaveItemRequest, ItemKind } from "../../api";
import { AddProductPopupState } from "./view/AddProductPopupState";

@autobind
export class AddProductStore {
    @observable isPopupVisible = false;
    @observable availableOwners: Owner[] = [];
    @observable errorMessage = "";
    private fetchOwnersPromise: Promise<void> | undefined = undefined;

    constructor() {
        autorun(() => {
            if (this.isPopupVisible) {
                this.fetchAvailableOwners();
            }
        });
    }

    getAvailableOwners(): Owner[] {
        return this.availableOwners;
    }

    async fetchAvailableOwners(): Promise<void> {
        // Run fetch owners only once.
        if (this.fetchOwnersPromise) {
            return this.fetchOwnersPromise;
        }
        this.fetchOwnersPromise = this.fetchAvailableOwnersImpl();
        return this.fetchOwnersPromise.catch((err) => {
            // Drop promise to retry next time
            this.fetchOwnersPromise = undefined;
            throw err;
        });
    }

    cancelAddProduct(): void {
        this.errorMessage = "";
        this.isPopupVisible = false;
    }

    submitAddProduct(state: AddProductPopupState): void {
        this.errorMessage = "";
        this.addProduct(state).then(
            () => {
                this.isPopupVisible = false;
            },
            (err) => {
                this.errorMessage = err.message;
            }
        );
    }

    private async fetchAvailableOwnersImpl(): Promise<void> {
        const owners = await BackendClient.getInstance().listOwners();
        for (const owner of owners) {
            this.availableOwners.push(new Owner(owner.id, owner.name));
        }
        console.log("fetchAvailableOwnersImpl owners:", this.availableOwners);
    }

    private async addProduct(state: AddProductPopupState): Promise<void> {
        const req = new SaveItemRequest();
        // TODO: select item kind dynamically using parent store
        req.spec.kind = ItemKind.Equipment;
        req.spec.category = state.category;
        req.spec.ownerId = state.ownerId;
        req.spec.price = Number.parseFloat(state.price);
        req.spec.place = state.place;
        req.spec.description = state.description;
        await BackendClient.getInstance().saveItem(req);
    }
}
