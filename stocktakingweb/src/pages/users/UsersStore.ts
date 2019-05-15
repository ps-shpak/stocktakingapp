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
    @observable isCreating = false;
    @observable buttonText = "";

    onEdit(id: string): void {
        this.transport.getUser(id).then((response) => {
            this.activeUser = response.data;
            this.isCreating = false;
            this.onShowCreateUserPopup(true);
            this.buttonText = "Сохранить";
        });
    }

    onAddUser(): void {
        this.isCreating = true;
        this.onShowCreateUserPopup(true);
        this.buttonText = "Создать";
    }

    onDelete(id: string): void {
        this.activeUser.id = id;
    }

    confirmPopup(): void {
        if (this.isCreating) {
            this.onSubmitCancelCreateUser();
        } else {
            this.onSubmitDeleteUser();
        }
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
                .then(() => {
                    this.onShowCreateUserPopup(false);
                    this.isInfoPopupVisible = true;
                    this.isDataChanged  = false;
                    this.getUsers();
            })
                .catch((err) => console.log(err));
        }

    }

    onCancelCreateUser(): void {
        this.onShowCreateUserPopup(false);
    }

    onCloseInfoPopup(): void {
        this.isInfoPopupVisible = false;
    }

    getUsers(): void {
        this.transport.getUserList().then((response) => {
            this.userList = get(response.data, "results");
        });
    }

    onSubmitDeleteUser(): void {
        this.transport.deleteUser(this.activeUser.id).then(() => {
            this.getUsers();
        });
    }

    onSubmitCancelCreateUser(): void {
        this.isConfirmPopupVisible = false;
        this.onShowCreateUserPopup(false);
        this.isDataChanged = false;
    }

    private clearActiveUser(): void {
        this.activeUser = {
            id: "",
            name: "",
            email: ""
        };
    }
}
