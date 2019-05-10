import { autobind } from "core-decorators";
import { FormStore } from "../../app/stores";

@autobind
export class AddUserPopupStore extends FormStore {
    createUser(): void {
        console.log(this.getFieldValues());
    }
}
