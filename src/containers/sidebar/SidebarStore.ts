import { autobind } from "core-decorators";
import { observable } from "mobx";

@autobind
export class SidebarStore {
    @observable isTreeVisible = false;
}
