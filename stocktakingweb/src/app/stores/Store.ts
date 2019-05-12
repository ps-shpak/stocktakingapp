import { autobind } from "core-decorators";
import { Transport } from "../../services";

@autobind
export class Store {
    private readonly _transport = new Transport();

    get transport(): Transport {
        return this._transport;
    }
}
