import * as React from "react";
import { Component, ReactNode } from "react";
import { IAddUserFormProps } from "./IAddUserFormProps";
import { EFormTypes } from "../../config";
import { observer } from "mobx-react";
import { DrawerWrapper } from "../drawer-wrapper";
import { autobind } from "core-decorators";
import { InputField } from "../input-field";
import { IGetUserData } from "../../services";

@observer
@autobind
export class AddUserForm extends Component<IAddUserFormProps> {
    render(): ReactNode {
        return (
            <DrawerWrapper
                isVisible={this.props.isVisible}
                title={"Добавить пользователя"}
                onClose={this.props.onClose}
                onOpen={this.props.onOpen}
                buttonTitle={"Создать"}
                isButtonDisable={this.props.isFormValid}
                onSubmit={this.props.onSubmit}
            >
                <InputField
                    addField={this.props.addField}
                    placeholder={"Имя"}
                    onChange={this.props.onChange}
                    type={EFormTypes.TEXT}
                    value={this.getUser().name}
                />
                <InputField
                    addField={this.props.addField}
                    placeholder={"E-mail"}
                    onChange={this.props.onChange}
                    type={EFormTypes.EMAIL}
                    value={this.getUser().email}
                />
            </DrawerWrapper>
        );
    }

    private getUser(): IGetUserData {
        if (!this.props.activeUser) {
            return {
                user_id: "",
                name: "",
                email: ""
            };
        }
        return this.props.activeUser;
    }
}
