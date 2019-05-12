import { autobind } from "core-decorators";
import { observable } from "mobx";
import { IMenuItem } from "../menu";
import { EPaths } from "../../config";
import { AppContext } from "../../context";

@autobind
export class SidebarStore {
    @observable isTreeVisible = false;
    @observable menuData: IMenuItem[] = [
        {
            title: "Имущество",
            isActive: false,
            onClick: () => SidebarStore.goToPage(EPaths.PROPERTY),
            path: EPaths.PROPERTY,
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
            isActive: false,
            onClick: () => SidebarStore.goToPage(EPaths.LICENSE),
            path: EPaths.LICENSE,
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
        },
        {
            title: "Пользователи",
            isActive: false,
            onClick: () => SidebarStore.goToPage(EPaths.USERS),
            path: EPaths.USERS
        }
    ];

    private static goToPage(path: string): void {
        AppContext.getHistory().push(path);
    }
}
