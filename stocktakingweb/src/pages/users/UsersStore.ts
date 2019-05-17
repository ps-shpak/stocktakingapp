import { autobind } from "core-decorators";
import { observable } from "mobx";
import { FormStore } from "../../app/stores";
import { IGetUserData } from "../../services";
import { get } from "lodash";

@autobind
export class UsersStore extends FormStore {
    @observable userList: IGetUserData[] = [];
    @observable activeUser: IGetUserData = {
        id: "",
        name: "",
        email: ""
    };
    @observable isCreateUserPopupVisible = false;
    @observable isCreating = false;
    @observable buttonText = "";
    @observable infoPopupText = "";

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
            this.isInfoPopupVisible = true;
            this.infoPopupText = "Пользователь успешно удален!";
            this.getUsers();
        });
    }

    onSubmitCancelCreateUser(): void {
        this.isConfirmPopupVisible = false;
        this.onShowCreateUserPopup(false);
        this.isDataChanged = false;
    }

    onSubmitForm(): void {
        if (this.isCreating) {
            this.onSubmit();
        } else {
            this.changeUser();
        }
    }

    private onSubmit(): void {
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
                    this.infoPopupText = "Пользователь успешно создан!";
                    this.isDataChanged  = false;
                    this.getUsers();
                })
                .catch((err) => console.log(err));
        }

    }

    private changeUser(): void {
        if (this.isFormValid()) {
            const formData = this.getFieldValues();
            this.activeUser.name = formData[0];
            this.activeUser.email = formData[1];
            this.transport.changeUser(this.activeUser).then(() => {
                this.onShowCreateUserPopup(false);
                this.isInfoPopupVisible = true;
                this.infoPopupText = "Данные успешно изменены!";
                this.isDataChanged  = false;
                this.getUsers();
            });
        }
    }

    private clearActiveUser(): void {
        this.activeUser = {
            id: "",
            name: "",
            email: ""
        };
    }
}
