import { autobind } from "core-decorators";
import { observable, toJS } from "mobx";
import { IMenuItem } from "../menu";
import { AppContext } from "../../context";
import { EPaths } from "../../config";

@autobind
export class WrapperWithSidebarStore {
    @observable menuData: IMenuItem[] = [
        {
            title: "Имущество",
            isActive: false,
            onClick: () => this.goToPage(EPaths.PROPERTY),
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
            onClick: () => this.goToPage(EPaths.LICENSE),
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
            onClick: () => this.goToPage(EPaths.USERS),
            path: EPaths.USERS
        }
    ];

    onMount(): void {
        const url = window.location.href;
        this.menuData.map((item: IMenuItem) => {
            if (!item.path) {
                return;
            }
            if (url.indexOf(item.path) >= 0) {
               item.isActive = true;
            }
        });
    }

    getMenuData(): IMenuItem[] {
        return toJS(this.menuData);
    }

    onOpenOptions(index: number): void {
        this.menuData.map((item: IMenuItem) => {
           item.isActive = false;
        });
        this.menuData[index].isActive = !this.menuData[index].isActive;
    }

    onChangeActiveMenuItem(rowIndex: number, subRowIndex: number): void {
        if (!this.menuData[rowIndex] || !this.menuData[rowIndex].options) {
            return;
        }
        this.menuData.map((item: IMenuItem, index: number) => {
            if (!item.options) {
                return;
            }
            item.options.map((subItem: IMenuItem) => {
                subItem.isActive = false;
                if (!subItem.tree) {
                    return;
                }
            });
            if (rowIndex === index) {
                item.options[subRowIndex].isActive = !item.options[subRowIndex].isActive;
            }
        });
    }

    private goToPage(path: string): void {
        AppContext.getHistory().push(path);
    }
}
