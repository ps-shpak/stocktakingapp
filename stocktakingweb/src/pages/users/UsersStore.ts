import { autobind } from "core-decorators";
import { observable } from "mobx";
import { FormStore } from "../../app/stores";
import { IGetUserData } from "../../services";
import { get } from "lodash";
import * as uuid from "uuid";

@autobind
export class UsersStore extends FormStore {
    @observable userList: IGetUserData[] = [
        {
            id: uuid.v4(),
            name: "max",
            email: "max@mail.com"
        }
    ];
    @observable activeUser: IGetUserData = {
        id: "",
        name: "",
        email: ""
    };
    @observable isCreateUserPopupVisible = false;
    @observable isConfirmCancelAddUser = false;
    @observable isInfoPopupVisible = false;
    @observable isCreating = false;
    @observable buttonText = "";

    onEdit(id: string): void {
        this.transport.getUser(id).then((response) => {
            this.activeUser = response.data;
            this.isCreating = false;
            this.isCreateUserPopupVisible = true;
            this.buttonText = "Сохранить";
        });
    }

    onAddUser(): void {
        this.isCreating = true;
        this.onShowCreateUserPopup(true);
        this.buttonText = "Создать";
    }

    onHideAddUserForm(): void {
        if (this.isDataChanged) {
            this.isConfirmCancelAddUser = this.isDataChanged;
            return;
        }
        this.isCreateUserPopupVisible = false;
    }

    onDelete(id: string): void {
        this.transport.deleteUser(id).then(() => {
            this.getUsers();
        });
    }

    onShowCreateUserPopup(value: boolean): void {
        this.isCreateUserPopupVisible = value;
        if (!this.isCreateUserPopupVisible) {
            this.resetFields();
            this.isDataChanged = false;
        } else {
            if (this.isCreating) {
                this.clearActiveUser();
            }
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
                    this.isDataChanged  = false;
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

    clearActiveUser(): void {
        this.activeUser = {
            id: "",
            name: "",
            email: ""
        };
    }
}
