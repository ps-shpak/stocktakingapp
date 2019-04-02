import { autobind } from "core-decorators";
import { observable } from "mobx";
import { IMenuItem } from "../../pages/main";

@autobind
export class MenuStore {
    @observable menuList: IMenuItem[] = [
        {
            title: "Имущество",
            isActive: true,
            options: [
                {
                    title: "по сотрудникам",
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
                    title: "по сотрудникам",
                    isActive: false
                },
                {
                    title: "по сотрудникам",
                    isActive: false
                }
            ]
        }
    ];

    openOptions(index: number): void {
        this.menuList[index].isActive = !this.menuList[index].isActive;
    }

    changeActiveMenuItem(rowIndex: number, subRowIndex: number): void {
        if (!this.menuList[rowIndex] || !this.menuList[rowIndex].options) {
            return;
        }
        this.menuList.map((item: IMenuItem) => {
           if (!item.options) {
               return;
           }
           item.options.map((subItem: IMenuItem) => {
               subItem.isActive = false;
           });
        });
        this.menuList[rowIndex].options![subRowIndex].isActive = !this.menuList[rowIndex].options![subRowIndex].isActive;

    }
}
