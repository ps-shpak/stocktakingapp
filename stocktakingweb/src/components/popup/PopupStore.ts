import { autobind } from "core-decorators";
import { observable } from "mobx";

@autobind
export class PopupStore {
    @observable isVisible = false;

    hide(): void {
        this.isVisible = false;
    }
}
