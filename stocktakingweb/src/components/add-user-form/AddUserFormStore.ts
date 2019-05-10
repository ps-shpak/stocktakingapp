import { autobind } from "core-decorators";
import { FormStore } from "../../app/stores";

@autobind
export class AddUserFormStore extends FormStore {
    submit(): void {
        console.log(this.getFieldValues());
    }
}
