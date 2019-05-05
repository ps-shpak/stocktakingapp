import * as React from "react";
import { Component, ReactNode } from "react";
import { autobind } from "core-decorators";
import { WrapperWithSidebar } from "../../containers/wrapper-with-sidebar";
import { observer } from "mobx-react";
import { List } from "../../components/list";
import { UsersStore } from "./UsersStore";

@observer
@autobind
export class Users extends Component {
    private readonly store = new UsersStore();

    render(): ReactNode {
        return (
            <WrapperWithSidebar title={"Пользователи"}>
                <List
                    list={this.store.userList}
                    onDeleteItem={this.store.onDelete}
                    onEditItem={this.store.onEdit}
                />
            </WrapperWithSidebar>
        );
    }
}
