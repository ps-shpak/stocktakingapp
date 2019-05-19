import * as React from "react";
import { Component, ReactNode } from "react";
import { autobind } from "core-decorators";
import { Wrapper } from "../../containers/wrapper";
import { PropertyStore } from "./PropertyStore";
import { Layout } from "../../containers/layout";
import { observer } from "mobx-react";
import { AddProductForm } from "../../components/add-product-form/AddProductForm";
import { InfoPopup } from "../../components/info-popup";

@observer
@autobind
export class Property extends Component {
    private readonly store = new PropertyStore();

    componentDidMount(): void {
        this.store.onMount();
    }

    render(): ReactNode {
        return (
            <>
                <Wrapper title={"Имущество"}>
                    <Layout
                        onClick={this.store.onOpenForm}
                        isPreloaderVisible={this.store.isPreloaderVisible}
                        buttonTitle={"Добавить предмет"}
                    >
                        123
                    </Layout>
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
                <InfoPopup
                    isVisible={this.store.isInfoPopupVisible}
                    title={"Продукт удачно добавлен!"}
                    onClose={() => this.store.setVisibilityInfoPopup(false)}
                />
            </>
        );
    }
}
