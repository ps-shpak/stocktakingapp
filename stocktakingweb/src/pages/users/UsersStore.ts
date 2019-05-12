import { autobind } from "core-decorators";
import { observable } from "mobx";
import { IListItem } from "../../components/list/IListItem";
import * as uuid from "uuid";
import { FormStore } from "../../app/stores";

@autobind
export class UsersStore extends FormStore {
    @observable userList: IListItem[] = [
        {
            id: uuid.v4(),
            title: "Ivanov Ivan",
            email: "ivan@email.ru"
        },
        {
            id: uuid.v4(),
            title: "Ivanov Petr",
            email: "petr@email.ru"
        },
        {
            id: uuid.v4(),
            title: "Ivanov Max",
            email: "max@email.ru"
        },
        {
            id: uuid.v4(),
            title: "Ivanov Andrey",
            email: "andrey@email.ru"
        },
    ];
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
            const surname = formData[1];
            const email = formData[2];
            this.transport.createUser({
                owners: [
                    {
                        name: `${name} ${surname}`,
                        email
                    }
                ]
            }).then((response) => {
                this.isCreateUserPopupVisible = false;
                this.isInfoPopupVisible = true;
                console.log(response);
            });
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
}
