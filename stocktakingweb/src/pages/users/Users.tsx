import * as React from "react";
import { Component, ReactNode, Fragment } from "react";
import { autobind } from "core-decorators";
import { WrapperWithSidebar } from "../../containers/wrapper-with-sidebar";
import { observer } from "mobx-react";
import { List } from "../../components/list";
import { UsersStore } from "./UsersStore";
import { UserLayout } from "../../containers/user-layout";
import { AddUserPopup } from "../../components/add-user-popup";

@observer
@autobind
export class Users extends Component {
    private readonly store = new UsersStore();

    render(): ReactNode {
        return (
            <Fragment>
                <WrapperWithSidebar title={"Пользователи"}>
                    <UserLayout onAddUser={this.showCreateUserPopup}>
                        <List
                            list={this.store.userList}
                            onDeleteItem={this.store.onDelete}
                            onEditItem={this.store.onEdit}
                            emptyListMessage={"В списке нет ни одного пользователя"}
                        />
                    </UserLayout>
                </WrapperWithSidebar>
                <AddUserPopup
                    isVisible={this.store.isCreateUserPopupVisible}
                    onClose={this.hideCreateUserPopup}
                />
            </Fragment>
        );
    }

    private showCreateUserPopup(): void {
        this.store.onShowCreateUserPopup(true);
    }

    private hideCreateUserPopup(): void {
        this.store.onShowCreateUserPopup(false);
    }
}
