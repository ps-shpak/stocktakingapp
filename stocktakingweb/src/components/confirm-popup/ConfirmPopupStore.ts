import { autobind } from "core-decorators";
import { observable } from "mobx";

@autobind
export class ConfirmPopupStore {
    @observable isVisible = false;

    hide(): void {
        this.isVisible = false;
    }
}
