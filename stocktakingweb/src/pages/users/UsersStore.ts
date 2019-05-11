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

    onEdit(index: number): void {
        console.log("edit", index);
    }

    onDelete(index: number): void {
        console.log("delete", index);
    }

    onShowCreateUserPopup(value: boolean): void {
        this.isCreateUserPopupVisible = value;
    }

    onSubmit(): void {
        console.log(this.getFieldValues());
    }

    onSubmitCancelCreateUser(): void {
        this.isConfirmCancelAddUser = false;
        this.onShowCreateUserPopup(false);
        this.isDataChanged = false;
    }

    onCancelCreateUser(): void {
        this.isConfirmCancelAddUser = false;
        this.onShowCreateUserPopup(true);
        console.log(this.isCreateUserPopupVisible);
    }
}
