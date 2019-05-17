import * as React from "react";
import { Component, ReactNode } from "react";
import { autobind } from "core-decorators";
import { Wrapper } from "../../containers/wrapper";
import { PropertyStore } from "./PropertyStore";
import { UserLayout } from "../../containers/user-layout";
import { observer } from "mobx-react";
import { AddProductForm } from "../../components/add-product-form/AddProductForm";

@observer
@autobind
export class Property extends Component {
    private readonly store = new PropertyStore();

    componentDidMount(): void {
        this.store.getUsers();
    }

    render(): ReactNode {
        return (
            <>
                <Wrapper title={"Имущество"}>
                    <UserLayout onAddUser={this.store.onOpenForm}>
                        123
                    </UserLayout>
                </Wrapper>
                <AddProductForm
                    isVisible={this.store.isFormVisible}
                    onOpen={this.store.onOpenForm}
                    addField={this.store.addField}
                    onChange={this.store.onChange}
                    onClose={this.store.onCloseForm}
                    userList={this.store.userList}
                    isFormValid={!this.store.isFormValid()}
                    buttonTitle={"Создать"}
                    onSelectUser={this.store.onSelectUser}
                    onSubmit={this.store.onSubmit}
                />
            </>
        );
    }
}
