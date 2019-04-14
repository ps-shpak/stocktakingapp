import { autobind } from "core-decorators";
import { MainStore } from "./MainStore";
import { IMenuItem } from "../../containers/menu";
import { toJS } from "mobx";
import { ITreeItem } from "../../components/tree";
import { IPosition } from "../../interfaces";
import * as uuid from "uuid";
import { range } from "lodash";

@autobind
export class MainController {
    private readonly store: MainStore;

    constructor(store: MainStore) {
        this.store = store;
    }

    onMount(): void {
        this.generateDemoData();
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

    private getTreeDemoData(): ITreeItem[] {
        const tableId = uuid.v4();
        const chairId = uuid.v4();
        const tableChildren = [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4()];
        const chairChildren = [uuid.v4(), uuid.v4(), uuid.v4(), uuid.v4()];
        const tree: ITreeItem[] = [
            {
                id: tableId,
                isActive: false,
                title: "Стол",
                children: tableChildren
            },
            {
                id: chairId,
                isActive: false,
                title: "Стул",
                children: chairChildren
            },
        ];
        range(tableChildren.length).map((_, index: number) => {
            const table: ITreeItem = {
                id: tableChildren[index],
                isActive: false,
                title: `Стол #${index + 1}`,
                parent: tableId
            };
            const chair: ITreeItem = {
                id: chairChildren[index],
                isActive: false,
                title: `Стул #${index + 1}`,
                parent: chairId,
            };
            tree.push(table);
            tree.push(chair);
        });
        return tree;
    }

    private generateDemoData(): void {
        this.store.menuData.map((menuItem: IMenuItem) => {
           if (!menuItem.options) {
               return;
           }
           menuItem.options.map((subMenuItem: IMenuItem) => {
               subMenuItem.tree = this.getTreeDemoData();
           });
        });
    }
}
