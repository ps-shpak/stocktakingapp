import * as React from "react";
import { Component, ReactNode, Fragment } from "react";
import { autobind } from "core-decorators";
import { WrapperWithSidebar } from "../../containers/wrapper-with-sidebar";
import { observer } from "mobx-react";
import { List } from "../../components/list";
import { UsersStore } from "./UsersStore";
import { UserLayout } from "../../containers/user-layout";
import { AddUserForm } from "../../components/add-user-form";
import { ConfirmPopup } from "../../components/confirm-popup/ConfirmPopup";

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
                <AddUserForm
                    isVisible={this.store.isCreateUserPopupVisible}
                    onOpen={this.showCreateUserPopup}
                    onClose={this.hideCreateUserPopup}
                    addField={this.store.addField}
                    onChange={this.store.onChange}
                    onSubmit={this.store.onSubmit}
                    isFormValid={!this.store.isFormValid()}
                />
                <ConfirmPopup
                    isVisible={this.store.isConfirmCancelAddUser}
                    title={"Вы действительно хотите отменить создание пользователя?"}
                    description={"Введенные вами данные не будут сохранены"}
                    onSubmit={this.store.onSubmitCancelCreateUser}
                    onClose={this.store.onCancelCreateUser}
                />
            </Fragment>
        );
    }

    private showCreateUserPopup(): void {
        this.store.onShowCreateUserPopup(true);
    }

    private hideCreateUserPopup(): void {
        if (this.store.isDataChanged) {
            this.store.isConfirmCancelAddUser = this.store.isDataChanged;
            return;
        }
        this.store.onShowCreateUserPopup(false);
    }
}
