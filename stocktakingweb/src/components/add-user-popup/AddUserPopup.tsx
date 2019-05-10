import * as React from "react";
import { Component, ReactNode } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import { IAddUserPopupProps } from "./IAddUserPopupProps";
import { observer } from "mobx-react";
import { Popup } from "../popup";
import { AddUserPopupStore } from "./AddUserPopupStore";
import { InputField } from "../input-field";
import { EFormTypes } from "../../config";
import { Button, EButtonVariant } from "../button";

export const AddUserPopup = withStyles(styles)(
    observer(
        class extends Component<IAddUserPopupProps> {
            private readonly store = new AddUserPopupStore();

            render(): ReactNode {
                return (
                    <Popup
                        title={"Добавить пользователя"}
                        onClose={this.props.onClose}
                        isVisible={this.props.isVisible}
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
                        <Button
                            title={"Создать"}
                            isDisable={!this.store.isFormValid()}
                            onClick={this.store.createUser}
                            isFullWidth={true}
                            variant={EButtonVariant.TEXT}
                            color={"primary"}
                        />
                    </Popup>
                );
            }
        }
    )
);
