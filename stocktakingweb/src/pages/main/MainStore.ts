import { autobind } from "core-decorators";
import { observable } from "mobx";
import { IMenuItem } from "../../containers/menu";
import { ITreeItem } from "../../components/tree";
import { BackendClient, ItemGroupingMethod, ItemGroupNode } from "../../api";
import { toJS } from "mobx";

@autobind
export class MainStore {
    @observable menuData: IMenuItem[] = [
        {
            title: "Имущество",
            isActive: true,
            options: [
                {
                    title: "по категориям",
                    isActive: false
                },
                {
                    title: "по сотрудникам",
                    isActive: false
                }
            ]
        },
        {
            title: "Лицензии",
            isActive: true,
            options: [
                {
                    title: "по категориям",
                    isActive: false,
                },
                {
                    title: "по сотрудникам",
                    isActive: false
                }
            ]
        }
    ];
    @observable treeData: ITreeItem[] = [];
    @observable isTreeVisible = false;

    getMenuData(): IMenuItem[] {
        return toJS(this.menuData);
    }

    getTreeData(): ITreeItem[] {
        return toJS(this.treeData);
    }

    onOpenOptions(index: number): void {
        this.menuData[index].isActive = !this.menuData[index].isActive;
    }

    onChangeActiveMenuItem(rowIndex: number, subRowIndex: number): void {
        this.isTreeVisible = true;
        if (!this.menuData[rowIndex] || !this.menuData[rowIndex].options) {
            return;
        }
        this.menuData.map((item: IMenuItem, index: number) => {
            if (!item.options) {
                return;
            }
            item.options.map((subItem: IMenuItem, subIndex: number) => {
                subItem.isActive = false;
                if (!subItem.tree) {
                    return;
                }
                if (subRowIndex === subIndex) {
                    this.treeData = subItem.tree;
                }
            });
            if (rowIndex === index) {
                item.options[subRowIndex].isActive = !item.options[subRowIndex].isActive;
            }
        });
    }

    onCloseTree(): void {
        this.isTreeVisible = false;
        this.menuData.map((menuItem: IMenuItem) => {
           if (!menuItem.options) {
               return;
           }
           menuItem.options.map((submenuItem: IMenuItem) => {
              submenuItem.isActive = false;
           });
        });
    }

    // TODO: translate results into ITreeItem
    async listItems(groupingMethod: ItemGroupingMethod = ItemGroupingMethod.ByCategory): Promise<ItemGroupNode[]> {
        return BackendClient.getInstance().listItems(groupingMethod);
    }
}
