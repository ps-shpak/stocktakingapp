import { autobind } from "core-decorators";
import { Transport } from "../../services";
import { observable } from "mobx";

@autobind
export class Store {
    @observable isConfirmPopupVisible = false;
    @observable isInfoPopupVisible = false;
    @observable isFormVisible = false;
    private readonly _transport = new Transport();

    get transport(): Transport {
        return this._transport;
    }
}
