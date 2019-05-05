import { autobind } from "core-decorators";
import { observable } from "mobx";
import { IListItem } from "../../components/list/IListItem";
import * as uuid from "uuid";

@autobind
export class UsersStore {
    @observable userList: IListItem[] = [
        {
            id: uuid.v4(),
            title: "Ivanov Ivan"
        },
        {
            id: uuid.v4(),
            title: "Ivanov Petr"
        },
        {
            id: uuid.v4(),
            title: "Ivanov Max"
        },
        {
            id: uuid.v4(),
            title: "Ivanov Andrey"
        },
    ];

    onEdit(index: number): void {
        console.log("edit", index);
    }

    onDelete(index: number): void {
        console.log("delete", index);
    }

    onAddUser(): void {
        console.log("add");
    }
}
