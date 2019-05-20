import { autobind } from "core-decorators";
import { FormStore } from "../../app/stores";
import { observable } from "mobx";
import { IGetUserData } from "../../services";

@autobind
export class AutoCompleteStore extends FormStore {
    @observable list: IGetUserData[] = [];
    @observable value = "";
}
