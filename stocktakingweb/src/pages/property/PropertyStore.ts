import { autobind } from "core-decorators";
import { FormStore } from "../../app/stores";
import { observable } from "mobx";
import { IGetUserData } from "../../services";
import { get } from "lodash";

@autobind
export class PropertyStore extends FormStore {
    @observable userList: IGetUserData[] = [];
    @observable activeUser: IGetUserData = {
        id: "",
        email: "",
        name: ""
    };

    getUsers(): void {
        this.transport.getUserList().then((response) => {
            this.userList = get(response.data, "results");
        });
    }

    onSelectUser(user: IGetUserData): void {
        this.activeUser = user;
    }

    onSubmit(): void {
        if (this.isFormValid() && this.activeUser.name !== "") {
            console.log(this.getFieldValues(), this.activeUser.name);
        }
    }

    onCloseForm(): void {
        super.onCloseForm();
        this.clearUser();
    }

    clearUser(): void {
        this.activeUser = {
            id: "",
            email: "",
            name: ""
        };
    }
}
