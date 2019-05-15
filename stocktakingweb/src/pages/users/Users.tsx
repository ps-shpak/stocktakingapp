import * as React from "react";
import { Component, ReactNode, Fragment, RefObject, createRef } from "react";
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
    private readonly confirmRef: RefObject<ConfirmPopup> = createRef();
    private readonly deleteRef: RefObject<ConfirmPopup> = createRef();

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
                            onDeleteItem={this.onDelete}
                            onEditItem={this.store.onEdit}
                            emptyListMessage={"В списке нет ни одного пользователя"}
                        />
                    </UserLayout>
                </Wrapper>
                <AddUserForm
                    isVisible={this.store.isCreateUserPopupVisible}
                    onOpen={this.store.onAddUser}
                    onClose={this.onHideAddUserForm}
                    addField={this.store.addField}
                    onChange={this.store.onChange}
                    onSubmit={this.store.onSubmit}
                    isFormValid={!this.store.isFormValid()}
                    activeUser={this.store.activeUser}
                    buttonText={this.store.buttonText}
                />
                <ConfirmPopup
                    title={"Вы действительно хотите отменить создание пользователя"}
                    onSubmit={this.onConfirmCancelCreationUser}
                    onClose={() => this.hidePopup(this.confirmRef)}
                    ref={this.confirmRef}
                />
                <ConfirmPopup
                    title={"Вы дейтсвительно хотите удалить пользователя?"}
                    onSubmit={this.onConfirmDelete}
                    onClose={() => this.hidePopup(this.deleteRef)}
                    ref={this.deleteRef}
                />
                <InfoPopup
                    isVisible={this.store.isInfoPopupVisible}
                    title={"Пользователь удачно создан"}
                    onClose={this.store.onCloseInfoPopup}
                />
            </Fragment>
        );
    }

    private onHideAddUserForm(): void {
        if (!this.confirmRef.current) {
            return;
        }
        if (this.store.isDataChanged) {
            this.confirmRef.current.setVisibility(true);
            return;
        }
        this.store.onShowCreateUserPopup(false);
    }

    private onDelete(id: string): void {
        if (!this.deleteRef.current) {
            return;
        }
        this.store.onDelete(id);
        this.deleteRef.current.setVisibility(true);
    }

   private hidePopup(ref: RefObject<ConfirmPopup>): void {
       if (!ref.current) {
           return;
       }
       ref.current.setVisibility(false);
   }

   private onConfirmDelete(): void {
        this.store.onSubmitDeleteUser();
        this.hidePopup(this.deleteRef);
   }

   private onConfirmCancelCreationUser(): void {
        this.store.onCancelCreateUser();
        this.hidePopup(this.confirmRef);
   }
}
