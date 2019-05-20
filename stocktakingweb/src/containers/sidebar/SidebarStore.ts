import { autobind } from "core-decorators";
import { action, observable } from "mobx";
import { IMenuItem } from "../menu";
import { EPaths, EParams, EItemKind, EGroupingMethod } from "../../config";
import { AppContext } from "../../context";
import { Group, Category, Person, ListAlt, EventSeat } from "@material-ui/icons";
import { encodeUrlWithQuery } from "../../utils";

enum MenuId {
    EQUIPMENT_BY_CATEGORY = "equipment_by_category",
    EQUIPMENT_BY_OWNER = "equipment_by_owner",
    LICENSES_BY_CATEGORY = "licenses_by_category",
    LICENSES_BY_OWNER = "licenses_by_owner",
    USERS = "users",
}

@autobind
export class SidebarStore {
    @observable isTreeVisible = true;

    @observable menuData: IMenuItem[] = [
        {
            id: MenuId.EQUIPMENT_BY_CATEGORY,
            title: "Имущество",
            isActive: false,
            onClick: () => this.goToPropertyPage(EItemKind.EQUIPMENT, EGroupingMethod.BY_CATEGORY),
            icon: EventSeat,
            options: [
                {
                    id: MenuId.EQUIPMENT_BY_CATEGORY,
                    onClick: () => this.goToPropertyPage(EItemKind.EQUIPMENT, EGroupingMethod.BY_CATEGORY),
                    title: "по категориям",
                    isActive: false,
                    icon: Category
                },
                {
                    id: MenuId.EQUIPMENT_BY_OWNER,
                    onClick: () => this.goToPropertyPage(EItemKind.EQUIPMENT, EGroupingMethod.BY_CATEGORY),
                    title: "по сотрудникам",
                    isActive: false,
                    icon: Person
                }
            ]
        },
        {
            id: MenuId.LICENSES_BY_CATEGORY,
            title: "Лицензии",
            isActive: false,
            onClick: () => this.goToPropertyPage(EItemKind.LICENSE, EGroupingMethod.BY_CATEGORY),
            icon: ListAlt,
            options: [
                {
                    id: MenuId.LICENSES_BY_OWNER,
                    onClick: () => this.goToPropertyPage(EItemKind.LICENSE, EGroupingMethod.BY_CATEGORY),
                    title: "по категориям",
                    isActive: false,
                    icon: Category
                },
                {
                    id: MenuId.LICENSES_BY_OWNER,
                    onClick: () => this.goToPropertyPage(EItemKind.LICENSE, EGroupingMethod.BY_OWNER),
                    title: "по сотрудникам",
                    isActive: false,
                    icon: Person
                }
            ]
        },
        {
            id: MenuId.USERS,
            title: "Пользователи",
            isActive: false,
            onClick: () => this.goToUsersPage(),
            icon: Group
        }
    ];

    @action onOpenSubMenu(index: number): void {
        this.menuData.map((item: IMenuItem) => {
            item.isActive = false;
        });
        this.menuData[index].isActive = !this.menuData[index].isActive;
    }

    @action onMount(): void {
        const menuId = this.getActiveMenuId();
        const screensWithTree = [
            MenuId.EQUIPMENT_BY_CATEGORY,
            MenuId.EQUIPMENT_BY_OWNER,
            MenuId.LICENSES_BY_CATEGORY,
            MenuId.LICENSES_BY_OWNER
        ];
        this.isTreeVisible = (screensWithTree.indexOf(menuId) !== -1);
        this.menuData.map((item: IMenuItem) => {
            item.isActive = (menuId === item.id);
        });
    }

    private getActiveMenuId(): MenuId {
        // We use window.location.href to find active menu,
        //  we don't use React Router location since it's too hard to pass it through components hierarchy.
        const url = window.location.href;
        if (url.indexOf(EPaths.USERS) !== -1) {
            return MenuId.USERS;
        }
        const params = new URLSearchParams(window.location.search);
        const kind = params.get(EParams.ITEM_KIND) as EItemKind;
        const groupingMethod = params.get(EParams.ITEM_GROUPING) as EGroupingMethod;
        if (kind === EItemKind.EQUIPMENT) {
            if (groupingMethod === EGroupingMethod.BY_CATEGORY) {
                return MenuId.EQUIPMENT_BY_CATEGORY;
            }
            return MenuId.EQUIPMENT_BY_OWNER;
        }
        if (groupingMethod === EGroupingMethod.BY_CATEGORY) {
            return MenuId.LICENSES_BY_CATEGORY;
        }
        return MenuId.LICENSES_BY_OWNER;
    }

    private goToPropertyPage(kind: EItemKind, grouping: EGroupingMethod) {
        const query = {};
        query[EParams.ITEM_KIND] = [kind];
        query[EParams.ITEM_GROUPING] = [grouping];
        AppContext.getHistory().push(encodeUrlWithQuery(EPaths.PROPERTY, query));
    }

    private goToUsersPage() {
        AppContext.getHistory().push(EPaths.USERS);
    }
}
