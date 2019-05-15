import * as React from "react";
import { Component, ReactNode, Fragment } from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { List } from "../../components/list";
import { UsersStore } from "./UsersStore";
import { UserLayout } from "../../containers/user-layout";
import { AddUserForm } from "../../components/add-user-form";
import { ConfirmPopup } from "../../components/confirm-popup/ConfirmPopup";
import { InfoPopup } from "../../components/info-popup";
import { Wrapper } from "../../containers/wrapper";

@observer
@autobind
export class Users extends Component {
    private readonly store = new UsersStore();

    componentDidMount(): void {
        this.store.getUsers();
    }

    render(): ReactNode {
        return (
            <Fragment>
                <Wrapper title={"Пользователи"}>
                    <UserLayout onAddUser={this.store.onAddUser}>
                        <List
                            list={this.store.userList}
                            onDeleteItem={this.store.onDelete}
                            onEditItem={this.store.onEdit}
                            emptyListMessage={"В списке нет ни одного пользователя"}
                        />
                    </UserLayout>
                </Wrapper>
                <AddUserForm
                    isVisible={this.store.isCreateUserPopupVisible}
                    onOpen={this.store.onAddUser}
                    onClose={this.store.onHideAddUserForm}
                    addField={this.store.addField}
                    onChange={this.store.onChange}
                    onSubmit={this.store.onSubmit}
                    isFormValid={!this.store.isFormValid()}
                    activeUser={this.store.activeUser}
                    buttonText={this.store.buttonText}
                />
                <ConfirmPopup
                    isVisible={this.store.isConfirmCancelAddUser}
                    title={"Вы действительно хотите отменить создание пользователя?"}
                    description={"Введенные вами данные не будут сохранены"}
                    onSubmit={this.store.onSubmitCancelCreateUser}
                    onClose={this.store.onCancelCreateUser}
                />
                <InfoPopup
                    isVisible={this.store.isInfoPopupVisible}
                    title={"Пользователь удачно создан"}
                    onClose={this.store.onCloseInfoPopup}
                />
            </Fragment>
        );
    }
}
