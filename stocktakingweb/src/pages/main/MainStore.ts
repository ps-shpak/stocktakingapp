import { autobind } from "core-decorators";
import { observable } from "mobx";
import { IMenuItem } from "../../containers/menu";
import { IPosition } from "../../interfaces";
import { ITreeItem } from "../../components/tree";

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
    @observable position: IPosition = {
        left: 0,
        top: 0
    };
    @observable isTreeVisible = false;
}
