import { autobind } from "core-decorators";
import { observable } from "mobx";
import { IListItem } from "../../components/list/IListItem";
import * as uuid from "uuid";

@autobind
export class UsersStore {
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

    onEdit(index: number): void {
        console.log("edit", index);
    }

    onDelete(index: number): void {
        console.log("delete", index);
    }

    onShowCreateUserPopup(value: boolean): void {
        this.isCreateUserPopupVisible = value;
    }
}
