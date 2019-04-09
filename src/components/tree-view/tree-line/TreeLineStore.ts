import { autobind } from "core-decorators";
import { observable } from "mobx";

@autobind
export class TreeLineStore {
    @observable isOpened = false;

    onSwitchVisibilityChildren(): void {
        this.isOpened = !this.isOpened;
    }
}
