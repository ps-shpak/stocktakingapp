import { autobind } from "core-decorators";
import { observable } from "mobx";
import { IMenuItem } from "../../containers/menu";
import { IPosition } from "../../interfaces";
import { ITreeItem } from "../../components/tree";
import { BackendClient, ListItemsRequest } from "../../api";

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

    async listItems() {
        const response = await BackendClient.getInstance().listItems(new ListItemsRequest());
        const results = [];
        for (const group of response.getResultsList()) {
            const itemsArr: any[] = [];
            for (const item of group.getItemsList()) {
                itemsArr.push({
                    id: item.getId(),
                    name: item.getDisplayName(),
                    owner: item.getOwnerName(),
                });
            }
            const groupObj: object = {
                name: group.getName(),
                items: itemsArr,
            };
            results.push(groupObj);
        }
        return results;
    }
}
