import { autobind } from "core-decorators";
import { observable } from "mobx";
import { ITreeItem } from "../../components/tree";

@autobind
export class DashboardStore {
    @observable treeData: ITreeItem[] = [];
    @observable isPopupVisible = false;
}
