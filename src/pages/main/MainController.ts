import { autobind } from "core-decorators";
import { MainStore } from "./MainStore";
import { IMenuItem } from "../../containers/menu";

@autobind
export class MainController {
    private readonly store: MainStore;

    constructor(store: MainStore) {
        this.store = store;
    }

    onOpenOptions(index: number): void {
        this.store.menuData[index].isActive = !this.store.menuData[index].isActive;
    }

    onChangeActiveMenuItem(rowIndex: number, subRowIndex: number): void {
        if (!this.store.menuData[rowIndex] || !this.store.menuData[rowIndex].options) {
            return;
        }
        this.store.menuData.map((item: IMenuItem) => {
            if (!item.options) {
                return;
            }
            item.options.map((subItem: IMenuItem) => {
                subItem.isActive = false;
            });
        });
        this.store.menuData[rowIndex].options![subRowIndex].isActive = !this.store.menuData[rowIndex].options![subRowIndex].isActive;

    }
}
