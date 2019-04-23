import { autobind } from "core-decorators";
import { MainStore } from "./MainStore";
import { IMenuItem } from "../../containers/menu";
import { toJS } from "mobx";
import { ITreeItem } from "../../components/tree";

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
