import { autobind } from "core-decorators";
import { action, observable } from "mobx";
import { IMenuItem } from "../menu";
import { EPaths } from "../../config";
import { AppContext } from "../../context";
import { findIndex } from "lodash";
import { Group, Category, Person, ListAlt, EventSeat } from "@material-ui/icons";

@autobind
export class SidebarStore {
    @observable isTreeVisible = false;
    @observable menuData: IMenuItem[] = [
        {
            title: "Имущество",
            isActive: false,
            onClick: () => SidebarStore.goToPage(EPaths.PROPERTY),
            path: EPaths.PROPERTY,
            icon: EventSeat,
            options: [
                {
                    title: "по категориям",
                    isActive: false,
                    icon: Category
                },
                {
                    title: "по сотрудникам",
                    isActive: false,
                    icon: Person
                }
            ]
        },
        {
            title: "Лицензии",
            isActive: false,
            onClick: () => SidebarStore.goToPage(EPaths.LICENSE),
            path: EPaths.LICENSE,
            icon: ListAlt,
            options: [
                {
                    title: "по категориям",
                    isActive: false,
                    icon: Category
                },
                {
                    title: "по сотрудникам",
                    isActive: false,
                    icon: Person
                }
            ]
        },
        {
            title: "Пользователи",
            isActive: false,
            onClick: () => SidebarStore.goToPage(EPaths.USERS),
            path: EPaths.USERS,
            icon: Group
        }
    ];

    private static goToPage(path: string): void {
        AppContext.getHistory().push(path);
    }

    @action onOpenSubMenu(index: number): void {
        this.menuData.map((item: IMenuItem) => {
            item.isActive = false;
        });
        this.menuData[index].isActive = !this.menuData[index].isActive;
    }

    @action onMount(): void {
        const url = window.location.href;
        const activeIndex = findIndex(this.menuData, (item) => url.indexOf(item.path ? item.path : "") >= 0);
        if (activeIndex < 0) {
            return;
        }
        this.menuData[activeIndex].isActive = true;
    }
}
