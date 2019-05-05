import * as React from "react";
import { Component, ReactNode } from "react";
import { autobind } from "core-decorators";
import { WrapperWithSidebar } from "../../containers/wrapper-with-sidebar";
import { observer } from "mobx-react";
import { List } from "../../components/list";
import { UsersStore } from "./UsersStore";
import { UserLayout } from "../../containers/user-layout";

@observer
@autobind
export class Users extends Component {
    private readonly store = new UsersStore();

    render(): ReactNode {
        return (
            <WrapperWithSidebar title={"Пользователи"}>
                <UserLayout onAddUser={this.store.onAddUser}>
                    <List
                        list={this.store.userList}
                        onDeleteItem={this.store.onDelete}
                        onEditItem={this.store.onEdit}
                        emptyListMessage={"В списке нет ни одного пользователя"}
                    />
                </UserLayout>
            </WrapperWithSidebar>
        );
    }
}
