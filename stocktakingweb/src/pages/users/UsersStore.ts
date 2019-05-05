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
    ];

    onEdit(index: number): void {
        console.log(index);
    }

    onDelete(index: number): void {
        console.log(index);
    }
}
