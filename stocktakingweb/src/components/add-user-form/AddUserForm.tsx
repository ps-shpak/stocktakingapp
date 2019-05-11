import * as React from "react";
import { Component, ReactNode } from "react";
import { IAddUserFormProps } from "./IAddUserFormProps";
import { InputField } from "../input-field";
import { EFormTypes } from "../../config";
import { observer } from "mobx-react";
import { DrawerWrapper } from "../drawer-wrapper";
import { autobind } from "core-decorators";

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
                />
                <InputField
                    addField={this.props.addField}
                    placeholder={"Фамилия"}
                    onChange={this.props.onChange}
                    type={EFormTypes.TEXT}
                />
                <InputField
                    addField={this.props.addField}
                    placeholder={"E-mail"}
                    onChange={this.props.onChange}
                    type={EFormTypes.EMAIL}
                />
                <InputField
                    addField={this.props.addField}
                    placeholder={"Должность"}
                    onChange={this.props.onChange}
                    type={EFormTypes.TEXT}
                />
            </DrawerWrapper>
        );
    }
}
