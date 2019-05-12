import { autobind } from "core-decorators";
import { observable } from "mobx";
import { FormStore } from "../../app/stores";
import { IGetUserData } from "../../services";
import { get } from "lodash";

@autobind
export class UsersStore extends FormStore {
    @observable userList: IGetUserData[] = [];
    @observable isCreateUserPopupVisible = false;
    @observable isConfirmCancelAddUser = false;
    @observable isInfoPopupVisible = false;

    onEdit(index: number): void {
        console.log("edit", index);
    }

    onDelete(index: number): void {
        console.log("delete", index);
    }

    onShowCreateUserPopup(value: boolean): void {
        this.isCreateUserPopupVisible = value;
        if (!this.isCreateUserPopupVisible) {
            this.resetFields();
            this.isDataChanged = false;
        }
    }

    onSubmit(): void {
        if (this.isFormValid()) {
            const formData = this.getFieldValues();
            const name = formData[0];
            const email = formData[1];
            this.transport.createUser({
                owners: [{name, email}]
            })
                .then((response) => {
                    this.isCreateUserPopupVisible = false;
                    this.isInfoPopupVisible = true;
                    this.getUsers();
            })
                .catch((err) => console.log(err));
        }

    }

    onSubmitCancelCreateUser(): void {
        this.isConfirmCancelAddUser = false;
        this.onShowCreateUserPopup(false);
        this.isDataChanged = false;
    }

    onCancelCreateUser(): void {
        this.isConfirmCancelAddUser = false;
        this.onShowCreateUserPopup(true);
    }

    onCloseInfoPopup(): void {
        this.isInfoPopupVisible = false;
    }

    getUsers(): void {
        this.transport.getUserList().then((response) => {
            this.userList = get(response.data, "results");
        });
    }
}
