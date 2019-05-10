import * as React from "react";
import { Component, ReactNode } from "react";
import { IAddUserFormProps } from "./IAddUserFormProps";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import { InputField } from "../input-field";
import { EFormTypes } from "../../config";
import { AddUserFormStore } from "./AddUserFormStore";
import { observer } from "mobx-react";
import { DrawerWrapper } from "../drawer-wrapper";

export const AddUserForm = withStyles(styles)(
    observer(
        class extends Component<IAddUserFormProps> {
            private readonly store = new AddUserFormStore();

            render(): ReactNode {
                return (
                    <DrawerWrapper
                        isVisible={this.props.isVisible}
                        title={"Добавить пользователя"}
                        onClose={this.props.onClose}
                        onOpen={this.props.onOpen}
                        buttonTitle={"Создать"}
                        isButtonDisable={!this.store.isFormValid()}
                        onSubmit={this.store.submit}
                    >
                            <InputField
                                addField={this.store.addField}
                                placeholder={"Имя"}
                                onChange={this.store.onChange}
                                type={EFormTypes.TEXT}
                            />
                            <InputField
                                addField={this.store.addField}
                                placeholder={"Фамилия"}
                                onChange={this.store.onChange}
                                type={EFormTypes.TEXT}
                            />
                            <InputField
                                addField={this.store.addField}
                                placeholder={"E-mail"}
                                onChange={this.store.onChange}
                                type={EFormTypes.EMAIL}
                            />
                            <InputField
                                addField={this.store.addField}
                                placeholder={"Должность"}
                                onChange={this.store.onChange}
                                type={EFormTypes.TEXT}
                            />
                    </DrawerWrapper>
                );
            }
        }
    )
);
