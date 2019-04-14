import { autobind } from "core-decorators";
import { observable } from "mobx";
import { IMenuItem } from "../../containers/menu";

@autobind
export class MainStore {
    @observable menuData: IMenuItem[] = [];
}
