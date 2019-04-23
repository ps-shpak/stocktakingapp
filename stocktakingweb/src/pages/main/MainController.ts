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

    onMount(): void {
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
        this.store.menuData.map((item: IMenuItem, index: number) => {
            if (!item.options) {
                return;
            }
            item.options.map((subItem: IMenuItem, subIndex: number) => {
                subItem.isActive = false;
                if (!subItem.tree) {
                    return;
                }
                if (subRowIndex === subIndex) {
                    this.store.treeData = subItem.tree;
                }
            });
            if (rowIndex === index) {
                item.options[subRowIndex].isActive = !item.options[subRowIndex].isActive;
            }
        });
    }

    onChangePosition(position: IPosition): void {
        this.store.position = position;
    }

    onCloseTree(): void {
        this.store.isTreeVisible = false;
        this.store.menuData.map((menuItem: IMenuItem) => {
           if (!menuItem.options) {
               return;
           }
           menuItem.options.map((submenuItem: IMenuItem) => {
              submenuItem.isActive = false;
           });
        });
    }
}
