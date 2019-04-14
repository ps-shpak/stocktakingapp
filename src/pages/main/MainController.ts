import { autobind } from "core-decorators";
import { MainStore } from "./MainStore";
import { IMenuItem } from "../../containers/menu";
import { toJS } from "mobx";
import { ITreeItem } from "../../components/tree";
import { IPosition } from "../../interfaces";

@autobind
export class MainController {
    private readonly store: MainStore;

    constructor(store: MainStore) {
        this.store = store;
    }

    getMenuData(): IMenuItem[] {
        return toJS(this.store.menuData);
    }

    getTreeData(): ITreeItem[] {
        return toJS(this.store.treeData);
    }

    getPosition(): IPosition {
        return toJS(this.store.position);
    }

    onOpenOptions(index: number): void {
        this.store.menuData[index].isActive = !this.store.menuData[index].isActive;
    }

    onChangeActiveMenuItem(rowIndex: number, subRowIndex: number): void {
        this.store.isTreeVisible = true;
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

    onChangePosition(position: IPosition): void {
        this.store.position = position;
    }
}
