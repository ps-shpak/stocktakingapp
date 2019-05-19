import { autobind } from "core-decorators";
import { observable } from "mobx";
import { IMenuItem } from "../../containers/menu";
import { BackendClient, ItemKind, ItemGroupingMethod, ItemGroupNode } from "../../api";
import { DashboardStore } from "../../containers/dashboard/DashboardStore";
import { toJS } from "mobx";

enum MenuId {
    EQUIPMENT_BY_CATEGORY = "equipment_by_category",
    EQUIPMENT_BY_OWNER = "equipment_by_owner",
    LICENSES_BY_CATEGORY = "licenses_by_category",
    LICENSES_BY_OWNER = "licenses_by_owner",
    USERS = "users",
}

@autobind
export class PropertyStore {
    readonly dashboardStore = new DashboardStore();

    @observable menuData: IMenuItem[] = [
        {
            id: MenuId.EQUIPMENT_BY_CATEGORY,
            title: "Имущество",
            isActive: true,
            options: [
                {
                    id: MenuId.EQUIPMENT_BY_CATEGORY,
                    title: "по категориям",
                    isActive: false
                },
                {
                    id: MenuId.EQUIPMENT_BY_OWNER,
                    title: "по сотрудникам",
                    isActive: false
                }
            ]
        },
        {
            id: MenuId.LICENSES_BY_CATEGORY,
            title: "Лицензии",
            isActive: true,
            options: [
                {
                    id: MenuId.LICENSES_BY_OWNER,
                    title: "по категориям",
                    isActive: false,
                },
                {
                    id: MenuId.LICENSES_BY_OWNER,
                    title: "по сотрудникам",
                    isActive: false
                }
            ]
        }
    ];

    getMenuData(): IMenuItem[] {
        return toJS(this.menuData);
    }

    onOpenOptions(index: number): void {
        this.menuData[index].isActive = !this.menuData[index].isActive;
    }

    onChangeActiveMenuItem(rowIndex: number, subRowIndex: number): void {
        this.dashboardStore.isTreeVisible = true;
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
                    this.dashboardStore.treeData = subItem.tree;
                }
            });
            if (rowIndex === index) {
                item.options[subRowIndex].isActive = !item.options[subRowIndex].isActive;
            }
        });
    }

    onCloseTree(): void {
        this.dashboardStore.isTreeVisible = false;
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
    async listItems(kind: ItemKind, groupingMethod: ItemGroupingMethod): Promise<ItemGroupNode[]> {
        return BackendClient.getInstance().listItems(kind, groupingMethod);
    }
}
