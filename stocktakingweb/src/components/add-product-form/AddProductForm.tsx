import * as React from "react";
import { Component, ReactNode } from "react";
import { IAddProductFormProps } from "./IAddProductFormProps";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { DrawerWrapper } from "../drawer-wrapper";
import { EFormTypes } from "../../config";
import { InputField } from "../input-field";
import { AutoComplete } from "../autocomplete";

@observer
@autobind
export class AddProductForm extends Component<IAddProductFormProps> {
    render(): ReactNode {
        return (
            <DrawerWrapper
                isVisible={this.props.isVisible}
                onOpen={this.props.onOpen}
                onClose={this.props.onClose}
                title={"Добавить предмет"}
                buttonTitle={this.props.buttonTitle}
                isButtonDisable={this.props.isFormValid}
                onSubmit={this.props.onSubmit}
            >
                <InputField
                    addField={this.props.addField}
                    placeholder={"Категория"}
                    onChange={this.props.onChange}
                    type={EFormTypes.TEXT}
                />
                <AutoComplete
                    placeholder={"Ответственный"}
                    list={this.props.userList}
                    onSelect={this.props.onSelectUser}
                />
                <InputField
                    addField={this.props.addField}
                    placeholder={"Цена в рублях"}
                    onChange={this.props.onChange}
                    type={EFormTypes.TEXT}
                />
                <InputField
                    addField={this.props.addField}
                    placeholder={"Расположение"}
                    onChange={this.props.onChange}
                    type={EFormTypes.TEXT}
                />
                <InputField
                    addField={this.props.addField}
                    placeholder={"Описание"}
                    onChange={this.props.onChange}
                    type={EFormTypes.TEXT}
                    isTextArea={true}
                />
            </DrawerWrapper>
        );
    }
}
